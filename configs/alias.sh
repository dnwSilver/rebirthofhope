alias nt='nginx -t'
alias ns='sudo systemctl start nginx'
alias nr='sudo systemctl reload nginx'
alias nk='sudo systemctl stop nginx'
alias ne='vim /etc/nginx/sites-available/default'
alias kube-start='minikube start --force && \
    minikube addons enable metrics-server && \
    minikube addons enable ingress && \
    minikube addons enable ingress-dns && \
    minikube tunnel &> /dev/null &'
alias kubectl='minikube kubectl -- $1'
alias kube-volume='minikube mount /root/.storage:/home/docker/arts --uid 1001 --gid 1001 &'