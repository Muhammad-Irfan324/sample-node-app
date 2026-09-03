# sample-node-app

Sample Node.js REST API for CI/CD pipeline demonstration. Built with Express on Node 22 LTS, tested with Jest, and containerised with a multi-stage Docker build.

## Prerequisites

- Node.js >= 22 (LTS)
- Docker (for container builds)

## Quick start

```bash
npm install
npm start          # http://localhost:3000
```

## Project structure

```
src/
  index.js           # Server entry point
  app.js             # Express app setup
  routes/
    health.js        # Liveness and readiness probes
    items.js         # CRUD API for items
tests/
  unit/              # Isolated endpoint tests
  integration/       # Full CRUD lifecycle tests
```

## API endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | /health | Liveness probe — returns uptime |
| GET | /health/ready | Readiness probe |
| GET | /api/items | List all items |
| GET | /api/items/:id | Get item by ID |
| POST | /api/items | Create item (`{ "name": "..." }`) |
| PUT | /api/items/:id | Update item |
| DELETE | /api/items/:id | Delete item |

## Testing

```bash
npm run lint             # ESLint
npm test                 # Unit tests
npm run test:integration # Integration tests
npm run test:coverage    # All tests with coverage report
```

15 tests with 100% code coverage across unit and integration suites.

## CI pipeline

The CI workflow calls the reusable [application-ci](https://github.com/Muhammad-Irfan324/platform-workflows) workflow from `platform-workflows` and runs the following checks on every pull request:

| Stage | Check | Tool |
| ----- | ----- | ---- |
| Lint & Test | Linting | ESLint |
| Lint & Test | Unit tests | Jest |
| Lint & Test | Integration tests | Jest + Supertest |
| Security | SAST | SonarQube |
| Security | Dependency scanning | OWASP Dependency-Check |
| Security | Secret scanning | Gitleaks |
| Docker | Image build | Docker (multi-stage) |
| Docker | Container scanning | Trivy |

On merge to main, the pipeline additionally pushes the image to the GitLab Container Registry.

## Docker

```bash
docker build -t sample-node-app .
docker run -p 3000:3000 sample-node-app
```

The image uses a multi-stage build with `node:22-alpine`, runs as a non-root user, and includes a health check.

## Container registry

Images are pushed to the [GitLab Container Registry](https://gitlab.com/muhammad-irfan-tahir/sample-node-app/container_registry) on merge to main.

## SonarQube

Static analysis is performed by SonarQube on every pull request. The project configuration is in `sonar-project.properties`.

## License

Apache 2.0 Licensed. See [LICENSE](LICENSE).
