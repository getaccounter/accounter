# Accounter

[![codecov](https://codecov.io/gh/getaccounter/accounter/branch/master/graph/badge.svg?token=D2EQCHJWZS)](https://codecov.io/gh/getaccounter/accounter)

## Developing

### Installing pre-commit hooks
1. [Install pre-commit](https://pre-commit.com/#install)

2. Install hooks:
```bash
pre-commit install
```

### Development

```bash
docker-compose up
```

### Unit tests

```bash
docker-compose exec web npm t
```

### E2E tests

```bash
docker-compose run e2e
```

### Linting

```bash
docker-compose exec server flake8 accounter
docker-compose exec web npm run lint
```

### typechecking

```
docker-compose exec web npm run typecheck
docker-compose exec server pyright
```
