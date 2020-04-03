const express = require('express');
const router = express.Router();
const Source = require('../models/sources');
const apiKeyMiddleware = require('../middlewares/api_key.middleware');
const expressValidator = require('express-validator');

router.use(expressValidator());

//Getting All Sources
router.get('/',apiKeyMiddleware.validate, async (req, res) => {
  let queryParams = {};
  /* Setting search by text */
  if(req.query.q){
  }
  if(req.query.language){
    queryParams["language"] = req.query.language ;
  }
  if(req.query.country){
    queryParams["country"] = req.query.country ;
  }
  if(req.query.city){
    queryParams["city"] = req.query.city ;
  }
  if(req.query.state){
    queryParams["state"] = req.query.state ;
  }

    getSources({
      queryParams: queryParams,
      limit: req.params.limit ? parseInt( req.params.limit , 10) : 100
    }, function(err,sources){
      if(err){
        return res.status(500).json({ message: err.message })
      }else{
        res.json(sources);
      }
    });
});

function getSources(req, cb){
  //console.log(req.queryParams);
  Source.find(req.queryParams, null, {limit: req.limit})
  .exec((err, _sources)=>{
    if(err){
      return cb(err);
    }else{
      Source.count(req.queryParams)
      .exec((err, _count)=>{
        if(err){
          return cb(err);
        }else{
          return cb(null,{
            total: _count,
            sources: _sources
          });
        }
      });
    }
  });
}

//Create Sources
router.post('/', async (req, res) => {
    req.checkBody('_id', 'ID is Required').notEmpty();
    req.checkBody('name', 'Name is Required').notEmpty();
    req.checkBody('description', 'Description Is Required').notEmpty();
    req.checkBody('url', 'URL Is Required').notEmpty();
    req.checkBody('language', 'Language Is Required').notEmpty();
    req.checkBody('country', 'Country Is Required').notEmpty();
    req.checkBody('state', 'State Is Required').notEmpty();
    req.checkBody('city', 'City Is Required').notEmpty();
    var errors = req.validationErrors();
    if(errors){
      return res.redirect('/dashboard/sources/new');
    }else{
      const newSource = new Source(req.body);
      newSource.save((err, _source)=>{
        if(err){
          return res.redirect('/dashboard/sources/new');
        }else{
          return res.redirect('/dashboard/sources/list');
        }
      });
    }
});

//Delete Sources
router.delete('/:id', async (req, res) => {
    Source.remove({_id:req.params.id},(err)=>{
      if(err){
        return res.status(500).json({message:err.message});
      }else{
        return res.status(200).json({message:'Source removed correctly.'});
      }
    });
});

module.exports = router;