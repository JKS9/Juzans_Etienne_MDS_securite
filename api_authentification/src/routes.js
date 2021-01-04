// Controllers
const authController = require("./controllers/authentificationController.js")

// Routes
module.exports = (app) => {
	// Route Login
	app.post("/Login", authController.AuthentificationUser)  
	app.post("/refreshToken", authController.refreshTokenController)  

  app.use((req, res) => {
    res.status(404).json({url: req.originalUrl, error: 'not found'})
  })
}