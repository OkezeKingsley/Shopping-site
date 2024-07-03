const express = require("express");
const { searchFunction, 
        onLoadRecommendation, 
        searchItemByCategoryFunction,
        searchItemByPriceRangeFunction,
        addItemToCart, 
        addItemToCartFunction} = require("../controllers/customerControllers");

const router = express.Router();

router.get("/search", searchFunction);

router.get("/onload-recommendation", onLoadRecommendation)

// Define the route for fetching items by category
router.get("/items-by-category", searchItemByCategoryFunction);

// Route for price range search
router.get("/items-by-price-range", searchItemByPriceRangeFunction); 

router.post("/add-to-cart", addItemToCartFunction);

router.get("/cart-count")
module.exports = router;