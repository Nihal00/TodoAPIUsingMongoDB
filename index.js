const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(express.json());
const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDM is connected'))
    .catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})