## Key features include

- CRUD operations for customers (get, update, delete) by id or email;

- login and signup operations for customers;

- roles USER and ADMIN;

- access token;

- refresh token;

- restrict access to get customers operation from unauthenticated users;

- restrict access to delete customer and update customer operations from unauthenticated users and customers with USER role;

- ability to verify customer's account after signup with activation code;

## Installation

```bash
# Install packages
npm install

npx prisma generate
```

## Local database

```bash
# Setup local postgres
docker run --name recruitment-task -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11.16

#create .env file with your local database credentials

# Run migration
npx prisma migrate dev

# Run db seed
npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Apollo GraphQL

Run the Apollo URl and then inside use the SandBox URl

- Apollo URL: https://studio.apollographql.com/sandbox/explorer
- SandBox Url: http://localhost:8080/graphql

## Example Queries

Please check this folder for the example Apollo Studio Queries `src/exampleQueries`

## Authorization Token

To set the Bearer token at https://studio.apollographql.com/sandbox/explorer, you can follow these steps:

1. Open the Explorer

Navigate to the Apollo Studio Sandbox page: https://studio.apollographql.com/sandbox/explorer

2. Locate the Headers tab

At the bottom of the Explorer panel, you'll find a tab labeled "Headers". Click on this tab to open the Headers section.

3. Add the Authorization header

In the Headers section, click on the "New header" button. A new row will appear for adding a new header.

4. Set the header key and value

In the "Header key" field, enter the header key "Authorization". In the "Header value" field, enter the Bearer token you want to use for authentication. For example, if your Bearer token is "your-token-here", you would enter "Bearer your-token-here".

5. Save the header

Once you've entered the header key and value, click on the "Save" button to save the header configuration.

The Bearer token will now be included in all GraphQL requests made through the Explorer, ensuring that your authentication credentials are passed along with each query.

Notes: You can get the Auth Token from the 'token' mutation.

## Improvements / Next Steps

1. Add the statusCode and message for viewing at the Apollo Studio
2. Refactor the signup and activate code for better readability and return classes
3. Add Swagger documentation

## Author

@Talha Ayub - Software Engineer

Contact Details: mtalhaayub752@gmail.com
