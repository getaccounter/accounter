# Accounter

[![codecov](https://codecov.io/gh/getaccounter/accounter/branch/master/graph/badge.svg?token=D2EQCHJWZS)](https://codecov.io/gh/getaccounter/accounter)

## Developing

### Installing pre-commit hooks

```bash
pip install pre-commit
pre-commit install
```

### Running stack

```bash
docker-compose up
```

### Running e2e tests

```bash
docker-compose run e2e
```

### Running unit tests

```bash
docker-compose exec web npm t
```

### Linting

```bash
docker-compose exec server flake8 accounter
docker-compose exec web npm run lint
```

### typechecking

```
docker-compose exec web npm run typecheck
```
