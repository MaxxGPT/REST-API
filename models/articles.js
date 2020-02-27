const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({
    author: {
        type:String,
    },
    content: {
        type:String,
    },
    description: {
        type:String,
    },
    publishedAt:{
        type:Date,
    },
    source_id: {
        type:String,
    },
    summarization:{
        type:String,
    },
    title:{
        type:String,
    },
    url:{
        type:String,
    },
    urlToImage: {
        type:String,
    },

})

module.exports = mongoose.model('article', articlesSchema)