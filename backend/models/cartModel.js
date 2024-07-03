// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const cartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = cartItem;
