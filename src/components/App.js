import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // BrowserRouter 제거
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
import VerifyPage from './views/VerifyPage/VerifyPage';
import DownloadPage from './views/MyPage/Sections/DownloadPage'
import EditPage from './views/MyPage/Sections/EditPage'
import HeartPage from './views/MyPage/Sections/HeartPage'
import OrderPage from './views/MyPage/Sections/OrderPage'
import PreparePage from './views/PreparePage/PreparePage'


function PrivateRoute({ element, token }) {
  // 토큰이 있는 경우에만 페이지 접근 허용
  if (token) {
    return element;
  } else {
    alert('회원만 입장 가능한 페이지 입니다.');
    return <Navigate to="/login" />;
  }
}

function App() {

  const token = localStorage.getItem('accessToken');

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/v1/users/sign-up" element={<RegisterPage />} />
        <Route path="/v1/users/sign-in" element={<LoginPage />} />
          
        <Route path="/HomePage" element={<HomePage />} />


          <Route
          path="/MyPage"
          element={
            <PrivateRoute
              element={<MyPage />}
              token={token}
            />}/>

          <Route path="/v1/data-products" element={<CartPage />} />
          <Route path="/v1/data-products/sale/zip" element={<UploadProductPage />} />
          <Route path="/v1/data-products/:productId" element={<DetailProductPage />} />
          <Route path="/v1/orders/:productId" element={<PaymentPage />} />
          <Route path="/v1/verify" element={<VerifyPage />} />
          <Route path="/Download" element={<DownloadPage />} />
          <Route path="/Edit" element={<EditPage />} />
          <Route path="/Heart" element={<HeartPage />} />
          <Route path="/Order" element={<OrderPage />} />
          <Route path="/prepare" element={<PreparePage />} />
      </Routes>
    </div>
  );
}


export default App;
