const express = require('express')
const router = express.Router()
const Article = require('../models/articles')

//Getting All Articles
router.get('/', async (req, res) => {
  try {
      const articles = await Article.find({}, null, {limit: req.query.limit})
      res.json(articles)
  } catch (err){
    res.status(400).json({message: err.message})
  }
})

//Getting One Article
router.get('/:id', getArticle, (req, res) => {
  res.json(res.article)
    
})

async function getArticle(req, res, next) {
  let article
  try{
    article = await Article.findById(req.params.id)
    if (article == null) {
      return res.status(404).json({ message: 'Cannot find article'})
    }
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }

  res.article = article
  next() 
}

module.exports = router