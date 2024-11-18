ARG SOPS_VERSION=3.9.1
ARG UBUNTU_VERSION=24.04

FROM ubuntu:$UBUNTU_VERSION AS build

WORKDIR /home

COPY /scripts/greeting.sh   /home/greeting.sh

COPY /.bin                  /home/.bin
COPY /.secrets/ssh          /home/.ssh
COPY /.secrets/certs        /home/.certs
COPY /configs/kube.config   /home/.kube/config

FROM ubuntu:$UBUNTU_VERSION AS runtime

WORKDIR /

COPY --from=build /home/.ssh /root/.ssh
COPY --from=build /home/.kube /root/.kube
COPY --from=build /home/.bin /usr/local/bin
COPY --from=build /home/.certs /etc/ssl/certs
COPY --from=build /home/greeting.sh /etc/bash.bashrc

RUN apt update; \
    apt install git curl make vim gnupg nano yq httpie bat --yes;
RUN helm plugin install https://github.com/jkroepke/helm-secrets --version v4.6.2;
RUN helm plugin install https://github.com/databus23/helm-diff || true;
RUN bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"

WORKDIR /root

RUN ln -s /usr/bin/batcat /usr/bin/bat;\
    chmod 400 ~/.ssh/id_rsa; \
    chmod +x /usr/local/bin/*; \
    chmod go-r ~/.kube/config; \
    gpg --import /etc/ssl/certs/gpg.key; \
    git config --global user.email "k8s.savior@gmail.com"; \
    git config --global user.email "Savior";
