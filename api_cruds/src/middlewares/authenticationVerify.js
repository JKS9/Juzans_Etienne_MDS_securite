const process = require("process")
const jwt = require('jsonwebtoken')

const dotenv = require("dotenv")
dotenv.config()

const accessTokenSecret = process.env.TOKEN

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, accessTokenSecret, (err, user) => {
			if (err) {
				return res.status(401).json("Authentication failed, please reconnect")
			}

			req.user = user;
			next();
		});
	} else {
		return res.status(401).json("your request does not contain any authorization field")
	}
}

/*const authHeader = req.headers.authorization
const token = authHeader.split(' ')[1]
// get the decoded payload and header
var decoded = jwt.decode(token, {complete: true});
console.log(decoded.payload.sub)*/

module.exports = { authenticateJWT }
