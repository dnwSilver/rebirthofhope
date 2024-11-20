# syntax=docker/dockerfile:1
ARG GO_VERSION=1.23

# Build the application from source
FROM golang:${GO_VERSION} AS build-stage

WORKDIR /app

COPY /app/api/go.mod /app/api/go.sum ./
RUN go mod download

COPY /app/api/*.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /entrypoint

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /

COPY --from=build-stage /entrypoint /entrypoint

EXPOSE 8080

ENV GIN_MODE=release

USER nonroot:nonroot

ENTRYPOINT ["/entrypoint"]