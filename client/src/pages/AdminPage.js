import React, { useState } from 'react';
import '../stylingFolder/AdminPage.css';
import axios from 'axios';

function Admin () {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // State for displaying message

  const categories = ['Cloth', 'Car', 'Electronics', 'Furniture', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    console.log('Item Name:', itemName);
    console.log('Description:', description);
    console.log('Image:', image);
    console.log('Price:', price);
    console.log('Category:', category);

    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('category', category);

    setLoading(true);
    
    try {
      const response = await axios.post("/admin/upload-item", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setLoading(false);

      if (response.status === 200) {
        setMessage('Item uploaded successfully');
      }
      
    } catch (error) {
      setLoading(false);

      if (error.response) {
        if (error.response === 400 || error.response === 500) {
          setMessage("Error while uploading item:", error.response.data.error);
          console.log('Error while uploading item', error);
        } else {
          setMessage("Error while uploading item:", error.response.data.error);
          console.log('Error while uploading item', error);
        }
      }
      
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">Add New Item</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          
          <label className="upload-label">
            Upload Image
            <input
              type="file"
              className="file-input"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
          {image && (
            <p className="image-name">
              Selected Image: {image.name}
            </p>
          )}
          <div className="price-category-container">
            <div className="price-input-container">
              <div className="naira-sign">N</div>
              <input
                type="number"
                className="input input-price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="category-select-container">
              <select
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            className="textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
          <button type="submit" className="submit-button">
            {loading ? <div className="spinner"></div> : "Submit"}
          </button>
          {/* Display message if available */}
          {message && (
            <div className="message">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Admin;
