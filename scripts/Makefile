verify-secrets:
	find environments -type f -name '*secrets.yaml' | \
		xargs -I {} sh -c 'sops --decrypt {} >/dev/null 2>&1 || \
			(echo "File {} is broken! Use sops and helm-secrets for modify this file."; false)';

verify-charts:
	find charts -type d -mindepth 1 -maxdepth 1 | \
		xargs -I {} sh -c 'helm lint {}';

verify-envs:
	echo "production-app production-wd" | tr ' ' '\n' | \
	xargs -I {} sh -c 'echo {} && helmfile -e $(basename {}) template >/dev/null || \
		(echo "Environment {} is broken! Update values files in {} directory."; false)';

verify: verify-secrets verify-charts verify-envs
	https --quiet POST rebirthofhope.ru/api/verify call=${CALL} tasks[linting]=true

deploy:
	helmfile --environment production-app apply;
