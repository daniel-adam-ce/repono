FROM golang:1.23-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
COPY ./internal/house ./internal/house
COPY ./cmd/house ./cmd/house
COPY ./build/house ./build/house
RUN go mod download

CMD ["air", "-c", "build/house/.air.toml"]