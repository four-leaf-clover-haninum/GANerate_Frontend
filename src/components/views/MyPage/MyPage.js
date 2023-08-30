import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // react-redux에서 필요한 부분만 import
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import { Input, Button } from 'antd';
import './MyPage.css';
import styled from "styled-components";
import { token, getUserPoints, getUserHearts, getUserOrders, downloadOrderFile } from '../../../_actions/user_action'
import { Link, useParams } from 'react-router-dom';



function MyPage(props) {
  const dispatch = useDispatch();
  const [userPoints, setUserPoints] = useState([]);
  const [userHearts, setUserHearts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const token = props.token;

  useEffect(() => {
    dispatch(getUserPoints(token))
      .then(data => {
        setUserPoints(data);
      })
      .catch(error => {
        console.error('Error fetching user points:', error.message);
      });

    dispatch(getUserHearts(token))
      .then(data => {
        setUserHearts(data);
      })
      .catch(error => {
        console.error('Error fetching user hearts:', error.message);
      });

    dispatch(getUserOrders(token))
      .then(data => {
        setUserOrders(data);
      })
      .catch(error => {
        console.error('Error fetching user orders:', error.message);
      });
  }, [dispatch, token]);

  const handleDownloadOrder = (orderId) => {
    dispatch(downloadOrderFile(token, orderId))
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `order-${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Error downloading order file:', error.message);
      });
  };


  return (
    <div className="HomePage">
    <CustomNavbar
    bg="light"
    variant="light"
    className="static-top"
    style={{
      padding: '10px 20px',
      height: '80px',
      zIndex: 1, // zIndex 값을 추가
    position: 'fixed', // 요소를 고정
    top: 0, // 화면 위쪽에 고정
    width: '100%', // 가로로 화면에 꽉 차도록
    }}
  >  
  
  
  <div className="container">
          <a className="navbar-brand" href="/HomePage" style={{ fontWeight: '900', fontSize: '35px', color: '#BB2649' }}>
            <strong>GAN:ERATE</strong>
          </a>
          {/* 링크 추가 및 라우팅 설정 */}
          <Nav className="me-auto">
            <Nav.Link href="/guide" style={{ fontSize: '22px', padding: '0 60px' }}>이용 안내</Nav.Link>
            <Nav.Link href="/v1/data-products/sale/zip" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 생성</Nav.Link>
            <Nav.Link href="/v1/data-products" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 마켓</Nav.Link>
            <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 판매</Nav.Link>
          </Nav>
          {/* 로그인 및 마이페이지 링크 추가 및 라우팅 설정 */}
          <Nav className="ml-auto">
            <Nav.Link href="/v1/users/sign-in" className="btn btn-1" style={{ fontSize: '20px', color: 'white' }}>Log In</Nav.Link>
            <Nav.Link href="/" className="btn btn-2 ml-2" style={{ fontSize: '20px', color: 'white', marginLeft: '20px' }}>
              <FaUserCircle style={{ fontSize: '24px', marginRight: '10px' }} />
              My Page
            </Nav.Link>
          </Nav>
        </div>
      </CustomNavbar>

      <div className="left-sidebar">
      <div className="sidebar-list">
        <ul style={{ paddingTop: '120px', borderTop: '1px solid #333333' }}>
          <h4 className="text-center" style={{ color: '#931C3E', marginBottom: '25px', fontWeight: 'bold' }}>
            나의 활동
          </h4>
          <li><Link to="/">주문내역 조회</Link></li>
          <li><Link to="/">구매 상품 다운로드</Link></li>
          <li><Link to="/">좋아한 상품 목록</Link></li>
          <li><Link to="/edit-profile">회원정보 수정</Link></li>
        </ul>
      </div>
    </div>
    

      <div className="content-container">
        <div className="container mt-5">
          <h1 className="text-center" style={{ marginBottom: "60px" }}>My Page</h1>
          <div className="user-info-box p-4 rounded bg-light">
            <h3 className="text-center">회원 정보</h3>
            <p>한이음 회원님</p>
            <p>Email: john@example.com</p>
            <p>Points: {userPoints.data}</p>
            <p>Hearts: {userHearts.data}</p>
            <p>Orders:</p>
            <ul>
              {/* Orders 목록 */}
            </ul>
            <div className="edit-item">
              <a href="/edit-profile" className="btn btn-primary d-flex justify-content-center align-items-center" style={{ height: '100%', width: '100%', textDecoration: 'none', color: 'black' }}>
                회원정보 수정
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
