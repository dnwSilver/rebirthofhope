#!/bin/bash

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb --yes

apt-get install nginx --yes

systemctl start nginx

minikube addons enable ingress

minikube start --force
