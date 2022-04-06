# Backend Developer Challenge

Hello, and welcome to the Archlet Backend Engineering Coding Challenge!

## Introduction

In this challenge, we would like you to design and implement an MVP for supporting the handling and storing of client data in our data import module.
When a user (also called buyer) wants to analyze a sourcing project in Archlet, they upload a so called bid sheet in Excel format.
This bid sheet contains on one side information from the buyers where they specify what they need to buy. The products that they purchase are called items. Information related to an item always includes a product name and a volume.
On the other side, the bid sheet also contains the information of the offers from the different suppliers. The offers specify the prices and specifications of the different suppliers for these items. It is not necessarily the case that each supplier has an offer for each item. Examples of bid sheets can be found in `/SampleData`.

## Goal of the Challenge

The main goal of this challenge is to design and implement a backend service that processes these bid sheets, stores the data in a database and makes them available for reading. You will need to:

1. Design and implement a database schema to store bid sheet data. `schema.prisma` provides you with a starter. Please also send us a visualization of your schema (hand drawn, drawio or any other tool).
2. Implement a logic that accepts the Excel file and stores it in the database. `./src/graphql/mutation.ts` provides you with an entry point.
3. Add basic GraphQL resolvers to access your data. For example: Let us query all items for a project.
4. (Optional) Add some tests to your solution

## Requirements

- Please use TypeScript and GraphQL as provided by this starter. Other than that, you are free to modify our code and use different libraries, if it helps.
- When you design the database schema, you need to consider the following:
  - Not every Excel is the same and contains different columns. However, all data is important to our customers. Create a schema, that can handle this.
  - Think about how you would use this data. What would be a reasonable domain model?
- We work with a multi-tenancy approach. Please consider this.
- (Out of scope) There is no need to build a frontend interface as we are mainly interested in the API response from the backend. If it helps you building & testing your backend you can do so.

## Getting started

The `GETSTARTED.md` will show you how to setup this project.

## Allowed Tools

Currently this starter provides you with a Postgres database, but for the challenge you are free to use any kind of database or persistent storage you are most familiar with. Relational databases would have preference, but also nosql databases are fine if you can defend the choice well.

## Sample Data

In the same folder as this readme you will find some sample data sets to illustrate well how different these bid sheets can look depending on the client or the use case. Use them for testing your solution.

FYI: All the data included in the files is randomly generated, so the numbers might not add up :)

## Preparation task

You will receive an invite from us to present and discuss your solution with our engineers. You should be prepared to discuss about how the schema and code should be structured. Also consider scalability, possible bottlenecks, challenges, ideas for modularity and future improvements for your solution.

## Closing Remarks

This task is designed to take 2-3 hours to complete. Please do not invest much more time than that. Instead of rushing to make sure that all the functionality is there, we would rather see clear API definitions for everything and a few well implemented parts.
This way we will have a good starting point for the review meeting. If you have any questions, do not hesitate to reach out to us.
Good luck and happy coding!
