import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../stylingFolder/ShopPage.css';
import image1 from '../image/image1.jpg';
import image2 from '../image/image2.jpg';
import image3 from '../image/image3.jpg';
import debounce from 'lodash.debounce';
import HeaderComponent from '../components/HeaderComponent';
import SlideMenuComponent from '../components/SlideMenuComponent';
import { useNavigate } from 'react-router-dom';
import { FiCode } from "react-icons/fi";


function ShopPage () {
  // const items = [
  //   { id: 1, name: 'Item 1', price: 1000, image: image1 },
  //   { id: 2, name: 'Item 2', price: 2000, image: image2 },
  //   { id: 3, name: 'Item 3', price: 3000, image: image3 },
  //   // ...
  // ];
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [onLoadRecommendations, setOnLoadRecommendations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const filterRef = useRef(null);

 


  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`/customer/onload-recommendation`);
      // setOnLoadRecommendations(response.data);
      setItems(response.data)
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);


  const fetchSearchResults = debounce(async (query) => {
    if (query.length >= 1) {
      try {
        const response = await axios.get(`/customer/search?query=${query}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    } else {
      setItems([]);
    }
  }, 0);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchSearchResults(query);
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  // Event handler for price range change
  const handlePriceRangeChange = async () => {
    try {
      const response = await axios.get(`/customer/items-by-price-range?min=${minPrice}&max=${maxPrice}`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items by price range", error);
      setItems([]);
    }
  };

  const handleFocus = () => {
    setSearchFocused(true);
    setSelectedCategory('');

    if (searchTerm.length < 1) {
      fetchRecommendations();
    }
  };

  const handleBlur = () => {
    setSearchFocused(false);
  };

  const showFilterDivFunction = () => {

    setShowFilters(!showFilters);
    
  }

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    if (window.innerWidth > 850) {
      setShowFilters(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 850) {
      setShowFilters(true);
    }
  }, [screenWidth]); 


  useEffect(() => {

    console.log('Fetching items by category:', selectedCategory);

    const fetchItemsByCategory = async () => {
      
      if (selectedCategory) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customer/items-by-category?category=${selectedCategory}`);
          console.log('Categories data is', response.data);
          // setOnLoadRecommendations(response.data); // Always update items, even if empty
          setItems(response.data)
        } catch (error) {
          console.log("Error fetching items by category", error);
          // setOnLoadRecommendations([]); // Reset items in case of error
          setItems([])
        }
      } else {
        setItems([]); // Clear items if no category is selected
      }
    };
  
    fetchItemsByCategory();

  }, [selectedCategory]);


  useEffect(() => {
    if (searchTerm.length < 1) {
      fetchRecommendations();
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   const width = window.innerWidth;
  //   const mediaQuery = width <= 750;
  //   if (mediaQuery && showFilters === false) {
  //     filterRef.current.style.display = "none";
  //   } else {
  //     filterRef.current.style.display = "block";
  //   }
  // }, [showFilters, window.innerWidth]) // This effect Hide filter div

  const handleAddToCart = (itemName, itemPrice, itemDescription, itemImage, quantity, itemId) => {
    const cartItem = {
      name: itemName,
      price: itemPrice,
      description: itemDescription,
      image: itemImage,
      quantity: quantity,
      itemId: itemId
    };
  console.log("cart itme is", cartItem)
    // Get the existing cart from local storage
    const cart = localStorage.getItem('cart');
    const cartArray = cart ? JSON.parse(cart) : [];
  
    // Check if item already in cart

    const itemFound = cartArray.filter((itemInCart) => itemInCart.itemId === itemId);

    if (itemFound.length === 0) {
      // Add the new item to the cart
      cartArray.push(cartItem);
      // Store the updated cart in local storage
      localStorage.setItem('cart', JSON.stringify(cartArray));
  
    } else {

    }
    
   
   // setShowMessage(true);
   // setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
  };


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <HeaderComponent className="header" toggleMenu={toggleMenu}/>
      
      {showMenu && <SlideMenuComponent showMenu={showMenu} toggleMenu={toggleMenu} />}

      <div className="grid-body">
        
        <div className="show-filters" onClick={showFilterDivFunction}>
          <p><FiCode className="icon"/>{showFilters ? 'Hide Filters' : 'Show Filters'}</p>
        </div>

        <div className="filter-container" ref={filterRef} style={{ display: showFilters ? 'block' : 'none' }}>
          <div className="filter-group">
            <p>Sort</p>
            <hr />
            <input
              type="text"
              placeholder="Search product"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="filter-group">
            <p>Price</p>
            <hr />
            <div className="price-input-container">
              <input 
                type="number" 
                placeholder="N 1,000" 
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)} 
              />
              <span>to</span>
              <input 
                type="number" 
                placeholder="N 7,000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)} 
              />
            </div>
            <button className="apply-button" onClick={handlePriceRangeChange}>Apply</button>
          </div>
          <div className="filter-group">
            <p>Categories</p>
            <hr />
            <ul>
              <li>
                <input
                  type="checkbox"
                  checked={selectedCategory.includes("Cloth")}
                  onChange={() => handleCategoryChange("Cloth")}
                  disabled={searchFocused}
                />
                Cloth
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedCategory.includes("Electronics")}
                  onChange={() => handleCategoryChange("Electronics")}
                  disabled={searchFocused}
                />
                Electronics
              </li>
              {/* Add more categories here */}
            </ul>
          </div>
        </div>
  
        <div className="items-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <img src={item.imageUrl} alt={item.name} 
                onClick={() => navigate("/view-item-page", { 
                  state: { itemName: item.name, 
                           itemPrice: item.price, 
                           itemImage: item.imageUrl,
                           itemDescription: item.description,
                           itemId: item._id } 
                  })}/>
              <h4 className="hover-item-instruction">View item</h4>
              <div className="item-card-flex">
                <div>
                  <p>Price</p>
                  <p>₦{item.price}</p>
                </div>
                <div>
                  <button onClick={() => handleAddToCart(
                    item.name, 
                    item.price, 
                    item.imageUrl, 
                    item.description, 
                    1,
                    item._id)}>
                    <i className="fa fa-shopping-cart" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
  
};

export default ShopPage;
