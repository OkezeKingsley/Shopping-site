const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String
    }

});

itemSchema.index({ name: "text", description: "text" }); // Create text indexes

const itemModel = mongoose.model("items", itemSchema);

module.exports = itemModel;