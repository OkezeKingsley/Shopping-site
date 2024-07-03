const itemModel = require("../models/itemModel");
const cartItem = require('../models/cartModel');


const searchFunction = async (req, res) => {

    const { query } = req.query;

    try {
        const results = await itemModel.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        console.log("search result", results);

        res.json(results);

    } catch (error) {
        console.error("Error fetching search results", error);
        res.status(500).send({error: "Internal Server Error!"});
    }

};

const onLoadRecommendation = async (req, res) => {

    try {
        // For simplicity, recommending the latest 10 items
        const recommendations = await itemModel.find().sort({ createdAt: -1 }).limit(10);
        res.json(recommendations);
      } catch (error) {
        res.status(500).send({error: "Internal Server Error!"});
      }

}


const searchItemByCategoryFunction = async (req, res) => {

    const { category } = req.query;

    try {
        const items = await itemModel.find({ category });
        console.log('categories', items)
        res.json(items);
    } catch (error) {
        console.error("Error fetching items by category", error);
        res.status(500).json({ error: "Server Error" });
    }
  }


const searchItemByPriceRangeFunction = async (req, res) => {

    const { min, max } = req.query;
    try {
        const items = await itemModel.find({
        price: { $gte: min, $lte: max }
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items by price range" });
    }
};


const addItemToCartFunction = async (req, res) => {
    const { name, price, description, image, quantity } = req.body;
  
    if (!name || !price || !description || !image || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const newItem = new cartItem({
        name,
        price,
        description,
        image,
        quantity
      });
  
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(500).json({ error: 'Error adding item to cart' });
    }
  };



// const getCartCountFunction = (req, res) => {
//     const count = cartItems.length;
//     res.json({ count }); // Send the count as JSON response
//   };

module.exports = { searchFunction, 
                   onLoadRecommendation, 
                   searchItemByCategoryFunction, 
                   searchItemByPriceRangeFunction,
                   addItemToCartFunction  };