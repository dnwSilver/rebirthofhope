
DOCKER_DIR=./docker

SUPPURT_PLATHFORMS=linux/amd64,linux/arm64
SERVER_PLATHFORM=linux/amd64
GO_VERSION=1.23
NODE_VERSION=20.18.0
APP_VERSION=0.0.29

FRONTEND_DIR=./app/frontend
FRONTEND_PORT=4010

BACKEND_DIR=./app/backend
BACKEND_PORT=4020

MANAGER_DIR=./app/manager
MANAGER_PORT=4000

FRONTEND_DIR=./app/watchdog
FRONTEND_PORT=4030

DEPLOY_DIR=./deploy

DOCKER_HUB_NAMESPACE=dnwsilver

CLUSTER_HOST=80.87.106.221

build-workstation: update-secrets
	docker build \
	--platform ${SUPPURT_PLATHFORMS} \
	--file ${DOCKER_DIR}/workstation.Dockerfile \
	--tag workstation:${APP_VERSION} .;

build-backend:
	docker buildx build \
	--platform ${SUPPURT_PLATHFORMS} \
	--build-arg NODE_VERSION=${GO_VERSION} \
	--file ${DOCKER_DIR}/backend.Dockerfile \
	--tag backend:${APP_VERSION} .;

build-frontend:
	rm -rf ${FRONTEND_DIR}/.output
	cd ${FRONTEND_DIR}; \
	bun run build;
	docker buildx build \
	--platform ${SUPPURT_PLATHFORMS} \
	--build-arg GO_VERSION=${NODE_VERSION} \
	--file ${DOCKER_DIR}/frontend.Dockerfile \
	--tag frontend:${APP_VERSION} .;

build-manager:
	rm -rf ${MANAGER_DIR}/.next
	cd ${MANAGER_DIR}; \
	npm run build;
	docker buildx build \
	--platform ${SUPPURT_PLATHFORMS} \
	--build-arg NODE_VERSION=${NODE_VERSION} \
	--file ${DOCKER_DIR}/manager.Dockerfile \
	--tag manager:${APP_VERSION} .;

build-watchdog:
	docker buildx build \
	--platform ${SUPPURT_PLATHFORMS} \
	--build-arg NODE_VERSION=${GO_VERSION} \
	--file ${DOCKER_DIR}/watchdog.Dockerfile \
	--tag watchdog:${APP_VERSION} .;

build-ci:
	docker buildx build \
	--platform ${SUPPURT_PLATHFORMS} \
	--file ${DOCKER_DIR}/ci.Dockerfile \
	--tag ci:${APP_VERSION} .;

build: build-workstation build-backend build-frontend build-manager

run-dev-backend:
	cd ${BACKEND_DIR}; \
	go run entrypoint.go;

run-dev-frontend:
	cd ${FRONTEND_DIR}; \
	bun run dev --port=${FRONTEND_PORT};

run-dev-manager:
	cd ${MANAGER_DIR}; \
	npm run dev;

push-workstation:
	docker tag workstation:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-workstation:${APP_VERSION};
	docker tag workstation:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-workstation:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-workstation:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-workstation:latest;

push-backend:
	docker tag backend:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-backend:${APP_VERSION};
	docker tag backend:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-backend:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-backend:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-backend:latest;

push-frontend:
	docker tag frontend:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-frontend:${APP_VERSION};
	docker tag frontend:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-frontend:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-frontend:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-frontend:latest;

push-manager:
	docker tag manager:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-manager:${APP_VERSION};
	docker tag manager:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-manager:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-manager:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-manager:latest;

push-ci:
	docker tag ci:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-ci:${APP_VERSION};
	docker tag ci:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-ci:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-ci:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-ci:latest;

push-watchdog:
	docker tag watchdog:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-watchdog:${APP_VERSION};
	docker tag watchdog:${APP_VERSION} ${DOCKER_HUB_NAMESPACE}/k8s-watchdog:latest;
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-watchdog:${APP_VERSION};
	docker push ${DOCKER_HUB_NAMESPACE}/k8s-watchdog:latest;

push-arts:
	rsync -chavzP --stats ./assets/art-1.webp root@${CLUSTER_HOST}:/root/.storage/art-1.webp;
	rsync -chavzP --stats ./assets/art-3.webp root@${CLUSTER_HOST}:/root/.storage/art-3.webp;

push: push-workstation push-frontend push-backend push-manager push-ci push-arts

connect:
	ssh root@${CLUSTER_HOST};

setup-application-cluster:
	rsync -chavzP --stats ./scripts/setup-apps.sh root@${CLUSTER_HOST}:/root/setup.sh;
	ssh root@${CLUSTER_HOST} "./setup.sh";
	ssh root@${CLUSTER_HOST} "rm setup.sh";

update-secrets:
	rsync -chavzP --stats root@${CLUSTER_HOST}:/etc/ssl/certs/gpg.key ./secrets/gpg.key;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/root/.minikube/ca.crt ./secrets/ca.crt ;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/root/.minikube/profiles/minikube/client.crt ./secrets/client.crt;
	rsync -chavzP --stats root@${CLUSTER_HOST}:/root/.minikube/profiles/minikube/client.key ./secrets/client.key;

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

verify-environments:
	cd ${DEPLOY_DIR}; \
	yq '.environments | keys | join(" ")' helmfile.yaml | tr ' ' '\n' | \
	xargs -I {} sh -c 'echo {} && helmfile -e $(basename {}) template >/dev/null || \
		(echo "Environment {} is broken! Update values files in {} directory."; false)';

verify: verify-secrets verify-charts verify-environments

deploy-app:
	cd ${DEPLOY_DIR}; \
	helmfile --environment production-app apply;

deploy-adm:
	cd ${DEPLOY_DIR}; \
	helmfile --environment production-adm apply;

deploy-wd:
	cd ${DEPLOY_DIR}; \
	helmfile --environment production-wd apply;

deploy-pv:
	cd ${DEPLOY_DIR}; \
	rsync -chavzP ./manifests/production-app/pv.yaml root@${CLUSTER_HOST}:/root/pv.yaml; \
	ssh root@${CLUSTER_HOST} "minikube kubectl -- apply -f pv.yaml"; \
	rsync -chavzP ./manifests/production-app/pvc.yaml root@${CLUSTER_HOST}:/root/pvc.yaml; \
	ssh root@${CLUSTER_HOST} "minikube kubectl -- apply -f pvc.yaml -n julienne";