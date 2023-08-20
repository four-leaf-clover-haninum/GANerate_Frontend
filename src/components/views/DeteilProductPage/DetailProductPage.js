import { Typography, Button, Form, Input,Checkbox } from 'antd';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import Axios from 'axios';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import './DetailProductPage.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProductDetail } from '../../../_actions/user_action'
import '../../axiosConfig'



function DetailProductPage(props) {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const dataProductId = "data-product-id";  // Replace with actual ID from props or route params
    
    useEffect(() => {
        dispatch(getProductDetail(dataProductId))
            .then(response => {
                if (response.payload) {
                    setData(response.payload);
                }
            });
    }, [dispatch, dataProductId]);  // Added dependencies to the dependency array

    if (!data) {
        return <div>Loading...</div>;  // Loading state
    }



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
      </React.Fragment>


      
      
     <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div className="info-container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1> 상품 상세 조회</h1>
              <p>GAN:ERATE</p>
          </div>
      </div>
  </div> 



  <Container margin="0 auto">
        <Contents>
          <CardRight>

          <br/>
            <CircleImage>
            
            {/* <img src={data.imageUrl[0]} alt="이미지" /> */}
            </CircleImage>

          </CardRight>
          <CardLeft>
            <BrandNameArea>
              <div className="Btn">
              </div>
            </BrandNameArea>

            <ProductName>
            <br/>
            <div className="Pname">{data.title}</div>
            </ProductName>

            <priceLine>
            <br/>
            <div className="Pprice" style={{ textAlign: 'right', fontSize: '30px' }}>
                    {data.price}원</div>
            </priceLine>


            <DetailLine>
            <p>{data.description}</p>
            </DetailLine>

          </CardLeft>
        </Contents>
    </Container>


    <Container2>
    <Table>
    <tbody>
    {data.categoryNames.map((item, index) => (
        <TableRow key={index}>
            <TableHeader>Category</TableHeader>
            <TableData>{item}</TableData> {/* Use data.categoryNames here */}
        </TableRow>
        ))}
      </tbody>
    </Table>
  </Container2>


    <br/>


    <div className="payment-button">
    <a href="/v1/orders/{data-product-id}" className="payment-btn">유료 결제 후 다운로드 받기</a>
  </div>
  

    <br/>
    <br/>
    <br/>
    <br/>


        </div>
        </div>    

    )}


    
    const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableHeader = styled.th`
  padding: 10px;
  font-weight: bold;
  text-align: left;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
`;

const data = [
  { label: '등록일자', value: '{value}' },
  { label: '카테고리', value: '{value}' },
  { label: '태그', value: '{value}' },
  { label: '총 이미지 수', value: '{value}' },
  { label: '용량', value: '{value}' },
  { label: '저작권 라이선스', value: '{value}' },
];

    const Container = styled.div`
  width: 1000px; 
  height: 400px;
  padding: 1rem 1rem;
  margin: 5% auto;
  text-align: center;
  background: #f5f5f5; /* Light gray background */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow */
  color: #333333;
  border: 2px solid rgba(200, 200, 200, 0.5);
  border-radius: 10px; /* Rounded corners */
`;

const Container2 = styled.div`
  width: 1000px;
  height: 350px; /* Taller height */
  padding: 2rem;
  margin: 5% auto;
  text-align: center;
  background: #f5f5f5; /* Light gray background */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow */
  color: #333333;
  border: 2px solid rgba(200, 200, 200, 0.5);
  border-radius: 10px; /* Rounded corners */
`;

    
    const Contents = styled.div`
      display: flex;
      justify-content: center;
      text-align: center;
    `;
    
    const CardRight = styled.div`
      width: 23rem;
    `;
    
    const CircleImage = styled.div`
      display: inline-flex;
      justify-content: space-between;
      flex-direction: column;
      border-radius: 70%;
      overflow: hidden;
      width: 20rem;
      height: 20rem;
      box-shadow: 0 0 10px #0000001a;
      img {
        max-width: 100%;
        margin: auto;
        object-fit: contain;
      }
    `;
    
    const CardLeft = styled.div`
      width: 25rem;
      margin-left: 3rem;
    `;
    
    const ProductName = styled.div`
      display: flex;
      justify-content: flex-start;
      align-items: left;
      padding: 1rem 0rem;
      border-bottom: 1px solid #9a9292;
      margin-bottom: 0.6rem;
    
      .Pname {
        font-size: 2rem;
        font-weight: bold;
        margin-right: 0.5rem;
      }
    `;
    
    const BrandNameArea = styled.div`
      display: flex;
      justify-content: flex-start;
    `;
   
    
    const DetailLine = styled.div`
      color: #5a5656;
      font-size: 1rem;
      padding: 0.5rem 0;
      margin: 1rem 0.5rem;
      display: flex;
      justify-content: flex-start;
      p {
        display: flex;
        text-align: start;
      }
    `;
    
  
export default DetailProductPage
