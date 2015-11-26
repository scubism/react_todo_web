package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"runtime"
)

func main() {
	ConfigRuntime()
	StartGin()
}

func ConfigRuntime() {
	nuCPU := runtime.NumCPU()
	runtime.GOMAXPROCS(nuCPU)
	fmt.Printf("Running with %d CPUs\n", nuCPU)
}

func StartGin() {
	router := gin.Default()

	router.LoadHTMLGlob("templates/*")

	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.tmpl", gin.H{
			"title":                 "React TODO Web",
			"__DEV__":               gin.Mode() == gin.DebugMode,
			"__TODO_API_ENDPOINT__": os.Getenv("TODO_API_ENDPOINT"),
		})
	})

	router.Static("/static", "./static")

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}
	router.Run(":" + port)
}
