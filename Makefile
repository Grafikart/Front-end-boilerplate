docker := `command -v docker`
php := php
composer := composer
user := $(shell id -u)
group := $(shell id -g)
node := node

ifdef nodocker
php := docker-compose run -u "$(user):$(group)" --rm -p 8000:8000 -w /usr/src/myapp php php
composer := docker-compose run php composer
node := docker-compose run -u "$(user):$(group)" --rm node
endif

.PHONY: help
help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: dev
dev: node_modules vendor ## Lance le serveur de développement
	make -j 2 php-server js-server

.PHONY: php-server
php-server:
	$(php) -S 0.0.0.0:8000 -t public -d display_errors=1

.PHONY: js-server
js-server:
	npx parcel src/index.html

build: node_modules
	npx parcel build src/index.html
	@echo "Project build successfully"

test: ## Lance les tests pour le projet
ifdef docker
	docker-compose run --rm start_dependencies
endif
	$(php)unit

clean: ## Nettoie le projet
ifdef docker
	docker-compose down
endif

node_modules:
	$(node) yarn

vendor:
	$(composer) install
