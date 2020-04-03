const express = require('express')
const router = express.Router()
const Article = require('../models/articles')
const Source = require('../models/sources')
const apiKeyMiddleware = require('../middlewares/api_key.middleware');

//Getting All Articles
router.get('/',apiKeyMiddleware.validate, async (req, res) => {
  let queryParams = {};
  let sortBy = {};
  /* Setting sort field paramater */
  if(req.query.sortBy){
    sortBy[req.query.sortBy] = -1; 
  /* If there is no parameter, order by natural */ 
  }else{
    sortBy["publishedAt"] = -1;  
  }
  /* Setting search by text */
  if(req.query.q){
    queryParams["$text"] = { "$search": req.query.q.replace(/,/g,' ') } ;
  }
  /* Setting both dates from & to */
  if(req.query.from || req.query.to){
      /* Setting date search from */
      if(req.query.from){
        queryParams["publishedAt"] = {
          "$gte": req.query.from
        }
      }
      /* Setting date search to */
      if(req.query.to){
        queryParams["publishedAt"] = {
          "$lte": req.query.to
        }
      }
      /* Setting both params if they exist */
      if(req.query.to && req.query.from){
        queryParams["publishedAt"] = {
          "$lte": req.query.to,
          "$gte": req.query.from
        }
      }
  /* If there is no date param, retrieve from last 6 months*/ 
  }else{
    let currentDate = new Date();
    let sixMonthRange = currentDate.setMonth( currentDate.getMonth() - 6 );
    //console.log(sixMonthRange, new Date(sixMonthRange).toISOString());
    queryParams["publishedAt"] = {
      "$gte": new Date(sixMonthRange).toISOString()
    };
  }
  //console.log(req.query);
  /* Search domains first, then searching by params with source_id */
  if(req.query.domains){
    try{
      const regex = req.query.domains.replace(/,/g,'|');
      const sources = await Source.find({
        "url": { "$regex": regex, "$options":"i" }
      }).distinct('_id');
      queryParams["source_id"] = { $in: sources };
      getArticles({
        queryParams: queryParams,
        limit: req.params.limit ? parseInt( req.params.limit , 10) : 100 ,
        sortBy: sortBy
      }, function(err,articles){
        if(err){
          return res.status(500).json({ message: err.message })
        }else{
          res.json(articles);
        }
      });
    }catch(err){
      return res.status(500).json({ message: err.message })
    }
  /* If there is no domains param, search with other params */
  }else{
    getArticles({
      queryParams: queryParams,
      limit: req.params.limit ? parseInt( req.params.limit , 10) : 100 ,
      sortBy: sortBy
    }, function(err,articles){
      if(err){
        return res.status(500).json({ message: err.message })
      }else{
        res.json(articles);
      }
    });
  }
});

function getArticles(req, cb){
  console.log(req);
  Article.find(req.queryParams, null, {limit: req.limit})
  .sort(req.sortBy)
  .exec((err, _articles)=>{
    if(err){
      return cb(err);
    }else{
      Article.count(req.queryParams)
      .exec((err, _count)=>{
        if(err){
          return cb(err);
        }else{
          return cb(null,{
            total: _count,
            articles: _articles
          });
        }
      });
    }
  });
}

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