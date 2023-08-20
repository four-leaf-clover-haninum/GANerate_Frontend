import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // react-redux에서 필요한 부분만 import
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Input, Button } from 'antd';
import './PaymentPage.css';

// verifyPayment 액션을 import
import { verifyPayment } from '../../../_actions/user_action';

function PaymentPage(props) {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수를 가져옴

    useEffect(() => {
        if (!loaded) {
            const script = document.createElement('script');
            script.src = 'https://cdn.iamport.kr/v1/iamport.js';
            script.async = true;
            script.onload = () => {
                setLoaded(true); // 스크립트 로드 완료 시 상태 변경
            };
            document.body.appendChild(script);
        }
    }, [loaded]);

    const requestPay = () => {
        if (loaded) {
            if (window.IMP) {
                const IMP = window.IMP;
                IMP.init("imp31818680");
    
                IMP.request_pay(
                    {
                        // ... (기존 request_pay 내용 유지)
                    },
                    function (rsp) {
                        if (rsp.success) {
                            let data = {
                                amount: rsp.paid_amount,
                                imp_uid: rsp.imp_uid,
                                merchant_uid: rsp.merchant_uid,
                                dataProductId: 1
                            };

                            dispatch(verifyPayment(data));
                        } else {
                            alert("결재 실패");
                            alert(rsp.error_msg);
                            console.log(rsp);
                        }
                    }
                );
            } else {
                alert("IMP 라이브러리가 로드되지 않았습니다.");
            }
        } else {
            alert("스크립트 로드 중입니다. 잠시 후 다시 시도해주세요.");
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

            <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
            <div className="info-container">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>구매하기</h1>
                <p>GAN:ERATE</p>



                <div style={{ marginBottom: '70px' }}>
                </div>
                <div className="product-info">
                <h3 style={{ marginRight: 500 }}>구매 상품 정보</h3>
                <div className="product-box">
                 {/* 구매 상품 통신을 통해 가져온 데이터를 출력 */}
                 </div>
                </div>



                <div style={{ marginBottom: '70px' }}>
              </div>
              <div className="total-price">
              <h3 style={{ marginRight: 500 }}>총 결제 금액</h3>
                <div className="price-box">
                  {/* 결제 금액 통신을 통해 가져온 데이터를 출력 */}
                </div>
                </div>

                <div style={{ marginBottom: '140px' }}>
              </div>
              <div className="payment-button">
                <button className="payment-btn" onClick={requestPay}>결제하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }

export default PaymentPage;
