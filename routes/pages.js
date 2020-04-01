const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middlewares/api_key.middleware');

router.get("/", (req, res) => {
    res.render('dashboard.ejs', {
    	api_key: req.user.apiKey
    });
});

router.get("/test", apiKeyMiddleware.validate, (req, res) => {
	res.status(200).json({msg:"Valid API KEY"});
});

module.exports = router 