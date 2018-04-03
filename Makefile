.PHONY: build dev require migrate artisan clean deploy

docker := $(shell (which docker &> /dev/null) && (docker ps 2> /dev/null))
watch := 'src/**/*.php'
php := php
composer := composer
user := $(shell id -u)
group := $(shell id -g)
node := 

ifdef docker
php := docker-compose run -u "$(user):$(group)" --rm -p 8000:8000 -w /usr/src/myapp php php
composer := docker-compose run php composer
node := docker-compose run -u "$(user):$(group)" --rm node
endif

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: node_modules vendor ## Lance le serveur de développement
	$(node) npm run dev &\
		$(php) -S 0.0.0.0:8000 -t public -d display_errors=1
	#	maildev &\
		browser-sync start --proxy 'localhost:8000' --files $(watch) --no-open --no-notify --no-ui --no-ghost-mode --port 3000

build: node_modules vendor
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

deploy: ## Deploie l'application
	ansible-playbook -i ansible/hosts ansible/deploy.yml --vault-password-file ~/.vault_pass

node_modules:
	$(node) yarn

vendor:
	$(composer) install