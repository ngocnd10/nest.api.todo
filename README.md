# Nest API Todo

## Description

Todo App

## Prerequisites

#### Postgres
```bash
$ docker pull postgres
$ docker run --name my-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
$ docker exec -it my-postgres bash
$ psql -U postgres
$ create database development;
$ create user dev with encrypted password 'password';
$ grant all privileges on database development to dev;
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
