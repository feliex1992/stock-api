# Stock-API
## Description

stock-api is backend service powered by ExpressJS and TypeScript starter repository.

## Requirement
 - NodeJS < v18
 - Docker

## Tech stack
 - ExpressJs
 - Postgresql
 - Redis
 - knexjs
 - whatsapp-web.js

## Structure Folder
```
.
├── README.md
├── dist
├── docker
│   └── docker-compose.yml
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── controllers
│   │   ├── dtos
│   │   ├── repositories
│   │   ├── routes
│   │   ├── use-cases
│   │   └── utils
│   ├── domain
│   │   └── entities
│   ├── infrastructure
│   ├── migrations
│   └── seeds
└── tsconfig.json
```

## How to start
##### 1. Config pgsql and redis by run this command
```
cd docker
docker compose up -d
```
##### 2. Install dependecies project
```
npm install
```
##### 3. Run migration from root of project
```
npm run migration
```
##### 4. Create seed data by runnig this command
```
npm run seed
```
##### 5. Done, now you can start run the project
```
npm run start:dev
```