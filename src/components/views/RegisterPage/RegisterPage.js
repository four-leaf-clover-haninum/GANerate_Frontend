import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, sendEmailVerification, verifyEmailVerification } from '../../../_actions/user_action';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Input, Button } from 'antd';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const mailnumber = useSelector((state) => state.user.mailnumber);
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [VerificationCode, setVerificationCode] = useState('');
  const [authDone, setAuthDone] = useState(false);
  const [authError, setAuthError] = useState(false);
  const marginTop = { marginTop: '10px' };

  useEffect(() => {
    const storedIsEmailVerified = JSON.parse(localStorage.getItem('isEmailVerified'));
    if (storedIsEmailVerified) {
      setIsEmailVerified(true);
    }
  }, []);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const onEmailVerificationHandler = () => {
    if (!Email) {
      alert('이메일을 먼저 입력해주세요.');
      return;
    }

    dispatch(sendEmailVerification(Email))
      .then(() => {
        alert('인증코드가 발송되었습니다. 이메일을 확인하세요.');
        setIsEmailVerified(true);
        setVerificationCode(''); // Reset verification code input field
        localStorage.setItem('isEmailVerified', JSON.stringify(true));
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert('서버 오류가 발생했습니다.');
        }
      });
  };

  const onCheckNumber = useCallback(() => {
    if (!VerificationCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    if (VerificationCode === mailnumber) {
      setAuthDone(true);
      setAuthError(false);
      alert('인증이 완료되었습니다.');
    } else {
      setAuthDone(false);
      setAuthError(true);
      alert('인증번호가 일치하지 않습니다.');
    }
  }, [VerificationCode, mailnumber]);
  
  const onVerificationCodeHandler = (event) => {
    setVerificationCode(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!Email || !Name || !Password || !PhoneNumber) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(Email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (!isEmailVerified || !authDone) {
      alert('이메일 인증 및 인증번호 확인을 먼저 완료해주세요.');
      return;
    }

    // 이메일 인증 수행
    try {
      await dispatch(verifyEmailVerification(Email, VerificationCode));
      alert('이메일 인증이 완료되었습니다.');
      setAuthDone(true); // 인증 상태를 true로 설정
      setAuthError(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('서버 오류가 발생했습니다.');
      }
      return; // 인증 실패 시 회원가입 요청을 중지하고 함수 종료
    }

    // 회원가입 요청
    let body = {
      email: Email,
      userPw: Password,
      name: Name,
      PhoneNumber: PhoneNumber,
      emailAuth: VerificationCode,
    };

    try {
      await dispatch(registerUser(body));
      alert('가입이 정상적으로 완료되었습니다.');
      props.history.push('/v1/users/sign-in');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('서버 오류가 발생했습니다.');
      }
    }
  };
  
  
    return (
        <div className="HomePage d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    
        <CustomNavbar bg="light" variant="light" className="static-top" style={{ padding: '20px' }}>
          <div className="container">
            <a className="navbar-brand" href="/MyPage" style={{ fontWeight: '900', fontSize: '35px', color: '#BB2649' }}>
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
        <Nav.Link href="/auth/signup" className="btn btn-2 ml-2" style={{ fontSize: '20px', color: 'white', marginLeft: '20px' }}>
          <FaUserCircle style={{ fontSize: '24px', marginRight: '10px' }} />
          My Page
        </Nav.Link>
        </Nav>
    
          </div>
        </CustomNavbar>

        <div className="container mt-5">
          <h1 className="text-center mb-3">회원가입</h1>
          <div className="RegisterPage">
            <form className="form" onSubmit={onSubmitHandler}>
              <label>Name</label>
              <input type="text" value={Name} onChange={onNameHandler} />


            <div>
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />
              <button className="button12" type="button" onClick={onEmailVerificationHandler}>
              인증번호 발송
              </button>
            </div>
          

            
<div style={{ marginTop: 10, width: 200 }}>
<Input
  placeholder="번호입력"
  name="user-emailcheck"
  type="text"
  value={VerificationCode}
  required
  onChange={onVerificationCodeHandler}
/>
<br />
<Button type="primary" onClick={onCheckNumber} disabled={authDone} style={marginTop}>
  확인
</Button>

{authDone && <div style={{ color: 'blue' }}>인증 완료되었습니다.</div>}
{authError && <div style={{ color: 'red' }}>인증번호가 일치하지 않습니다.</div>}
</div>
  
          
    
              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHandler} />

              <label>Phone Number</label>
              <input type="tel" value={PhoneNumber} onChange={onPhoneNumberHandler} />

              <br />
              <button type="submit">회원가입</button>

            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default RegisterPage;