const express = require('express');
const router = express.Router();

const constroller = require("../controllers/subscriptions.controller");

router.get("/",constroller.list);



module.exports = router