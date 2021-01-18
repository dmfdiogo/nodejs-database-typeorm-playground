# About the challenge

In this challenge, i must keep developing a transaction management application, training what i've  learned so far in Node.js together with TypeScript, but this time including using a database with TypeORM and sending files with Multer!

This will be an application that should store incoming and outgoing financial transactions and allow the registration and listing of those transactions, in addition to allowing the creation of new records in the database by sending a csv file.

# Features

- [X] Should be able to create a new transaction. New transactions cannot result in negative balance sheet (financial snapshot). Returns a json with the new created transaction.

- [X] should not be able to create outcome transaction without a valid balance. Transactions of type outcome cannot exceed the total amount the user has in cash (total income), returning a response with HTTP 400 code and an error message in the following format: { error: string}.

- [X] should create tags when inserting new transactions. On creating a new transaction with a category that doesn't exists, should create a new category and inserted at category_id field from transactions table with it's newly created id.

- [X] should not create tags when they already exists. On creating a new transaction with an existing category, should be assigned to the category_id field of the transaction with the id of that existing category, not allowing thus, the creation of categories with same name.

- [X] should be able to list the transactions. Should return an array with all transactions followed by the balance sheet in the end.

- [X] should be able to delete a transaction. Returns empty response with 204 status on exclusion.

- [X] should be able to import transactions: Should allow upload of a CSV file, create transactions and categories read from this file, and finally, should return all imported transactions.

# Example of Transaction
```
{
  "id": "uuid",
  "title": "Payment",
  "value": 8000,
  "type": "income",
  "category": "Salary"
}
```

# Example of GET /Transactions
```
{
  "transactions": [
    {
      "id": "4da8a022-e686-4a79-b25f-cb40f414fa41",
      "title": "Loan",
      "type": "income",
      "value": 1500,
      "created_at": "2021-01-18T03:54:00.891Z",
      "updated_at": "2021-01-18T03:54:00.891Z",
      "category": {
        "id": "e3e799af-9d48-4576-8553-d3405b327b7d",
        "title": "Others",
        "created_at": "2021-01-18T03:54:00.877Z",
        "updated_at": "2021-01-18T03:54:00.877Z"
      }
    },
    {
      "id": "5ba9a051-bd1d-48e1-a15f-0f0fd77e96bc",
      "title": "Website Hosting",
      "type": "outcome",
      "value": 50,
      "created_at": "2021-01-18T03:54:00.891Z",
      "updated_at": "2021-01-18T03:54:00.891Z",
      "category": {
        "id": "e3e799af-9d48-4576-8553-d3405b327b7d",
        "title": "Others",
        "created_at": "2021-01-18T03:54:00.877Z",
        "updated_at": "2021-01-18T03:54:00.877Z"
      }
    },
    {
      "id": "d2e0bf26-da33-478c-96eb-6ba2c7926736",
      "title": "Ice cream",
      "type": "outcome",
      "value": 3,
      "created_at": "2021-01-18T03:54:00.891Z",
      "updated_at": "2021-01-18T03:54:00.891Z",
      "category": {
        "id": "48620ee7-219e-4d11-bf29-84650f72f961",
        "title": "Food",
        "created_at": "2021-01-18T03:54:00.877Z",
        "updated_at": "2021-01-18T03:54:00.877Z"
      }
    }
  ],
  "balance": {
    "income": 1500,
    "outcome": 53,
    "total": 1447
  }
}
```
