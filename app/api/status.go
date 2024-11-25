package main

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
)

type StatusType string

const (
	EMPTY_ENVS     StatusType = "empty"
	CORRUPTED_ENVS StatusType = "corrupted"
	LOW_MEMORY     StatusType = "memory"
	SUCCESS        StatusType = "success"
)

type FuncIntInt func(string) int

func getReplicaCount(call string) int {
	response, _ := http.Get("https://rebirthofhope.ru/api/savior/" + call)

	defer response.Body.Close()
	body, _ := io.ReadAll(response.Body)

	savior := Savior{}

	err := json.Unmarshal([]byte(body), &savior)

	if err != nil {
		return 1
	}

	if savior.Replicas == nil {
		return 1
	}

	return 2
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
