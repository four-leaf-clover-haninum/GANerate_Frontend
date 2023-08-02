import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import "./RegisterPage.css"
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { sendEmailVerification } from '../../../_actions/user_action';
import { FaUserCircle } from 'react-icons/fa';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false); //인증발송 코드 수정했음 
  const [VerificationCode, setVerificationCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);

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

  //
  const onEmailVerificationHandler = () => {
    if (!Email) {
      alert('이메일을 먼저 입력해주세요.'); // 이메일을 먼저 입력하지 않은 경우 알림창 띄우기
      return;
    }

    dispatch(sendEmailVerification(Email))
      .then(() => {
        alert('이메일 인증이 전송되었습니다. 이메일을 확인하세요.');
        setIsEmailVerified(true); // 이메일 인증 완료 상태를 true로 설정
        setIsCodeVerified(false); // 인증번호 확인 상태를 초기화

        // Save isEmailVerified to Local Storage
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

  //
  

  const onVerificationCodeHandler = (event) => {
    setVerificationCode(event.currentTarget.value);
  };


  const onVerificationCheckHandler = () => {
    dispatch(sendEmailVerification(Email, VerificationCode))
      .then((response) => {
        if (response.success) {
          setIsCodeVerified(true); // 인증번호 확인 완료 상태를 true로 설정
          alert('인증번호 확인이 완료되었습니다.');

          // 회원가입 요청
          let body = {
            email: Email,
            userPw: '', // 비밀번호 필드는 빈 값으로 요청
            name: '', // 이름 필드는 빈 값으로 요청
            PhoneNumber: '', // 전화번호 필드는 빈 값으로 요청
            emailAuth: VerificationCode, // 인증번호를 사용하여 요청
          };

          dispatch(registerUser(body))
            .then(() => {
              alert('가입이 정상적으로 완료되었습니다');
              props.history.push('/v1/users/sign-in');
            })
            .catch((error) => {
              if (error.response) {
                alert(error.response.data.message);
              } else {
                alert('서버 오류가 발생했습니다.');
              }
            });
        } else {
          setIsCodeVerified(false); // 인증번호 확인 실패 상태를 false로 설정
          alert('유효하지 않은 인증번호입니다.');
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert('서버 오류가 발생했습니다.');
      });
  };

    
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    // 제약 조건 검사
    if (!Email || !Name || !Password || !PhoneNumber) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(Email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (!isEmailVerified) {
      alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }
  
    if (!isCodeVerified) {
      alert('인증번호 확인을 먼저 완료해주세요.');
      return;
    }

  
    // 인증 이메일 발송 요청
    try {
      await dispatch(sendEmailVerification(Email));
      // 인증 이메일 발송이 성공적으로 완료되었을 때 회원가입 요청 수행
      let body = {
        email: Email,
        userPw: Password,
        name: Name,
        PhoneNumber: PhoneNumber,
        emailAuth: VerificationCode
      };
  
      try {
        await dispatch(registerUser(body));
        alert("가입이 정상적으로 완료되었습니다");
        props.history.push("/v1/users/sign-in");
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert('서버 오류가 발생했습니다.');
        }
      }
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

          {isEmailVerified && !isCodeVerified && (
            <div>
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />
              <button className="button12" type="button" onClick={onEmailVerificationHandler}>
              인증번호 발송
              </button>
            </div>
          )}

          {/* 이메일 인증이 완료되지 않은 경우에만 인증번호 입력과 확인 버튼을 표시 */}
          {isEmailVerified && !isCodeVerified && (
            <div>
              <label>인증번호</label>
              <input type="number" value={VerificationCode} onChange={onVerificationCodeHandler} />
              <button className="button12" type="button" onClick={onVerificationCheckHandler}>
                인증번호 확인
              </button>
            </div>
          )}

              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHandler} />

              <label>Phone Number</label>
              <input type="tel" value={PhoneNumber} onChange={onPhoneNumberHandler} />

              <br />
              <button type="submit">회원가입</button>
            </form>
          </div>
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

export default RegisterPage;
