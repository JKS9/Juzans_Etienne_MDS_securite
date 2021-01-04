// import Controllers
const productController = require("../src/controllers/productController")
// import JWT verify token
const { authenticateJWT } = require("../src/middlewares/authenticationVerify")
// Routes
module.exports = (app) => {
	 // Route Login
  app.post("/CreatProduct", authenticateJWT, productController.CreatProduct)  
  app.get("/ShowProduct", productController.ShowAllProduct)  
  app.delete("/DeleteProduct/:id", authenticateJWT, productController.DeleteProduct)  

  app.use((req, res) => {
    res.status(404).json({url: req.originalUrl, error: 'not found'})
  })
}