import HeaderComponent from "../components/HeaderComponent";
import '../stylingFolder/ViewItemPage.css'
import image1 from '../image/image1.jpg';
import axios from 'axios';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

function ViewItemPage () {
  const location = useLocation();
  const itemName = location.state.itemName;
  const itemPrice = location.state.itemPrice;
  const itemImage = location.state.itemImage;
  const itemDescription = location.state.itemDescription;
  const itemId = location.state.itemId;
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      name: itemName,
      price: itemPrice,
      description: itemDescription,
      image: itemImage,
      quantity,
      id: itemId
    };
  
    // Get the existing cart from local storage
    let cart = localStorage.getItem('cart');
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }

    // Check if item already in cart
    const itemFound = cart.filter((itemInCart) => itemInCart.itemId === itemId);

    if (itemFound.length === 0) {
      // Add the new item to the cart
      cart.push(cartItem);
      // Store the updated cart in local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
    } else {
      // Let then replace the quantity in the cart
      // incase user change the quantity
      const existingItem = itemFound[0];
      existingItem.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
  };

    return (
        <div className="view-item-container">
          <HeaderComponent />

          <div className="center-item-container">

            <div className="flex-body-container">

              <div className="item-image-container">
                <img src={itemImage} alt="Product Image" className="image"/>
              </div>
              
              <div className="item-detail">
                <h3 className="item-name">{itemName}</h3>
                <p className="item-price">N {itemPrice * quantity}</p>
                <p >Other fees will be calculated at checkout</p>
                <hr />
                <div className="item-description">
                  {itemDescription}
                </div>
                <hr />
                <div className="quantity-container">
                  <button className="volume-button" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                  <p className="number-of-order">{quantity}</p>
                  <button className="volume-button" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
                {showMessage && <p className="success-message">Item added to cart</p>}
              </div>
            </div>
          </div>
        </div>
      );
}

export default ViewItemPage;