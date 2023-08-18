import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, sendEmailVerification, verifyEmailVerification,emailVerificationSuccess } from '../../../_actions/user_action';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Input, Button } from 'antd';


function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [userPw, setuserPw] = useState('');
  const [phoneNum, setphoneNum] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [certificationNum, setcertificationNum] = useState('');
  const [authDone, setAuthDone] = useState(false);
  const [authError, setAuthError] = useState(false);
  const marginTop = { marginTop: '10px' }; 

  useEffect(() => {
    const storedIsEmailVerified = JSON.parse(localStorage.getItem('isEmailVerified'));
    if (storedIsEmailVerified) {
      setIsEmailVerified(true);
    }
  }, []);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onuserPwHandler = (event) => {
    setuserPw(event.currentTarget.value);
  };

  const onphoneNumHandler = (event) => {
    setphoneNum(event.currentTarget.value);
  };

  const onEmailVerificationHandler = () => {
    const emailPattern = /\S+@\S+\.\S+/;
    if (!Email) {
      alert('이메일을 먼저 입력해주세요.');
      return;
    }
    if (!emailPattern.test(Email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    dispatch(sendEmailVerification(Email))
      .then(() => {
        alert('인증코드가 발송되었습니다. 이메일을 확인하세요.');
        setIsEmailVerified(true);
        setcertificationNum(''); // Reset verification code input field
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


  const handleVerifyEmail = async () => {
    try {
        const response = await dispatch(verifyEmailVerification(Email, certificationNum));
        const responseData = response.data;

        if (responseData.code === 0) {
            setAuthDone(true);  // 인증 성공
            setAuthError(false);
            setIsEmailVerified(true);
            setcertificationNum('');
            localStorage.setItem('isEmailVerified', JSON.stringify(true));
        } else {
            setAuthDone(false);
            setAuthError(true);  // 인증 실패
        }
    } catch (error) {
        console.log(error.response);
        setAuthDone(false);
        setAuthError(true);  // 서버 오류나 통신 오류 등이 발생한 경우 인증 실패로 판단
    }
};

  


  const oncertificationNumHandler = (event) => {
    setcertificationNum(event.target.value);
  };




  // 코드의 나머지 부분은 변경되지 않았으므로 여기서는 수정된 부분만 보여드립니다.
  const onSubmitHandler = async (event) => { // 함수에 async 추가
    event.preventDefault();

    if (!Email || !Name || !userPw || !phoneNum) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(Email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }

    const userData = {
        email: Email,
        name: Name,
        phoneNum: phoneNum,
        userPw: userPw,
        emailAuth: true
    };

    await dispatch(registerUser(userData)); // 통신 처리를 action 내부에서 수행
    props.history.push('/v1/users/sign-in');
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

        <div className="container mt-5">
          <h1 className="text-center mb-3">회원가입</h1>


          <div className="RegisterPage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
  <form className="form" onSubmit={onSubmitHandler}>

            <div style={{ marginTop: 10, width: 400 }}>
              <label>Name</label>
              <input type="text" value={Name} onChange={onNameHandler} />
              </div>


              <div style={{ marginTop: 10, width: 400 }}>
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />
              <button className="button12" type="button" onClick={onEmailVerificationHandler}>
              인증번호 발송
              </button>
            </div>
            
            <div style={{ marginTop: 20, width: 200 }}>
  <Input
    placeholder="번호입력"
    name="user-emailcheck"
    type="text"
    value={certificationNum}
    onChange={oncertificationNumHandler}
  />

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Button onClick={handleVerifyEmail} disabled={authDone}>이메일 인증 확인</Button>
</div>


</div>

    <div style={{ marginTop: 10, width: 400 }}>
              <label>userPw</label>
              <input type="userPw" value={userPw} onChange={onuserPwHandler} />
              </div>

              <div style={{ marginTop: 5, width: 400 }}>
              <label>Phone Number</label>
              <input type="tel" value={phoneNum} onChange={onphoneNumHandler} />
              </div>

              <div style={{ marginTop: 10, width: 400 }}>
              <button type="submit">회원가입</button>
              </div>

            </form>
          </div>
        </div>
    
      </div>
    </div>
  );
    }


export default RegisterPage;