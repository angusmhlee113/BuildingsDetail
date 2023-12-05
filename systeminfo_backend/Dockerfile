FROM golang:1.21.4-alpine3.18 as build-stage
# FROM golang:latest

WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./

RUN apk add --update gcc musl-dev

RUN apk add --no-cache sqlite

# Build
RUN CGO_ENABLED=1 GOOS=linux go build -o /systeminfo_backend

FROM golang:1.21.4-alpine3.18 as production-stage

WORKDIR /app

COPY --from=build-stage /systeminfo_backend /app/systeminfo_backend

COPY .env .

COPY data.db .

EXPOSE 3010

ENTRYPOINT ["/app/systeminfo_backend"]