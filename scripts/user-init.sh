#!/bin/bash

CALL=$(curl -X POST --silent https://rebirthofhope.ru/api/call || 0)
echo $CALL

BRANCH_NAME=savior/$CALL
CLUSTER_HOST=80.87.106.221
SECRET_FILE=environments/production-app/secrets.yaml
API_FILE=environments/production-app/api.yaml.gotmpl
UIX_FILE=environments/production-app/uix.yaml.gotmpl
HELM_FILE=helmfile.yaml
NAMESPACE=savior-$CALL

[[ -z $CALL ]] && exit 1

if [ `git rev-parse --verify $BRANCH_NAME 2>/dev/null` ]
then
    git branch -D $BRANCH_NAME >/dev/null;
    git push origin -d $BRANCH_NAME >/dev/null && echo "󰊢 Delete branch $BRANCH_NAME";
fi

git switch main >/dev/null && echo "󰊢 Switch to main";
git reset --hard && git clean -xdf >/dev/null && echo "󰊢 Reset repository";
git switch -c $BRANCH_NAME >/dev/null && echo "󰊢 Create branch $BRANCH_NAME";

rm -rf app >/dev/null && echo " Remove app"
rm -rf assets >/dev/null && echo " Remove assets"
rm -rf configs >/dev/null && echo " Remove config"
rm -rf scripts >/dev/null && echo " Remove scripts"
rm -rf docker >/dev/null && echo " Remove docker"
rm -rf lor >/dev/null && echo " Remove lor"
rm -f .gitignore >/dev/null && echo " Remove gitignore"
rm -f docker-compose.yaml >/dev/null && echo " Remove docker-compose"
rm -f Makefile >/dev/null && echo " Remove makefile"
rm -f README.md >/dev/null && echo " Remove README.md"

mv -v ./deploy/* ./deploy/.* ./ &>/dev/null && echo "󰉒 Move file to root directory"

rm -rf deploy

# Clear comments
for f in $(find . -name '*.yaml' -or -name '*.gotmpl'); do gsed -i '/#.*$/d' $f; done >/dev/null && echo " Remove comments"

# Issue (RESOURCES)
gsed -i '/resources:/,+3 d' $API_FILE >/dev/null && echo " Create task (RESOURCES)"

# Задание (LOGS)
gsed -i 's|level: info|level: trace|' $API_FILE >/dev/null && echo " Create task (LOGS)"

# Задание (SECRETS)
helm secrets decrypt -i $SECRET_FILE >/dev/null && echo " Decrypt secrets"
gsed -i 's|bestserver|worstserver|' $SECRET_FILE >/dev/null && echo " Create task (SECRETS)"
helm secrets encrypt -i $SECRET_FILE >/dev/null && echo " Encrypt secrets"

# Задание (SCALE)
gsed -i 's|replicaCount: 2|replicaCount: 1|' $API_FILE >/dev/null && echo " Create task (SCALE)"

# Задание (ENV)
gsed -i 's|api: https://julienne-api.rebirthofhope.ru|api: https://julienne-api.abyssofdespair.ru|' $UIX_FILE >/dev/null && echo " Create task (ENV)"

# Задание (CORS)
gsed -i 's|origins: https://julienne-uix.rebirthofhope.ru|origins: https://julienne-api.abyssofdespair.ru|' $API_FILE >/dev/null && echo " Create task (CORS)"

# Задание (INGRESS)
gsed -i '/extraIngress:/,+10 d' $API_FILE >/dev/null && echo " Create task (INGRESS)"

# Задание (VOLUME)
gsed -i 's|/.output/public/arts|/.output/arts|' $UIX_FILE >/dev/null && echo " Create task (VOLUMES)"

# Rename deploy name
for f in $(find . -name '*.yaml' -or -name '*.gotmpl' -or -name '*.tpl'); do gsed -i "s|julienne|$CALL|g" $f; done >/dev/null && echo " Rename namespace, domains, manifests"

cp ../Makefile Makefile >/dev/null && echo " Create make file";

# Create persistens volume
ssh root@$CLUSTER_HOST "rm /root/pv.yaml" >/dev/null && echo "󰣀 Remove PV manifest";
ssh root@$CLUSTER_HOST "rm /root/pvc.yaml" >/dev/null && echo "󰣀 Remove PVC manifest";
rsync -chavzP manifests/production-app/pvc.yaml root@$CLUSTER_HOST:/root/pvc.yaml >/dev/null && echo "󰣀 Upload PV manifest";
rsync -chavzP manifests/production-app/pv.yaml root@$CLUSTER_HOST:/root/pv.yaml >/dev/null && echo "󰣀 Upload PVC manifest";
ssh root@$CLUSTER_HOST "minikube kubectl -- create namespace $NAMESPACE" >/dev/null && echo "󰣀 Create namespace";
ssh root@$CLUSTER_HOST "minikube kubectl -- apply -f pv.yaml" >/dev/null && echo "󰣀 Create PV";
ssh root@$CLUSTER_HOST "minikube kubectl -- apply -f pvc.yaml -n $NAMESPACE" >/dev/null && echo "󰣀 Create PVC";

# Deploy release
gsed -i 's|createNamespace: false|createNamespace: true|' $HELM_FILE >/dev/null && echo " Enable create namespace";
gsed -i '/  production-adm:/,+14 d' $HELM_FILE >/dev/null && echo " Clean helmfile";
gsed -zi 's|enabled: true|enabled: false|2' $HELM_FILE >/dev/null && echo "⭘ Disable API deploy"
helmfile --environment production-app apply &>/dev/null && echo "󱃾 Deploy to cluster";
gsed -zi 's|enabled: false|enabled: true|2' $HELM_FILE >/dev/null && echo "⏽ Enable API deploy";
gsed -i 's|createNamespace: true|createNamespace: false|' $HELM_FILE >/dev/null && echo " Disable create namespace";

git add . >/dev/null && echo "󰊢 Add files"
git commit -m "🎬 It has begun." >/dev/null && echo "󰊢 Create commit"
git push -u origin $BRANCH_NAME >/dev/null && echo "󰊢 Push branch $BRANCH_NAME"

git switch main >/dev/null && echo "󰊢 Switch to main"
git switch main >/dev/null && echo "󰊢 Switch to main"