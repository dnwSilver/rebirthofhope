package main

import (
	"fmt"
	"html"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	fmt.Println("Hello, Vaaadim. 😉")

	features := os.Getenv("FEATURES")

	if !strings.Contains(features, "WATCH") {
		fmt.Println("Feature WATCH disabled.")
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
