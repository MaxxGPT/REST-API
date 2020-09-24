const Users = require('../models/users');
const expressJwt = require('express-jwt')
const_ = require('lodash')
const fetch = require('node-fetch')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../helpers/dbErrorHandling')
const AWS = require('aws-sdk')

const SESConfig = {
	apiVersion: '2010-12-01',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_SES_REGION,
};


exports.register = (req, res) => {
	const {name, email, password} = req.body
	const errors = validationResult(req)

	if(!error.isEmpty()){
		const firstError = errors.array().map(error => error.msg)[0]
		return res.status(422).json({
			error: firstError
		})
	} else {
		Users.findOne({
			email 
		}).exec((err, user) => {
			//if user exist
			if (user) {
				return res.status(400).json({
					error: "Email is taken"
				})
			}
		})

		//Generate Token
		const token = jwt.sign(
			{
				name,
				email,
				password,
			},
			process.env.JWT_ACCOUNT_ACTIVATION,
			{
				expiresIn: '15m'
			}
		)

		//Email data sending

		const emailData = {
			from: process.env.EMAIL_FROM,
			to: to,
			subject: 'Account Activation Link',
			html:`
				<h1>Please Click link to activate your account</h1>
				<p>${process.env.CLIENT_URL}/users/activate/${token}</p>
				<hr/>
				<p>This email contain sensitive info</p>
				<p>${process.env.CLIENT_URL}</p>
			`	
		}

		new AWS.SES(SESConfig).sendEmail(emailData).then(sent => {
			return res.json({
				message:`Email has been sent to ${email}`
			})
		}).catch(err => {
			return res.status(400).json({
				error:errorHandler(err)
			})
		})
	}
}

module.exports = {
	getUserByEmail: function(email, callback){
	    var query = {email: email};
	    Users.findOne(query, callback);
	},
	getUserById: function(id, callback){
	    Users.findById(id, callback);
	}
}