import React from 'react';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import './MyPage.css';

function MyPage(props) {
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
          <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>이용 안내</Nav.Link>
          <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 생성</Nav.Link>
          <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 마켓</Nav.Link>
          <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 검색</Nav.Link>
        </Nav>

        {/* 로그인 및 마이페이지 링크 추가 및 라우팅 설정 */}
        <Nav className="ml-auto">
    <Nav.Link href="/auth/signin" className="btn btn-1" style={{ fontSize: '20px', color: 'white' }}>Log In</Nav.Link>
    <Nav.Link href="/MyPage" className="btn btn-2 ml-2" style={{ fontSize: '20px', color: 'white', marginLeft: '20px' }}>
      <FaUserCircle style={{ fontSize: '24px', marginRight: '10px' }} />
      My Page
    </Nav.Link>
    </Nav>

      </div>
    </CustomNavbar>
    </React.Fragment>
   

    <div className="container mt-5">
    <h1 className="text-center" style={{ marginBottom: "60px" }}>My Page</h1>

          
          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="user-info-box p-4 rounded bg-light">
              <h3 className="text-center">회원 정보</h3>
                <p>나는 옥지얌</p>
                <p>Email: john@example.com</p>
                <div className="edit-item">
  <a href="/edit-profile" className="btn btn-primary d-flex justify-content-center align-items-center" style={{ height: '100%', width: '100%', textDecoration: 'none', color: 'black' }}>
    회원정보 수정
  </a>
</div>

            </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center"> {/* Center-align the box */}
  <div className="purchase-history-box p-4 rounded bg-light" style={{ width: '300%' }}> {/* Increase the width of the box */}
    <h3 className="text-center">구매한 상품 다운로드</h3> {/* Center-align the heading */}
    <p style={{ marginBottom: '40px', fontSize: '20px' }}>총 n개</p> {/* Replace {n} with the actual number of items */}
    <div className="purchase-item">
      <p style={{ marginBottom: '5px' }}>데이터 1</p>
      <button className="btn btn-success"><FaDownload /> Download</button>
    </div>
    <div className="purchase-item">
      <p style={{ marginBottom: '5px' }}>데이터 2</p>
      <button className="btn btn-success"><FaDownload /> Download</button>
    </div>
    {/* Add more purchase items here */}
  </div>
</div>


  {/* Rest of your JSX code */}
  <footer className="py-3 bg-dark fixed-bottom">
    <div className="container px-7 px-lg-100">
      <p className="m-0 text-white footer-center">Copyright &copy; four-leaf-clover-haninum</p>
    </div>
  </footer>




          </div>
        </div>

      </div>
      </div>


      
  );
}

export default MyPage;
