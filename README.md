# Nest API Todo

## Description

Todo App

## Prerequisites

#### Postgres
```bash
$ docker run --name my-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
$ docker exec -it my-postgres bash
$ psql -U postgres
$ create database development;
$ create user dev with encrypted password 'password';
$ grant all privileges on database development to dev;
```

#### Redis
```bash
$ docker run --name my-redis -p 6379:6379 -d redis
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
