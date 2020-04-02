const mongoose = require('mongoose')

var sourceSchema = new mongoose.Schema({
    name: String, 
    description: String, 
    url: String, 
    language: String,
    country: String
}, { collection: 'Source'});

module.exports = mongoose.model('Source', sourceSchema);