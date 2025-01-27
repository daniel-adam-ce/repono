package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/daniel-adam-ce/repono/back-end/internal/house"
	db "github.com/daniel-adam-ce/repono/back-end/internal/house/db/sqlc"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func dir(envFile string) string {
	currentDir, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	for {
		goModPath := filepath.Join(currentDir, "go.mod")
		if _, err := os.Stat(goModPath); err == nil {
			break
		}

		parent := filepath.Dir(currentDir)
		if parent == currentDir {
			panic(fmt.Errorf("go.mod not found"))
		}
		currentDir = parent
	}

	return filepath.Join(currentDir, envFile)
}

func main() {

	err := godotenv.Load(dir(".env"))
	if err != nil {
		log.Fatalf("Error loading .env file %s", err)
	}

	dbSource := os.Getenv("DB_SOURCE")

	connPool, err := pgxpool.New(context.Background(), dbSource)
	if err != nil {
		log.Fatal(err)
	}

	store := db.NewStore(connPool)

	server, err := house.NewHouseServer(store)

	if err != nil {
		log.Fatal(err)
	}

	err = server.Start("0.0.0.0:3000")

	if err != nil {
		log.Fatal(err)
	}
}
