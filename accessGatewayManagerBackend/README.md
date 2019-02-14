# accessGatewayManager

# Postgres

## Start Docker Container

```sh
docker-compose up
```

## Deploy

```sh
heroku git:remote -a access-gateway-manager
git push heroku
```

BACKEND_SOURCE_DIR=accessGatewayManagerBackend
FRONTEND_SOURCE_DIR=accessGatewayManager
