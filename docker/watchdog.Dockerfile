# syntax=docker/dockerfile:1
ARG GO_VERSION=1.23

# Build the application from source
FROM golang:${GO_VERSION} AS build-stage

WORKDIR /app

COPY /app/watchdog/go.mod ./
RUN go mod download

COPY /app/watchdog/*.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /watchdog

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /

COPY --from=build-stage /watchdog /watchdog

EXPOSE 8080

ENV GIN_MODE=release

USER nonroot:nonroot

ENTRYPOINT ["/watchdog"]