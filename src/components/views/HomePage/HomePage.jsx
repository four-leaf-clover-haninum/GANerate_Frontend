import React from 'react';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import { FaUserCircle } from 'react-icons/fa';
import appleBackground from './apple.png';


function HomePage() {
  return (
    <div className="HomePage d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <React.Fragment>
          {/* 네비 바 */}
          <CustomNavbar bg="light" variant="light" className="static-top" style={{ padding: '10px 20px', height: '80px' }}>
            <div className="container">
              <a className="navbar-brand" href="/MyPage" style={{ fontWeight: '900', fontSize: '35px', color: '#BB2649' }}>
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

        {/* 플랫폼 설명 */}
      
        <header className="py-5 bg-image-full" style={{ backgroundImage: "url('https://source.unsplash.com/wfh8dDlNFOk/1600x900')" }}>
          <div className="text-center my-1">
            <h1 className="text-white fs-0 fw-bolder" style={{ fontSize: '50px', marginBottom: '10px' }}>
              Unlock Infinite Possibilities with GAN:ERATE
            </h1>
            <h2 className="text-white-50 mb-9" style={{ fontSize: '30px', marginBottom: '60px' }}>
              Your Gateway to Artificial Creativity
            </h2>
            <img
              className="img-fluid rounded-circle mb-15"
              src="https://cdn.pixabay.com/photo/2016/10/25/17/58/apple-1769553_1280.jpg"
              alt="..."
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                boxShadow: '0 0 100px rgba(0, 0, 0, 0.99)',
                marginBottom: '40px',
              }}
            />
            <p className="text-white fs-0" style={{ fontSize: '20px', color: '#FECCBE' }}>
              AI 기반 데이터 증강 기능을 구현하여 고객이 필요한 이미지 데이터를 대량으로 제공해드립니다.
            </p>
          </div>
        </header>
  
          {/* 플랫폼 소개 영역 */}
          <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="features-icons-item mb-5 mb-lg-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="bi bi-aspect-ratio custom-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                  <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z" />
                </svg>
                <h2 className="heading-spacing" style={{ color: '#BB2649' }}>Generate</h2>
                <p className="lead mb-0">선택한 이미지와 유사한 이미지 대량 생성</p>
              </div>
            </div>

           

            <div className="col-lg-4">
              <div className="features-icons-item mb-5 mb-lg-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="bi bi-card-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                  />
                  <path
                    d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
                  />
                </svg>
                <h2 className="heading-spacing" style={{ color: '#BB2649' }}>Gather</h2>
                <p className="lead mb-0">생성된 이미지 zip 파일로 데이터 상품 등록</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="features-icons-item mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="bi bi-cast"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0z"
                  />
                  <path
                    d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086l-1-1z"
                  />
                </svg>
                <h2 className="heading-spacing" style={{ color: '#BB2649' }}>Get</h2>
                <p className="lead mb-0">이용하고자 하는 이미지 파일 다운로드</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
          {/* 플랫폼 이용 안내 */}
          <section className="py-5 bg-image-full" style={{ backgroundImage: `url(${appleBackground})` }}>
  <div className="text-center my-1">
    <h2 className="text-white fs-0 fw-bolder" style={{ fontSize: '50px', marginBottom: '20px' }}>인기데이터 넣을 예정</h2>
    <p className="text-white fs-0" style={{ fontSize: '20px', color: '#FECCBE' }}>
      GAN:ERATE
    </p>
  </div>
</section>
                
                
                
                        {/* 카테고리 설정 */}
      <div class="centered-showcase">
        <section class="showcase">
          <div class="container-fluid p-0">
              <div class="row g-0">
                <div class="col-lg-12 order-lg-0 my-auto showcase-text">
                  <h1>카테고리</h1>
                      <p class="lead mb-5">아래 카테고리를 선택하시면 검색된 데이터들을 주제별로 분류하여 조회하실 수 있습니다.</p>
                    
                                <div class="d-flex justify-content-center mt-4">
                                  <div class="row">
                                  
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          보건/의료
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          동물/식물
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          사람
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          추상
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex justify-content-center mt-4">
                                  <div class="row">
                                   
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          패션
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          건물/랜드마크
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          풍경/배경
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                        경제/비즈니스
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex justify-content-center mt-4">
                                  <div class="row">
                                   
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                        사물/제품
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                        교통/물류
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                        스포츠
                                        </a>
                                      </div>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                      <div class="rounded-box rounded p-3 bg-light">
                                        <a class="btn btn-primary btn-lg btn-block custom-btn-size" href="/">
                                          기타
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
      {/* Add the rest of your code below */}
      
      {/*footer*/}
      <React.Fragment>
  {/* The rest of your JSX code */}
  
  {/*footer*/}
  <footer className="py-3 bg-dark">
    <div className="container px-7 px-lg-100">
      <p className="m-0 text-white footer-center">Copyright &copy; four-leaf-clover-haninum</p>
    </div>
  </footer>
</React.Fragment>
</React.Fragment>

    </div>
    </div>
  );
}

                export default HomePage;