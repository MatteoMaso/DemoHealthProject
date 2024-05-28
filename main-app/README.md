# Main Backend application

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

Tests are not implemented yet.

## Database

This project rely on PostgreSQL database and Prisma as ORM.

How to modify the database:

**Step 1**: Modify `schema.prisma`

Update your `schema.prisma` file to reflect the changes you want to make to your database schema. This might include adding new models, modifying existing models, or deleting models.

**Step 2**: Create the new migration

Run the following command to create a new migration and apply it to your database.

```bash
# For development environments:
npx prisma migrate dev --name <migration-name>

# For production environments:
npx prisma migrate deploy
```

**Step 3**: Generate the new client

Run the following command to generate the Prisma client based on your updated schema:

```bash
npx prisma generate
```

**Step 4**: [Optional] Check the status of the database vs database schema

You can check the status of your migrations with the following command:

```bash
npx prisma migrate status
```
