package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var ReplicaCount = 1

func main() {
	// ReplicaCount = getReplicaCount(os.Getenv("CALL"))

	log.Println("Fetch replica counts", ReplicaCount)
	r := gin.Default()

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("ALLOW_ORIGINS")},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))

	r.GET("/api/arts", func(c *gin.Context) {
		if GetAppStatus() == SUCCESS {
			c.JSON(http.StatusOK, gin.H{
				"arts": [3]string{"art-1.webp", "art-2.webp", "art-3.webp"},
			})
		} else {
			c.JSON(http.StatusInternalServerError, nil)
		}
	})

	r.GET("/metrics", func(c *gin.Context) {
		c.Header("Content-Type", "application/text; charset=utf-8")
		c.String(200, metrics())
	})

	go DatabaseVerify()
	go UserSetStatus()
	go UserActions()
	go MemoryVerify()
	go TrashLogger()

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
