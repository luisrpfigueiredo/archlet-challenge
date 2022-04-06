Please read the `README` before reading this guide.

---

## Prerequisites

- an installed NodeJS version `>=14`
- We recommend using docker. This repository contains a basic docker-compose file which will provide you with a basic PostgreSQL database.
- A graphql client of your choice. For example https://altair.sirmuel.design/
- If you use VSCode, there is also a Prisma extension available, which makes your life a little easier in the `schema.prisma` file.

## Starting points

- If you are new to Prisma, we recommend using their ["Getting Started"](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres) guide.
- This app also relies on a code-first GraphQL schema, provided by [GraphQL Nexus](https://nexusjs.org/) types. They provide a very insightful tutorial, if you need additional help.

## Get started

1. Run `docker compose up -d`. This starts your database in the background.
2. Run `yarn install`
3. Run `yarn setup` to setup the provided, basic database schema and also run the seeders.
4. Run `yarn start` to start the dev server. It will auto-reload whenever you change your code.

---

**NOTE**

You should always have your `yarn start` running. It will ensure that you will always have your latest [GraphQL Nexus](https://nexusjs.org/) types.

---

## Make your schema changes available in code

When you're done with your DB schema, you will need to access it through Prisma. Here a little kickstart: Run `yarn prisma migrate dev` It will generate a migration for you and apply it to the database.

Further you will need to run `yarn prisma generate` which recreates your Prisma client package, so that it reflects your latest schema in the Typescript types.
