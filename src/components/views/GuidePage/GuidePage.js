import React, { useState } from 'react'
import { Typography, Button, Form, Input,Checkbox } from 'antd';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import Axios from 'axios';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import './GuidePage.css'


function LandingPage(props) {


    return (

        <div className="HomePage d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        
            {/* 네비 바 */}
            <React.Fragment>
            <CustomNavbar bg="light" variant="light" className="static-top" style={{ padding: '10px 20px', height: '80px' }}>
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
      </React.Fragment>


      
      
      <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div className="info-container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1> 이용 안내</h1>
              <p>GAN:ERATE</p>
          </div>
      </div>
  </div>



        </div>
        </div>





    
    )}



export default LandingPage