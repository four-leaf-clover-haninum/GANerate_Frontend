import React, { useState } from 'react'
import { Typography, Button, Form, Input,Checkbox } from 'antd';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import Axios from 'axios';
import { FaDatabase, FaShoppingCart, FaUpload, FaUserCircle, FaDownload } from 'react-icons/fa';
import './GuidePage.css'
import 'font-awesome/css/font-awesome.min.css';




function LandingPage(props) {
  const iconSize = '48px'; // 아이콘 크기 설정


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
          <Nav.Link href="/MyPage" className="btn btn-2 ml-2" style={{ fontSize: '20px', color: 'white', marginLeft: '20px' }}>
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



 {/* 

  <div className="landing-content">
  <Typography.Title level={2}>GAN:ERATE</Typography.Title>
  <Typography.Paragraph>
    웹 기반 이미지 데이터 유통 플랫폼
  </Typography.Paragraph>

  <div className="guide-box" style={{ fontSize: '15px',  color: '#9a1548', lineHeight: '1.8' }}>
    본 플랫폼은 GAN 알고리즘을 활용하여 입력이미지 데이터와 유사한 이미지 데이터를 다량으로 제공하는 웹 기반 데이터 유통 플랫폼입니다. <br/>
    GAN:ERATE를 통해 회원분께서 보유한 이미지를 기반으로 유사한 이미지 데이터 생성 및 거래가 가능합니다. 
  </div>
</div>

 */}


 <br/>
 {/* 이용안내 콘텐츠 */}
 
 
 <div className="landing-content">
      <Typography.Title level={2} style={{ fontSize: '30px',  color: '#9a1548' }}>GAN:ERATE</Typography.Title>
      <Typography.Paragraph>
        플랫폼의 활용 방법을 알고싶다면, 플랫폼을 사용하기 전에 아래 내용을 확인하세요.
      </Typography.Paragraph>

      {/* 데이터 생성 */}
      <div className="guide-box">
        <Typography.Title level={3}>
          <FaDatabase style={{ fontSize: iconSize, verticalAlign: 'middle' }} />{' '}<br/><br/>데이터 생성
        </Typography.Title>
        <div style={{ fontSize: '15px', color: '#333', lineHeight: '1.8' }}>
          AI 기반, gan 알고리즘을 통해 본인이 원하는 이미지 데이터를 대량으로 생성할 수 있어요.
          <br/>
          획득하고자 하는 이미지를 INPUT 데이터에 업로드한 후 몇 분만 기다리시면 유사 이미지가 다량 제공됩니다.
        </div>
      </div>

      {/* 데이터 마켓 */}
      <div className="guide-box">
        <Typography.Title level={3}>
          <FaShoppingCart style={{ fontSize: iconSize, verticalAlign: 'middle' }} />{' '}<br/><br/>데이터 마켓
        </Typography.Title>
        <Typography.Paragraph>
          구매하고자 하는 상품을 카테고리별로 상세 조회하여 확인할 수 있어요.
        </Typography.Paragraph>
      </div>

      {/* 데이터 판매 */}
      <div className="guide-box">
        <Typography.Title level={3}>
          <FaUpload style={{ fontSize: iconSize, verticalAlign: 'middle' }} />{' '}<br/> <br/>데이터 판매
        </Typography.Title>
        <Typography.Paragraph>
          본인이 이미지 파일을 zip 형태로 업로드하여, 이미지 데이터를 직접 판매할 수 있어요.
        </Typography.Paragraph>
      </div>

      {/* 데이터 다운로드 */}
      <div className="guide-box">
        <Typography.Title level={3}>
        <FaDownload style={{ fontSize: iconSize, verticalAlign: 'middle' }} />{' '}<br/><br/>데이터 다운로드
        </Typography.Title>
        <Typography.Paragraph>
          [MYPAGE]의 '구매한 상품 다운로드' 목록에서 구매한 상품을 다운로드 받을 수 있어요.
        </Typography.Paragraph>
      </div>
    </div>


<br/>
<br/>
<br/>
<br/>


</div>



</div>



);
}


export default LandingPage