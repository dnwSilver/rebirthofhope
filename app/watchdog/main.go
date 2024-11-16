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
var filesDirectory string = "/.output/public/arts/watchdog"

func main() {
	if !strings.Contains(features, "WATCH") {
		log.Print("feature WATCH is disabled")
	}

	r := chi.NewRouter()
	r.Get("/", serveMainPage)

	fileServer := http.FileServer(http.Dir(filesDirectory))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	log.Printf("Server is starting on :%d...\n", 8080)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", 8080), r); err != nil {
		log.Fatal("error starting the server: ", err)
	}
}

type MainView struct {
	Images    []*Image
	IsEnabled bool
}

type Image struct {
	Href     string
	IsActive bool
	Title    string
}

func serveMainPage(w http.ResponseWriter, r *http.Request) {
	tpl := template.Must(template.ParseFiles("./web/templates/main.html"))

	isEnabled := strings.Contains(features, "WATCH")

	images := []*Image{}
	entries, err := os.ReadDir(filesDirectory)
	if err != nil {
		log.Fatal(err)
	}
	for _, e := range entries {
		images = append(images, &Image{Href: e.Name()})
	}
	view := &MainView{
		Images:    images,
		IsEnabled: isEnabled,
	}
	view.Images[0].IsActive = true

	err = tpl.ExecuteTemplate(w, "main.html", view)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
