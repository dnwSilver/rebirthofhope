package main

import (
	"fmt"
	"time"
)

var http200Count = 0
var http500Count = 0

func metrics() string {
	http200Count++
	return `
	# HELP http_requests_total The total number of HTTP requests.
	# TYPE http_requests_total counter
	` + `http_requests_total{method="post",code="200"} ` + fmt.Sprint(http200Count) +

		" " + fmt.Sprint(time.Now().Unix()) +
		`

	http_requests_total{method="post",code="500"} ` + fmt.Sprint(http500Count) +

		" " + fmt.Sprint(time.Now().Unix())

}
