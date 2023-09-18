# pkg-name

Monorepo starter with React, TRPC, Prisma and Turborepo.


## Setup

### Firebase

Create a firebase project and add a web app. Copy the config to the `firebase.ts` in the web application. To be able to use firebase on the server you need to create a service account and add the credentials to the .env file in the api. It should be base64 encoded.

### URLs

Add the URLs to the .env file in the api and web application for TRPC to work correctly.

```bash
# client
VITE_API_URL=http://localhost:3003

# api
CLIENT_URL="http://localhost:3005"
```

### Local development

Local development is possible without firebase, using environment variables.

```bash
# client
VITE_DEVELOPMENT_UID=Y3Qls16qV7dRWrsqRxyLu4ra8wl1   # external (firebase) id
VITE_LOCAL_DEVELOPMENT=true

# api
LOCAL_DEVELOPMENT=true
DEVELOPMENT_UID=1                                   # local user id in the db
NODE_ENV=development
```

## Deployment

The setup is currently configured for deployment on Dokku as seen on the deployment scripts.
The server should be accesible with `ssh dokku`.

~/.ssh/config

```txt
Host dokku
HostName <ip-address>
User root
ForwardAgent yes
```

## Database

Update docker-compose file with your database credentials.

```bash
# use local docker instance (change .env)
nr db:local:run

# see logs
nr db:local:logs

# reset database (remove all data)
nr db:reset

# in db package
# migrate database
nr db:migrate:dev

# migrate database (production)
nr db:migrate:prod
```

## Build specific app

```bash
# build web
turbo run build --filter=web
```

## Clean build

```bash 
# clean everything and run api
nr clean && find . -name '.turbo' | xargs rm -rf && ni && nr build --filter api && node apps/api/dist/index.cjs
```
