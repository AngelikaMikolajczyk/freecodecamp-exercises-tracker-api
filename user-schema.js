const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
    description: String,
    duration: Number,
    date:Date
}) 

const userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    count: Number,
    log: [userLogSchema]
})

module.exports = userSchema;