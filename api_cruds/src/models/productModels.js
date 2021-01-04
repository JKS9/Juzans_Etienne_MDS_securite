const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name_product: {
      type: String,
      required: true,
    },
    description_product: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: 'images/defaul.png'
    },
    price: {
      type: Number,
      required: true,
    },
    id_autor: {
      type: String,
      required: true,
    },
    creat_date: {
      type: Date,
      defaut: new Date()
    }
}, {
  collection: 'Product',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema