import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, getUserProfile } from '../../../_actions/user_action';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import "./LoginPage.css"
import { FaUserCircle } from 'react-icons/fa';

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //버튼만 누르면 리로드 되는 것을 막고
    // 이메일 형식과 비밀번호 형식을 체크하는 정규식 패턴
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // 이메일 형식과 비밀번호 형식을 체크
    if (!emailPattern.test(Email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    const dataToSubmit = {
      email: Email,
      userPw: Password
    };
    
    dispatch(loginUser(dataToSubmit))
      .then((response) => {
        // 로그인 성공 시 인증 토큰을 로컬 스토리지에 저장
        localStorage.setItem('authToken', response.payload.token);
        const { email } = dataToSubmit;
        dispatch(getUserProfile(email));
      });
  };





  return (
    <div className="HomePage d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    
        {/* 네비 바 */}
        <React.Fragment>
        <CustomNavbar bg="light" variant="light" className="static-top" style={{ padding: '20px' }}>
        <div className="container">
          <a className="navbar-brand" href="/MyPage" style={{ fontWeight: '900', fontSize: '35px', color: '#BB2649' }}>
            <strong>GAN:ERATE</strong>
          </a>
  
          {/* 링크 추가 및 라우팅 설정 */}
          <Nav className="me-auto">
          <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>이용 안내</Nav.Link>
          <Nav.Link href="/v1/data-products/sale/zip" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 생성</Nav.Link>
          <Nav.Link href="/" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 마켓</Nav.Link>
          <Nav.Link href="/v1/data-products" style={{ fontSize: '22px', padding: '0 60px' }}>데이터 검색</Nav.Link>
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

        <div className="loginPage">
          {/* Add the large centered login text */}
          <h1 style={{ textAlign: 'center', fontSize: '40px'}}>로그인</h1>
          
          <form className="form" onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <br />
            <button type="submit">로그인</button>
            <p className="message">Not registered? <a href="/v1/users/sign-up">Create an account</a></p>
          </form>
        </div>

       

      <footer className="py-3 bg-dark fixed-bottom">
    <div className="container px-7 px-lg-100">
      <p className="m-0 text-white footer-center">Copyright &copy; four-leaf-clover-haninum</p>
    </div>
  </footer>
 


  </div>
  </div>
  
   
    
  );
}

export default LoginPage;
