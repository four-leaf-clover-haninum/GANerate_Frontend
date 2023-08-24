import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // react-redux에서 필요한 부분만 import
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Input, Button } from 'antd';
import './PaymentPage.css';
import styled from "styled-components";
import { getProductDetail, dataProductId, verifyPayment } from '../../../_actions/user_action'


function PaymentPage(props) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({}); // Initialize data with an empty object
  const productId = "data-product-id"; // Replace with actual ID from props or route params


  useEffect(() => {
    if (!loaded && !window.IMP) {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
      script.async = true;
      script.onload = () => {
        const IMP = window.IMP;
        if (IMP) {
          // Initialize IMP only once
          if (!IMP.isInitialized()) {
            //IMP.init("imp31818680"); // Replace with your actual seller code
          }
          setLoaded(true);
        }
      };
      document.body.appendChild(script);
    } else if (loaded && window.IMP) {
      dispatch(getProductDetail(productId))
        .then(response => {
          if (response.payload) {
            console.log("Received data:", response.payload);
            setData(response.payload);
          }
        })
        .catch(error => {
          console.error('Failed to fetch product data.', error);
        });
    }
  }, [dispatch, productId, loaded]);
  

  //상품 가져오는 코드
  useEffect(() => {
    dispatch(getProductDetail(productId))
      .then(response => {
        if (response.payload) {
          setData(response.payload);
        }
      });
  }, [dispatch, productId]);






const requestPay = () => {
  if (!data) return;  // 상품 데이터가 없는 경우 리턴

  const timestamp = Date.now();
  const milliseconds = timestamp % 1000; // Extract milliseconds part
  const uniqueId = `order_${timestamp}_${milliseconds}`; // Combine timestamp and milliseconds
  
  const IMP = window.IMP;
  IMP.init("imp31818680")

    IMP.request_pay(
      {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: uniqueId, // Use the uniqueId here
      name: data.title,  // 상품 이름
      amount: data.price,  // 상품 가격

      buyer_email: null,
      buyer_name: null,
      buyer_tel: null,
      buyer_addr: null,
      buyer_postcode: null
    }, response => {if (response.success) {
      console.log('결제 성공', response);

      // 결제 검증 및 처리
      verifyAndProcessPayment(response);
    } else {
      console.error('결제 실패', response);
    }
  })}


    const verifyAndProcessPayment = (response) => {
      const paymentData = {
        amount: response.paid_amount,
        imp_uid: response.imp_uid,
        merchant_uid: response.merchant_uid,
        dataProductId: 1 // Modify this as needed
      };
  
      dispatch(verifyPayment(paymentData))
        .then(response => {
          if (response.payload) {
            console.log('결제 검증 및 처리 성공', response.payload);
            // 성공적으로 검증 및 처리된 경우의 로직 추가
          }
        })
        .catch(error => {
          console.error('결제 검증 및 처리 실패', error);
          // 검증 및 처리 실패시의 로직 추가
        });
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
              <div className="total-price">
              <h3 style={{ marginRight: 500 }}>구매 상품 이름</h3>
                <div className="price-box">
                <div className="Pname" style={{ fontWeight: 'bold', color: '#931C3E', fontSize: '25px' }}>
  {data && data.title ? data.title : "제목 정보 없음"} {/* 상품 제목 */}
</div>

                </div>
                </div>





                <div style={{ marginBottom: '70px' }}>
                </div>
                <div className="product-info">
                <h3 style={{ marginRight: 500 }}>구매 상품 정보</h3>
                <div className="product-box">

                <Table class="custom-table">
  <tbody>
    <TableRow>
      <td class="inline-row">
        <h5 class="inline-header">등록일자</h5>
        <div className="data-text">
          {data && data.createdAt ? `${data.createdAt}` : "createdAt 정보 없음"}
        </div>
      </td>
    </TableRow>
  </tbody>
</Table>

<Table class="custom-table">
  <tbody>
    <TableRow>
      <td class="inline-row">
      <h5 class="inline-header">카테고리</h5>
        <div className="data-text">
          {data && data.categoryNames ? `${data.categoryNames}` : "categoryNames 정보 없음"}
        </div>
      </td>
    </TableRow>
  </tbody>
</Table>

<Table class="custom-table">
  <tbody>
    <TableRow>
      <td class="inline-row">
      <h5 class="inline-header">이미지 수</h5>
        <div className="data-text">
          {data && data.dataSize ? `${data.dataSize}` : "dataSize 정보 없음"}
        </div>
      </td>
    </TableRow>
  </tbody>
</Table>


<Table class="custom-table">
  <tbody>
    <TableRow>
      <td class="inline-row">
      <h5 class="inline-header">구매 수량</h5>
        <div className="data-text">
          {data && data.buyCnt ? `${data.buyCnt}` : "buyCn 정보 없음"}
        </div>
      </td>
    </TableRow>
  </tbody>
</Table>

<Table class="custom-table">
  <tbody>
    <TableRow>
      <td class="inline-row">
        <h5 class="inline-header">zip 파일 크기(GB)</h5>
        <div className="data-text" style={{ marginLeft: '0px' }}>
          {data && data.zipfileSize ? `${data.zipfileSize}` : "zipfileSize 정보 없음"}
        </div>
      </td>
    </TableRow>
  </tbody>
</Table>


              
                 </div>
                </div>



                <div style={{ marginBottom: '70px' }}>
              </div>
              <div className="total-price">
              <h3 style={{ marginRight: 500 }}>총 결제 금액</h3>
                <div className="price-box">
                <div className="Pprice" style={{ fontWeight: 'bold', color: '#931C3E', fontSize: '25px' }}>
                {data && data.price ? `${data.price}원`: "price 정보 없음"} {/* 상품 제목 */}
              </div>
                </div>
                </div>

                <div style={{ marginBottom: '80px' }}>
              </div>
              <div className="payment-button">
                <button className="payment-btn" onClick={requestPay}>결제하기</button>
                </div>

                <br/>
    <br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }

export default PaymentPage;


const Table = styled.table`
width: 100%;
border-collapse: collapse;
`;

const TableRow = styled.tr`
border-bottom: 1px solid #ccc;
`;