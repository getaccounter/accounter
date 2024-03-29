# Accounter

## Developing

### Installing pre-commit hooks

1. [Install pre-commit](https://pre-commit.com/#install)

1. [Install terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

1. Install hooks:

```bash
pre-commit install
pre-commit install --hook-type commit-msg
```

### Development

```bash
docker-compose up
```

After all services are running, run the web on http://localhost:8080

### Unit tests

```bash
docker-compose exec web npm t
docker-compose exec server ./manage.py test
```

### Linting

```bash
docker-compose exec server flake8 accounter
docker-compose exec web npm run lint
```
