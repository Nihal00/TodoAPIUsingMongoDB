const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type : Boolean,
        require: true,
    }, 
    dateTime: {
        type: Date,
        require: true,
        default: new Date()
    },
    username: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("todos", Todo);