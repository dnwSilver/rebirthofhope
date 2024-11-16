ARG SOPS_VERSION=3.9.1
ARG ALPINE_VERSION=3.20

FROM alpine/curl AS build

WORKDIR /home

COPY /secrets/ca.crt        /etc/ssl/certs/ca.crt
COPY /secrets/client.crt    /etc/ssl/certs/client.crt
COPY /secrets/client.key    /etc/ssl/certs/client.key
COPY /secrets/gpg.key       /etc/ssl/certs/gpg.key
COPY /configs/kube.config   /home/.kube/config

RUN curl --output helmfile.tar.gz -L https://github.com/helmfile/helmfile/releases/download/v0.169.1/helmfile_0.169.1_linux_amd64.tar.gz; \
    tar zxf helmfile.tar.gz;

FROM alpine:$ALPINE_VERSION AS runtime

WORKDIR /

COPY --from=build /home/.kube /root/.kube
COPY --from=build /etc/ssl/certs /etc/ssl/certs
COPY --from=build /home/helmfile /usr/local/bin/helmfile

RUN apk add --no-cache git make gnupg yq helm sops;
RUN helm plugin install https://github.com/jkroepke/helm-secrets --version v4.6.2;
RUN helm plugin install https://github.com/databus23/helm-diff;

RUN chmod +x /usr/local/bin/*; \
    chmod go-r ~/.kube/config; \
    gpg --import /etc/ssl/certs/gpg.key
