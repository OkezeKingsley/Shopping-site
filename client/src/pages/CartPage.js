import { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import '../stylingFolder/CartPage.css'
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

function CartPage () {

    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    useEffect(() => {

        const cart = localStorage.getItem('cart');

        if (!cart) {

        } else {
          console.log("all cart item", cart)
            setItems(JSON.parse(cart))
        }

    }, []);

    useEffect(() => {
      if (items && items.length > 0) {
        console.log(items)
        let sum = 0;
        items.forEach((item) => {
          sum += item.price * item.quantity
        })
        setSubtotal(sum)
      }
    }, [items])

    const handleQuantityChange = (index, quantity) => {

        if (quantity < 1) return;

        const updatedItems = [...items];
        updatedItems[index].quantity = quantity;
        setItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setSubtotal(
          updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
      };
    
      const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setSubtotal(
          updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
      };

    return (
        <div>
          <HeaderComponent />
    
          <div className="cart-container">
            <div className="top-heading">
                <div>
                <p>Cart</p>
                </div>
                <div>
                {/* <button className="checkout-btn">Go Back</button> */}
                </div>
            </div>
        
            <div className="product-heading">
                <div>
                <p>Product</p>
                </div>
                <div>
                <p>Quantity</p>
                </div>
                <div className="product-heading-price-container">
                <p>Price</p>
                </div>
            </div>
        
            <div className="product-list">
                {items.map((item, index) => (
                <div className="product-item" key={index}>
                    <div className="product-item-name" 
                        onClick={() => navigate("/view-item-page", { 
                        state: { itemName: item.name, 
                                itemPrice: item.price, 
                                itemImage: item.image,
                                itemDescription: item.description } 
                        })}>{item.name}</div>
                    <div className="quantity-container">
                    <button
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                    >
                        -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    >
                        +
                    </button>
                    </div>
                    <div className="product-item-price"><b>N</b> {item.price * item.quantity}</div>
                    <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(index)}
                    >
                    {screenWidth >= 850 ?  'Remove' : <FiX className="cancel-icon"/> }
                    </button>
                </div>
                ))}
            </div>
        
            <p className="subtotal">Subtotal: N {subtotal}</p>
            <button className="checkout-btn" onClick={() => navigate("/billing-page")}>Checkout</button>
          </div>
        </div>
      );
}

export default CartPage;