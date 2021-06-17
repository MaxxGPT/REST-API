require("dotenv").config();

const Subscriptions = require("../models/subscriptions");

module.exports = {
    list : (req,res) => {
        Subscriptions.find({}).exec().then(_subs => res.status(200).json(_subs))
    }
}