import React, { useState,  useEffect} from 'react'
import { Typography, Button, Form, Input,Checkbox } from 'antd';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FcNeutralTrading} from 'react-icons/fc';
import { FaUserCircle} from 'react-icons/fa';
import './PreparePage.css'
import {after, verifyPayment1, productbox} from '../../../_actions/user_action'



function PreparePage(props) {

const [isCreatingProduct, setIsCreatingProduct] = useState(false);
const token = localStorage.getItem('accessToken');
const zipFileData = null; // ZIP 파일 데이터를 여기에 설정
const requestBody = productbox(
    data.title,
    Description,
     parseInt(Datasize),
     Category
  );

const handleCreateProductClick = () => {
    setIsCreatingProduct(true);
    after(token, zipFileData, requestBody)
      .then(response => {
        setIsCreatingProduct(false);
        console.log('상품 생성 요청이 완료되었습니다.', response);
      })
      .catch(error => {
        setIsCreatingProduct(false);
        console.error('상품 생성 요청 중 오류 발생:', error);
      });
  };













const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
const [data, setData] = useState(null); // 초기에는 null로 설정

const { TextArea } = Input;

const DataSizeOptions = [
    { key: 1, value: "100장" },
    { key: 2, value: "500장" },
    { key: 3, value: "1000장" },
    { key: 4, value: "직접입력" }
]

const categoryIds = [
    { key: 1, value: "보건/의료" },
    { key: 2, value: "동물/식물" },
    { key: 3, value: "사람" },
    { key: 4, value: "추상" },
    { key: 5, value: "패션" },
    { key: 6, value: "건물/랜드마크" },
    { key: 7, value: "풍경/배경" },
    { key: 8, value: "과학, 항공 및 우주" },
    { key: 9, value: "경제/비즈니스" },
    { key: 10, value: "사물/제품" },
    { key: 11, value: "교통/물류" },
    { key: 12, value: "스포츠" },
    { key: 13, value: "기타" }
];


useEffect(() => {
    const savedData = localStorage.getItem('uploadedData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);


const handlePayment = () => {
    if (!data) return;  // 상품 데이터가 없는 경우 리턴
 
    const timestamp = Date.now();
    const milliseconds = timestamp % 1000; // 밀리초 부분 추출
    const uniqueId = `order_${timestamp}_${milliseconds}`; // 타임스탬프와 밀리초를 결합
  
    const IMP = window.IMP;
    IMP.init("imp31818680");
    IMP.request_pay({
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: uniqueId, // uniqueId를 사용
      name: data.title,  // 상품 이름
      amount: data.price ,  // 상품 가격을 사용
      buyer_email: data.userEmail, // 유저 이메일 정보 사용
      buyer_name: data.userName, // 유저 이름 정보 사용
      buyer_tel: null, // 유저 전화번호 정보 (필요시 추가)
      buyer_addr: null, // 유저 주소 정보 (필요시 추가)
      buyer_postcode: null // 유저 우편번호 정보 (필요시 추가)
    }, response => {
      if (response.success) {
   verifyAndProcessPayment(response, data.dataProductId); // dataProductId 사용
        console.log('결제 성공', response);
      } else {
        console.error('결제 실패', response);
      }
    });
  };

  

// verifyAndProcessPayment 함수 내에서의 수정
// verifyAndProcessPayment function
const verifyAndProcessPayment = (response, productId) => {
    const paymentDataObject = {
      amount: `${response.paid_amount}`,
      dataProductId: `${productId}`,
      imp_uid: `${response.imp_uid}`,
    };
  
    verifyPayment1(paymentDataObject) // Use paymentDataObject directly
      .then(result => {
        if (result.success) {
          console.log('결제 검증 및 처리 성공', result);
          alert('결제 검증 및 처리 성공');
          window.location.href = '/prepare';
        } else {
          console.error('결제 검증 및 처리 실패', result);
          alert('결제 검증 및 처리 실패');
        }
      })
      .catch(error => {
        console.error('결제 검증 및 처리 실패', error);
        alert('결제 검증 및 처리 실패');
      });
  };
  
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Datasize, setDatasize] = useState([]);
    const [Category, setCategory] = useState([]);
    const [SelectedFiles, setSelectedFiles] = useState(null);
    const [CustomCategory, setCustomCategory] = useState("");
    const onFileChange = (event) => { setSelectedFiles(event.target.files); };


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
      };
      
      const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
      };
      
      const DatasizeChangeHandler = (checkedValues) => {setDatasize(checkedValues);};
    const categoryChangeHandler = (checkedValues) => {setCategory(checkedValues);};
      const customCategoryChangeHandler = (event) => { setCustomCategory(event.currentTarget.value); };

      const submitHandler = async (event) => {
        event.preventDefault();
        if (
          !Title ||
          !Description ||
          !Datasize ||
          !Category ||
          !SelectedFiles ||
          SelectedFiles.length === 0
        ) {
          return alert('모든 값을 넣어주셔야 합니다.');
        }
        try {
            const token = localStorage.getItem('accessToken');
            const response = await productbox(token, Title, Description, Datasize, Category);
            if (response.code === 0) {
              console.log('Data created successfully:', response.data);
      
              // 업로드 성공 시 데이터 저장
              localStorage.setItem('uploadedData', JSON.stringify(response.data));
      
              setIsUploadSuccessful(true);
              // 여기에서 원하는 작업을 수행할 수 있습니다.
            } else {
              console.error('Data creation failed:', response.message);
            }
          } catch (error) {
            console.error('API request failed:', error);
          }
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


      
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1> 상품 등록 </h1>
                <br/>
            </div>
            <div className="row mt-4">
      <div className="col-lg-12 offset-lg-0">
        <div className="search-form-box my-custom-box p-4 rounded bg-light">
          <p className="centered-text"><FcNeutralTrading style={{ fontSize: '10rem' }} /><br/> <strong>상품이 생성을 시작하겠습니다.
          <br/> 예상 소요시간은 15-20분 입니다. </strong>  </p>

          <br/> 
          <button
          className="btn btn-primary"
          onClick={handleCreateProductClick}
          disabled={isCreatingProduct}
        >
          {isCreatingProduct ? '상품 생성 중...' : '상품 생성하기'}
        </button>

        </div>
      </div>
    </div>
        



        </div>
        </div>

        </div>
    )
}


export default PreparePage;
