import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 제거
import "../../src/App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import HomePage from './views/HomePage/HomePage';
import MyPage from './views/MyPage/MyPage';
import CartPage from "./views/CartPage/CartPage";
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import PaymentPage from './views/PaymentPage/PaymentPage';
import DetailProductPage from './views/DeteilProductPage/DetailProductPage'
import GuidePage from './views/GuidePage/GuidePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/v1/users/sign-up" element={<RegisterPage />} />
        <Route path="/v1/users/sign-in" element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/v1/data-products" element={<CartPage />} />
          <Route path="/v1/data-products/sale/zip" element={<UploadProductPage />} />
          <Route path="/v1/data-products/1" element={<DetailProductPage />} />
          <Route path="/v1/orders/{data-product-id}" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}


export default App;
