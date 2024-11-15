package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"text/template"

	"github.com/go-chi/chi"
)

var features string = os.Getenv("FEATURES")

func main() {

	if !strings.Contains(features, "WATCH") {
		log.Print("Feature WATCH disabled.")
	}

	r := chi.NewRouter()
	r.Get("/", serveMainPage)

	fileServer := http.FileServer(http.Dir("/.output/public/arts/watchdog"))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	log.Printf("Server is starting on :%d...\n", 8080)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", 8080), r); err != nil {
		log.Fatal("Error starting the server: ", err)
	}
}

type MainView struct {
	Images []string
	Good   bool
}

func serveMainPage(w http.ResponseWriter, r *http.Request) {
	tpl := template.Must(template.ParseFiles("./web/templates/main.html"))

	good := !strings.Contains(features, "WATCH")

	err := tpl.ExecuteTemplate(w, "main.html", &MainView{
		Images: []string{"footage-screenshot-4f358472-59f1-47d8-a53f-bf58b0aebaf0.png"},
		Good:   good,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
