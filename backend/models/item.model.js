const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    todo_item: {
        type: String,
        required: true
    },
    todo_description: {
        type: String,
        required: true
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Item', Item);