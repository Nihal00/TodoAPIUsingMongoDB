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
- save()

### Todo Schema / Model
- Title
- isCompleted
- dateTime
- userName

## Middlewares
- global middleware
- specific middleware
- Middleware has acess to req, res object of every api call(req, res, next())
- Middleware are function that have access to the req, res object and next middleware present in the middleware stack

### Tasks of Middleware
- Excute the code
- It can make changes to req and res cycle
- To call the next middleware

#### Logger Middleware


### Authentication
- Proving a user's identity, by proving their credentials so that they can access the resourse 
- 2 types of Auth
    - Basic Auth
    - JWT Auth => JSON Web token 

#### Basic Auth

Sytax: - 'X-myWebsit' : Basic[ base64encoded(username:password) ]

#### JWT Auth
- JWT = JSON WEB TOKEN
- JWT Auth allows information exchange between in client and server in JSON format. It Combines it with high security standards

##### Parts of token
- Headers => what tyoe if algo signature uses like SHA256 => base64 encoded
- Payload => having a object and pass like user, userid, email other then password => base64 encoded
- Signature => encrypted based on the algo defined in headers 


##### Topics
- Auth Middleware
- Pagination, sorting
- SQL, Struture
- Data Types in SQL
- Different Types of SQL Commond

###### Pagination
- Page infomation
- We pass this throught query
- Skip and Limit function
- 