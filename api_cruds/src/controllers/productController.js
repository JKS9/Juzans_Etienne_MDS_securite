//const process = require("process")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const productSchema = require('../models/productModels.js')
const ProductModel = mongoose.model('Product', productSchema)

const userSchema = require('../models/usersModels.js')
const UserSchema = mongoose.model('User', userSchema)

const dotenv = require("dotenv")
dotenv.config()

const { USERNAME_PATTERN } = require("../assets/regex/regex.js")

const CreatProduct = async (req, res) => {
    const { name, description, price } = req.body

    if (!req.body) {
        return res.status(400).json({message: "your request does not contain any body"})
    }
    if (!name) {
        return res.status(400).json({message: "your request does not contain any name field"})
    }
    if (USERNAME_PATTERN.test(req.body.name)) {
        return res.status(400).json({message: "your request does not contain any name valide"})
    }
    if (!description) {
        return res.status(400).json({message: "your request does not contain any description field"})
    }
    if (description.length < 3 || description.length > 250) {
        return res.status(400).json({message: "your product description must be 250 characters maximum and 3 minimum"})
    }
    if (!price) {
        return res.status(400).json({message: "your request does not contain any price field"})
    }
    if (isNaN(price)) {
        return res.status(400).json({message: "Price is not Number 'ex:1,2,3,4'"})
		}
		
		// get the decoded payload and header
		const authHeader = req.headers.authorization
    	const token = authHeader.split(' ')[1]
		const decoded = jwt.decode(token, {complete: true})

		UserSchema.findById(decoded.payload.sub, function (err, docs) { 
			if (err) return res.status(400).json({message: "Token false"})
			const product = {
				name_product: name,
				description_product: description,
				price: price,
				id_autor: decoded.payload.sub
			}
			const newProduct = new ProductModel(product)
	
			newProduct.save(function(err, doc) {
					if (err) return res.status(400).json({message: "add new Product failed"})
					return res.status(201).json({message: "add new Product succussfully"})
			})
		})
}

const ShowAllProduct = async (req, res) => {
	// get the decoded payload and header
	ProductModel.find({},function (err, docs) { 
		if (err) return res.status(400).json({message: "Any Product"})
		return res.status(201).json({docs})
	})
}

const DeleteProduct = async (req, res) => {
	const { id } = req.params

	if (!id) {
		return res.status(400).json({message: "your request does not contain any 'id'"})
	}

	// get the decoded payload and header
	const authHeader = req.headers.authorization
	const token = authHeader.split(' ')[1]
	const decoded = jwt.decode(token, {complete: true})

    ProductModel.findById({_id: id}, function (err, docs) { 
		if (err) return res.status(400).json({message: "Any Product with this 'id'"})
		if (docs.id_autor != decoded.payload.sub) {
			return res.status(400).json({message: "You don't have a permission"})
		}

		ProductModel.deleteOne({ _id: id}, function (err) {
			if(err) console.log(err)
			return res.status(201).json({message: "Delete Product succussfully"})
		})
	})
}

module.exports = { CreatProduct, ShowAllProduct, DeleteProduct }
