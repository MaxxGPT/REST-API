const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({
    author: String, content: String, description: String, publishedAt: Date, source_id: String, summarization: String, title: String, url: String, urlToImage: String}, { collection: 'Articles'});

module.exports = mongoose.model('article', articlesSchema)