import React from 'react';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../NavBar/NavBar.css'
import { FaUser, FaUserCircle } from 'react-icons/fa';


function NavBar() {
  return (
    <div className="navbar-container">
      <CustomNavbar bg="custom-pink" expand="lg">
        <CustomNavbar.Brand href="/" className="ganerate-font">GAN:ERATE</CustomNavbar.Brand>
        <CustomNavbar.Toggle aria-controls="basic-navbar-nav" />
        <CustomNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto-navbar-links">
            <Nav.Link href="/guide" className="nav-item-font">이용안내</Nav.Link>
            <Nav.Link href="/data/generate" className="nav-item-font">데이터 생성</Nav.Link>
            <Nav.Link href="/data/market" className="nav-item-font">데이터 마켓</Nav.Link>
            <Nav.Link href="/data/search" className="nav-item-font">데이터 검색</Nav.Link>

            <div className="nav-item-box"> {/* 네모 박스로 묶기 */}
                <Nav.Link href="/auth/signin" className="nav-item-font">
                    <FaUser className="icon" size={30} />
                    로그인
                </Nav.Link>
            </div>

            <div className="nav-item-box">
                <Nav.Link href="/mypage" className="nav-item-font">
                    <FaUserCircle className="icon" size={30} />
                    마이페이지
                </Nav.Link>
            </div>

          </Nav>
        </CustomNavbar.Collapse>
      </CustomNavbar>
    </div>
  );
}

export default NavBar;




