ARG SOPS_VERSION=3.9.1
ARG UBUNTU_VERSION=24.04

FROM ubuntu:$UBUNTU_VERSION AS build

WORKDIR /home

COPY /scripts/greeting.sh   /home/greeting.sh
COPY /secrets/ca.crt        /etc/ssl/certs/ca.crt
COPY /secrets/client.crt    /etc/ssl/certs/client.crt
COPY /secrets/client.key    /etc/ssl/certs/client.key
COPY /secrets/gpg.key       /etc/ssl/certs/gpg.key
COPY /configs/kube.config   /home/.kube/config

RUN apt update; \
    apt install git make curl gnupg golang-go --yes; \
    git clone https://github.com/derailed/k9s.git; \
    cd k9s; \
    make build; \
    cd - ;\
    git clone https://github.com/helm/helm.git; \
    cd helm; \
    make; \
    cd -; \
    curl -LO https://github.com/getsops/sops/releases/download/v$SOPS_VERSION/sops-v$SOPS_VERSION.linux.amd64; \
    curl -LO https://github.com/helmfile/helmfile/releases/download/v0.169.1/helmfile_0.169.1_linux_amd64.tar.gz; \
    tar zxf helmfile_0.169.1_linux_amd64.tar.gz;

FROM ubuntu:$UBUNTU_VERSION AS runtime

WORKDIR /

COPY --from=build /home/.kube /root/.kube
COPY --from=build /etc/ssl/certs /etc/ssl/certs
COPY --from=build /home/greeting.sh /etc/bash.bashrc
COPY --from=build /home/k9s/execs/k9s /usr/local/bin/k9s
COPY --from=build /home/helm/bin/helm /usr/local/bin/helm
COPY --from=build /home/helmfile /usr/local/bin/helmfile
COPY --from=build /home/sops-v*.linux.amd64 /usr/local/bin/sops

RUN apt update; \
    apt install git make vim gnupg eza httpie --yes;
RUN helm plugin install https://github.com/jkroepke/helm-secrets --version v4.6.2;
RUN helm plugin install https://github.com/databus23/helm-diff || true;

RUN chmod +x /usr/local/bin/*; \
    chmod go-r ~/.kube/config; \
    gpg --import /etc/ssl/certs/gpg.key
