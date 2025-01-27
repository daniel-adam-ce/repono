include .env

sqlc:
	cd internal/house/db && sqlc generate
# make migratecreate dir=internal/house/db/migrations name=test


DIR_MAP_house = internal/house/db/migrations

migrate-up-all:
	migrate -path $(DIR_MAP_house) -database "${DB_SOURCE}" -verbose up

migrate-down-all:
	migrate -path $(DIR_MAP_house) -database "${DB_SOURCE}" -verbose down

migrate-create:
	migrate create -ext sql -dir $(DIR_MAP_$(dir)) -seq ${name}

.PHONY: sqlc migrate-up migrate-create