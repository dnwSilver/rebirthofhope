ARG SOPS_VERSION=3.9.1
ARG UBUNTU_VERSION=24.04

FROM ubuntu:$UBUNTU_VERSION AS build

WORKDIR /home

COPY /secrets/ca.crt        /etc/ssl/certs/ca.crt
COPY /secrets/client.crt    /etc/ssl/certs/client.crt
COPY /secrets/client.key    /etc/ssl/certs/client.key
COPY /secrets/gpg.key       /etc/ssl/certs/gpg.key
COPY /scripts/greeting.sh   /home/greeting.sh
COPY /secrets/id_rsa        /home/.ssh/id_rsa
COPY /secrets/id_rsa.pub    /home/.ssh/id_rsa.pub
COPY /secrets/known_host    /home/.ssh/known_hosts

COPY /configs/kube.config   /home/.kube/config

COPY /bin /home/bin

FROM ubuntu:$UBUNTU_VERSION AS runtime

WORKDIR /

COPY --from=build /home/.ssh /root/.ssh
COPY --from=build /home/.kube /root/.kube
COPY --from=build /home/bin /usr/local/bin
COPY --from=build /etc/ssl/certs /etc/ssl/certs
COPY --from=build /home/greeting.sh /etc/bash.bashrc

RUN apt update; \
    apt install git curl make vim gnupg nano yq --yes;
RUN helm plugin install https://github.com/jkroepke/helm-secrets --version v4.6.2;
RUN helm plugin install https://github.com/databus23/helm-diff || true;

WORKDIR /root

RUN chmod 400 ~/.ssh/id_rsa; \
    chmod +x /usr/local/bin/*; \
    chmod go-r ~/.kube/config; \
    gpg --import /etc/ssl/certs/gpg.key
