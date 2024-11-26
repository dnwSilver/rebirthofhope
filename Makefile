DOCKER_DIR=./docker

SUPPORT_PLATFORMS=linux/amd64,linux/arm64
GO_VERSION=1.23
NODE_VERSION=20.18.0
APP_VERSION=2.1.0

BIN_DIR=~/practice/bin
SECRETS_DIR=~/practice/secrets

FRONTEND_DIR=./app/uix
FRONTEND_PORT=4010

BACKEND_DIR=./app/api
BACKEND_PORT=4020

MANAGER_DIR=./app/web
MANAGER_PORT=4000

DEPLOY_DIR=./deploy

DOCKER_HUB_NAMESPACE=dnwsilver

CLUSTER_HOST=80.87.106.221

build-workstation: update-bin update-secrets
	docker build --no-cache \
	--platform ${SUPPORT_PLATFORMS} \
	--file ${DOCKER_DIR}/workstation.Dockerfile \
	--tag workstation:${APP_VERSION} .;

build-api:
	docker buildx build \
	--platform ${SUPPORT_PLATFORMS} \
	--build-arg GO_VERSION=${GO_VERSION} \
	--file ${DOCKER_DIR}/api.Dockerfile \
	--tag api:${APP_VERSION} .;

build-uix:
	rm -rf ${FRONTEND_DIR}/.output;
	cd ${FRONTEND_DIR}; \
	bun install; \
	bun run build;
	docker buildx build \
	--platform ${SUPPORT_PLATFORMS} \
	--build-arg GO_VERSION=${NODE_VERSION} \
	--file ${DOCKER_DIR}/uix.Dockerfile \
	--tag uix:${APP_VERSION} .;

build-web:
	rm -rf ${MANAGER_DIR}/.next;
	cd ${MANAGER_DIR}; \
	npm install --force; \
	npm run build;
	docker buildx build \
	--platform ${SUPPORT_PLATFORMS} \
	--build-arg NODE_VERSION=${NODE_VERSION} \
	--file ${DOCKER_DIR}/web.Dockerfile \
	--tag web:${APP_VERSION} .;

build-ci:
	docker buildx build \
	--platform ${SUPPORT_PLATFORMS} \
	--file ${DOCKER_DIR}/ci.Dockerfile \
	--tag ci:${APP_VERSION} .;

build: build-workstation build-api build-uix build-web

run-dev-api:
	cd ${BACKEND_DIR}; \
	go build; \
	LOG_LEVEL=info ALLOW_ORIGINS=* DB=mongodb://bestserverever:27017 CALL=pickle-rick go run .;

run-dev-uix:
	cd ${FRONTEND_DIR}; \
	bun install; \
	bun run dev --port=${FRONTEND_PORT};

run-dev-web:
	cd ${MANAGER_DIR}; \
	[[ -d ${MANAGER_DIR}/node_modules ]] || npm install --force; \
	npm run dev;

push-workstation:
	docker tag workstation:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-workstation:${APP_VERSION};
	docker tag workstation:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-workstation:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-workstation:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-workstation:latest;

push-api:
	docker tag api:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-api:${APP_VERSION};
	docker tag api:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-api:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-api:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-api:latest;

push-uix:
	docker tag uix:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-uix:${APP_VERSION};
	docker tag uix:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-uix:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-uix:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-uix:latest;

push-web:
	docker tag web:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-web:${APP_VERSION};
	docker tag web:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-web:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-web:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-web:latest;

push-ci:
	docker tag ci:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-ci:${APP_VERSION};
	docker tag ci:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-ci:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-ci:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-ci:latest;

push-arts:
	rsync -chavzP --stats ./assets/art-1.webp root@${CLUSTER_HOST}:/root/.storage/art-1.webp;
	rsync -chavzP --stats ./assets/art-3.webp root@${CLUSTER_HOST}:/root/.storage/art-3.webp;

push: push-workstation push-uix push-api push-web

connect:
	ssh root@${CLUSTER_HOST};

setup-application-cluster:
	rsync -chavzP --stats ./scripts/setup-apps.sh root@${CLUSTER_HOST}:/root/setup.sh;
	ssh root@${CLUSTER_HOST} "./setup.sh";
	ssh root@${CLUSTER_HOST} "rm setup.sh";

update-bin:
	cp -r ${BIN_DIR} ./.bin;

update-secrets:
	cp -r ${SECRETS_DIR} ./.secrets;

download-secrets:
	[[ -d secrets ]] || mkdir secrets;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/etc/ssl/certs/gpg.key ${SECRETS_DIR}/gpg.key;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/root/.minikube/ca.crt ${SECRETS_DIR}/ca.crt ;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/root/.minikube/profiles/minikube/client.crt ${SECRETS_DIR}/client.crt;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/root/.minikube/profiles/minikube/client.key ${SECRETS_DIR}/client.key;

update-reverse-proxy:
	rsync -chavzP --stats ./configs/k8s.nginx.conf root@${CLUSTER_HOST}:/etc/nginx/sites-available/default;
	ssh root@${CLUSTER_HOST} "nginx -t";
	ssh root@${CLUSTER_HOST} "systemctl reload nginx";

record-examples:
	vhs ./examples/k9s.enter.tape;

verify-secrets:
	cd ${DEPLOY_DIR}; \
	find environments -type f -name '*secrets.yaml' | \
		xargs -I {} sh -c 'sops --decrypt {} >/dev/null 2>&1 || \
			(echo "File {} is broken! Use sops and helm-secrets for modify this file."; false)';

verify-charts:
	cd ${DEPLOY_DIR}; \
	find charts -type d -mindepth 1 -maxdepth 1 | \
		xargs -I {} sh -c 'helm lint {}';

verify-envs:
	cd ${DEPLOY_DIR}; \
	yq '.environments | keys | join(" ")' helmfile.yaml | tr ' ' '\n' | \
	xargs -I {} sh -c 'echo {} && helmfile -e $(basename {}) template >/dev/null || \
		(echo "Environment {} is broken! Update values files in {} directory."; false)';

verify: verify-secrets verify-charts verify-envs

deploy-app:
	cd ${DEPLOY_DIR}; \
	helmfile --environment production-app apply;

deploy-web:
	cd ${DEPLOY_DIR}; \
	helmfile --environment production-web apply;

deploy-pv:
	cd ${DEPLOY_DIR}; \
	rsync -chavzP ./manifests/production-app/pv.yaml root@${CLUSTER_HOST}:/root/pv.yaml; \
	ssh root@${CLUSTER_HOST} "minikube kubectl -- apply -f pv.yaml"; \
	rsync -chavzP ./manifests/production-app/pvc.yaml root@${CLUSTER_HOST}:/root/pvc.yaml; \
	ssh root@${CLUSTER_HOST} "minikube kubectl -- apply -f pvc.yaml -n savior-julienne";

init-user:
	cp ./scripts/user-init.sh ../user-init.sh;
	cp ./scripts/framework.sh ../framework.sh;
	../user-init.sh;

init-user-for-dev:
	cp ./scripts/user-init.sh ../user-init.sh;
	cp ./scripts/framework.sh ../framework.sh;
	../user-init.sh pickle-rick;