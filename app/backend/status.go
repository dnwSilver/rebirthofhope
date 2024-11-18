package main

import (
	"io"
	"net/http"
	"os"

	"gopkg.in/yaml.v3"
)

type StatusType string

const (
	EMPTY_ENVS     StatusType = "empty"
	CORRUPTED_ENVS StatusType = "corrupted"
	LOW_MEMORY     StatusType = "memory"
	SUCCESS        StatusType = "success"
)

type Deployment struct {
	ReplicaCount int `yaml:"replicaCount"`
}

type FuncIntInt func(string) int

func getReplicaCount(call string) int {
	response, _ := http.Get("https://raw.githubusercontent.com/dnwSilver/rebirthofhope/refs/heads/savior/" + call + "/environments/production-app/api.yaml.gotmpl")

	defer response.Body.Close()
	body, _ := io.ReadAll(response.Body)

	deployment := Deployment{}

	err := yaml.Unmarshal([]byte(body), &deployment)

	if err != nil {
		return 1
	}

	return deployment.ReplicaCount
}

func GetAppStatus() StatusType {
	databaseConnection := os.Getenv("DB")

	if databaseConnection == "" {
		return EMPTY_ENVS
	}

	if databaseConnection != "mongodb://bestserverever:27017" {
		return CORRUPTED_ENVS
	}

	if ReplicaCount == 1 {
		return LOW_MEMORY
	}

	return SUCCESS
}
