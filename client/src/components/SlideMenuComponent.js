// SlideMenuComponent.js
import '../stylingFolder/SlideMenuComponent.css';
import { FaTimes } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function SlideMenuComponent({ showMenu, toggleMenu }) {

  const [numberOfItemInCart, setNumberOfItemInCart] = useState(0)
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (showMenu) {
      setIsVisible(true);
    } else {
      // Add a delay to allow the transition to complete before hiding
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showMenu]);

  const goToCartFunction = () => {
    navigate("/cart")
  }

  useEffect(() => {

    const cart = localStorage.getItem("cart");

    if (cart) {
      setNumberOfItemInCart(JSON.parse(cart))
    }
  }, [])

  // useEffect(() => {
  //   // Function to fetch the number of goods in cart
  //   const fetchCartItemCount = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/customer/cart-count');
  //       setNumberOfItemInCart(response.data.count); // Assuming response contains count property
  //     } catch (error) {
  //       console.error('Error fetching cart item count:', error);
  //     }
  //   };

  //   fetchCartItemCount();
  // }, []); // Fetch only once on component mount


  return (
    <div className={`sliding-menu ${showMenu ? 'sliding-menu-active' : ''} ${isVisible ? '' : 'hidden'}`}>

      <div className="silde-options-container">

      <div className="close-icon" onClick={toggleMenu}>
        <FaTimes />
      </div>

      <FaShoppingCart className="cart-icon" onClick={goToCartFunction}/>
      <p className="no-of-item">{numberOfItemInCart.length}</p>

      <ul className="navbar-list">
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Shop</a>
        </li>
      </ul>
      
    </div>
  </div>
  );
}


export default SlideMenuComponent;
