const mongoose = require('mongoose');

// username: "fcc_test",
//   description: "test",
//   duration: 60,
//   date: "Mon Jan 01 1990",
//   _id: "5fb5853f734231456ccb3b05"

const exerciseSchema = new mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: Date,

},{versionKey:false})

const exercise = mongoose.model('exercise',exerciseSchema);

module.exports = exercise;