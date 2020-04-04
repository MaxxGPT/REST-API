install:
	docker-compose -f docker-compose.builder.yml run --rm install_api
	docker-compose -f docker-compose.builder.yml run --rm install_app

dev:
	docker-compose -f docker-compose.yml up mongo.asatera.com api.asatera.com proxy.asatera.com app.asatera.com

down:
	docker-compose -f docker-compose.yml down