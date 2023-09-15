run-server:
	cd backend && uvicorn main:app --reload

run-frontend:
	cd frontend && npm run dev

run-database:
	docker-compose up db

build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

.PHONY: run-server run-frontend build up down
