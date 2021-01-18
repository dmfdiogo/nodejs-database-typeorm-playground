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

- [X] should be able to import transactions: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte modelo. Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.
