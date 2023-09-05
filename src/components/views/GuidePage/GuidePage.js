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

  <br/>

  

  <div className="landing-content">
 <Typography.Title level={2}>GAN:ERATE</Typography.Title>
 <Typography.Paragraph>
 웹 기반 이미지 데이터 유통 플랫폼
 </Typography.Paragraph>




 

 {/* 예시 설명 */}
 <div className="guide-box" style={{ fontSize: '18px', lineHeight: '1.8' }}>

   본 플랫폼은 GAN 알고리즘을 활용하여 입력이미지 데이터와 유사한 이미지 데이터를 다량으로 제공하는 웹 기반 데이터 유통 플랫폼입니다. <br/>
   GAN:ERATE를 통해 회원분께서 보유한 이미지를 기반으로 유사한 이미지 데이터 생성 및 거래가 가능합니다. 

 </div>
 </div>


 <br/>
 <br/>
 {/* 이용안내 콘텐츠 */}
 <div className="landing-content">
 <Typography.Title level={2}>플랫폼 이용 안내</Typography.Title>
 <Typography.Paragraph>
   플랫폼의 활용 방법을 알고싶다면, 플랫폼을 사용하기 전에 아래 내용을 확인하세요.
 </Typography.Paragraph>

 {/* 예시 설명 */}
 <div className="guide-box">
   <Typography.Title level={3}>회원 가입</Typography.Title>
   <Typography.Paragraph>
     먼저, 회원 가입을 해야합니다. 회원 가입을 완료하면 플랫폼의 다양한 기능을 이용할 수 있습니다.
   </Typography.Paragraph>
 </div>

 <div className="guide-box">
   <Typography.Title level={3}>데이터 생성</Typography.Title>
   <Typography.Paragraph>
     데이터 생성 페이지에서 원하는 데이터를 생성하세요. 다양한 데이터 생성 옵션을 사용할 수 있습니다.
   </Typography.Paragraph>
 </div>

 <div className="guide-box">
   <Typography.Title level={3}>데이터 마켓</Typography.Title>
   <Typography.Paragraph>
     데이터 마켓에서 다른 사용자가 생성한 데이터를 구매하거나 판매하세요. 다양한 데이터 상품을 확인할 수 있습니다.
   </Typography.Paragraph>
 </div>

 {/* 추가 요소 */}
 <Button type="primary" size="large" style={{ marginTop: '20px' }}>더 알아보기</Button>
</div>
</div>
</div>
);
}


export default LandingPage