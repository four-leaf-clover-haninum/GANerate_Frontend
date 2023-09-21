import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // react-redux에서 필요한 부분만 import
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import { Input, Button } from 'antd';
import './MyPage.css';
import styled from "styled-components";
import { token, getUserPoints, getUserHearts, getUserOrders, downloadOrderFile } from '../../../_actions/user_action'
import { Link, useParams } from 'react-router-dom';
import { IoPersonSharp, IoMailSharp, IoStarOutline } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';



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
    margin: '0 auto',
    borderRadius: '30px',
    marginRight: '10px'
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
          <Nav.Link href="/v1/users/sign-in" className="btn btn-1" style={{ fontSize: '20px', color: 'white' }}>Log Out</Nav.Link>
          <Nav.Link href="/MyPage" className="btn btn-2 ml-2" style={{ fontSize: '20px', color: 'white', marginLeft: '20px' }}>
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
          <li><Link to="/Order">주문내역 조회</Link></li>
          <li><Link to="/Download">구매 상품 다운로드</Link></li>
          <li><Link to="/Heart">좋아한 상품 목록</Link></li>
          <li><Link to="/Edit">회원정보 수정</Link></li>
        </ul>
      </div>
    </div>
    



<div className="box" style = {{marginTop: '120px' ,marginLeft : '170px'}}>
    <div
      style={{
        backgroundColor: '#931C3E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
        borderRadius: '30px',
      }}
    >
      <h3 style={{ color: 'white', marginBottom: '20px' }}>회원 정보</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ color: 'white', flex: 1 }}>
          <p>
            <IoPersonSharp style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            한이음 회원님
          </p>
          <p>
            <IoMailSharp style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Email: john@example.com
          </p>
        </div>
        <div style={{ color: 'white', flex: 1 }}>
        <p>
        <FaDollarSign style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        Points: {userPoints.data}
      </p>
        </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default MyPage;
