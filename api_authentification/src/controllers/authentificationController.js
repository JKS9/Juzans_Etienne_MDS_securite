const process = require("process")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const usersSchema = require('../models/usersModels.js');
const UserModel = mongoose.model('User', usersSchema);

const dotenv = require("dotenv")
dotenv.config()

const accessTokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESH_TOKEN

const { USERNAME_PATTERN } = require("../assets/regex/regex.js")

const refreshTokenController = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
			return res.status(400).json("your request does not contain any Token Refresh field")
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
			if (err) {
				return res.status(401).json("Authentification failed")
			}

			const accessToken = jwt.sign({ username: user.username, sub: user.idUser }, accessTokenSecret, { expiresIn: '1h' })

			return res.status(201).json({ accessToken })
    })
}

const AuthentificationUser = async (req, res) => {
    // Read username and password from request body
    const { name, password } = req.body

    if (!name) {
      return res.status(400).json("your request does not contain any name field")
    }
    if (USERNAME_PATTERN.test(name)) {
      return res.status(400).json("Incorrect name spelling")
    }
    if (!password) {
      return res.status(400).json("your request does not contain any password field")
    }

    UserModel.findOne({ name: name, password: password }).then(user => {
			if (user) {
				// Generate an access token
				const accessToken = jwt.sign({ name: user.name,  sub: user._id }, accessTokenSecret, { expiresIn: '1h' })
				const refreshToken = jwt.sign({ name: user.name, sub: user._id }, refreshTokenSecret, { expiresIn: '10h' });
				
				return res.status(200).json({
					accessToken,
          refreshToken,
          iduser: user._id
				})

			} else {
				return res.status(403).json('Username or password incorrect')
			}
    })
}

module.exports = { AuthentificationUser, refreshTokenController}
