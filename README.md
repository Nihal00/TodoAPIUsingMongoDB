- what is database and types of DB
- structure of NOSQL and SQL DB
- creating our first DB in MongoDB Atlas
- MongoDB Compass 
- Different methods of MongoDB (Mongoose)
- How Data is stored in DB
- Start out Todo API Using MongoDB as DB


### What is a Database?
A database is an organized collection of data, which is stored eletronically in a server / cloud

### Types of Databases
1. SQL
    - Relational Database
    - tables => rows and columns
    - Structured => Not fexible 
    - Good for Complex quereis
    - MySQL, PostgreSQL
2. NoSQL
    - Non Relational Database
    - collections => documents 
    - Fexible => Dynamic
    - Not goog for complex quereis
    - MongoDB, DynamoDB, Firestore

### Structure of NoSQL and SQL 

NoSQL: Collection => [ Documents ]
        Users => [ {id, name, age }, {id, name, age}]
SQL: Table => Rows and Columns


## MongoDB => NoSQL database
MongoDB is built on scale-out archituture


## Mongoose function

### Methods to query over MongoDB

- find({ isCompleted: false })  
- findByID( id )
- findByIDAndUpdate( id, { isCompleted: true })
- findByIDAndDelete( id )
- findOneAndUpdate({ userName: abc }, { isCompleted: true })
- findOneAndDelete({ })
- findOne({ })

### Todo Schema / Model
- Title
- isCompleted
- dateTime
- userName