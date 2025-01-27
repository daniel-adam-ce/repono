package main

import (
	"log"

	"github.com/daniel-adam-ce/repono/back-end/internal/house"
)

func main() {
	server, err := house.NewHouseServer()

	if err != nil {
		log.Fatal(err)
	}

	err = server.Start("0.0.0.0:3000")

	if err != nil {
		log.Fatal(err)
	}
}
