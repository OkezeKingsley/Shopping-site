// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ShopPage from './pages/ShopPage';
import { useState } from 'react';
import ViewItemPage from './pages/ViewItemPage';
import CartPage from './pages/CartPage';
import BillingPage from './pages/BillingPage';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log("base url", process.env.REACT_APP_BASE_URL)


function App() {


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index="/" element={<ShopPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/view-item-page" element={<ViewItemPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/billing-page" element={<BillingPage />} />
                </Routes>
            </BrowserRouter>
      </div>
      );
}

export default App;

