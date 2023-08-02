import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, getUserProfile } from '../../../_actions/user_action';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import "./LoginPage.css"

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

    //if (!passwordPattern.test(Password)) {
      //alert('비밀번호는 숫자와 영문을 혼합하여 8자 이상 입력해주세요.');
      //return;
    //}

    const dataToSubmit = {
      email: Email,
      userPw: Password
    };
    
    dispatch(loginUser(dataToSubmit))
      .then(() => {
        // 로그인 성공 시 프로필 정보 가져오기
        const { email } = dataToSubmit;
        dispatch(getUserProfile(email));
      });
  };






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
