import React, { useState,  useEffect} from 'react'
import { Typography, Button, Form, Input,Checkbox } from 'antd';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle} from 'react-icons/fa';
import './UploadProductPage.css'
import {createDataProduct, productbox, after, verifyPayment1} from '../../../_actions/user_action'
import axios from '../../axiosConfig'


function UploadProductPage(props) {

const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
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
      name:Title,
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

  verifyPayment1(paymentDataObject)
  .then(result => {
    if (result.success) {
      console.log('결제 검증 및 처리 성공', result);
      alert('결제 검증 및 처리 성공');
      setIsPaymentSuccessful(true); // 상태를 true로 변경 -> 버튼떄매 설정한 겨

      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      // 이름, 변수, 파일이름
      let zipFileBlob; // 블록 외부에서 변수를 먼저 선언

if (zipFileData) {
  // zipFileBlob 정의
  zipFileBlob = new Blob([zipFileData], { type: 'application/zip' });
  formData.append('zipFile', zipFileBlob, 'test.zip');
} else {
  console.error('zip 파일이 선택되지 않았습니다.');
  return; // zip 파일이 없으면 중단
}

// 이제 zipFileBlob을 여기서도 사용할 수 있습니다.

      const requestPartData = {
        orderId: result.payload.data.orderId,
        dataProductId: productId,
      };
      const requestPartBlob = new Blob([JSON.stringify(requestPartData)], {
        type: 'application/json'
      });
      formData.append('request', requestPartBlob, 'jsondata');


      console.log(zipFileData);
      console.log(zipFileBlob);
      console.log(requestPartData);
      console.log(requestPartBlob);
      for (let key of formData.keys()) {
        console.log(key);
      }
      for (let value of formData.values()) {
        console.log(value);
      }

      const apiUrl = '/v1/data-products/after';
      const headers = {
        Authorization: `Bearer ${token}`,
  'Content-Type': `multipart/mixed; boundary=6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm`,
      };

      axios.post(apiUrl, formData, {
        headers:headers,
        withCredentials: true
      })

      .then(response1 => {
        const responseData1 = response1.data;
        console.log(responseData1);
        if (responseData1.code === 0) {
          console.log('after 함수 성공:', responseData1.message);
          alert('상품 등록이 성공적으로 완료되었습니다. 유사 데이터가 생성되는 데에는 약 15-20분이 소요될 예정입니다. 일정 시간 이후 [MyPage] 함의 [구매한 내역 다운로드] 항목에서 해당 상품을 다운로드 받으실 수 있습니다.')
          window.location.href = '/MyPage';
        } else {
          console.error('after 함수 실패:', responseData1.message);
        }
      })
      .catch(error => {
        console.error('after 함수 오류:', error);
        alert('결제 검증 및 처리 실패');
      });
    } else {
      console.error('결제 검증 및 처리 실패', result);
      alert('결제 검증 및 처리 실패');
    }
  })
  .catch(error => {
    console.error('결제 검증 및 처리 실패', error);
    alert('결제 검증 및 처리 실패');
  })};


// const verifyAndProcessPayment = (response, productId) => {
//     const paymentDataObject = {
//       amount: `${response.paid_amount}`,
//       dataProductId: `${productId}`,
//       imp_uid: `${response.imp_uid}`,
//     };
  

//     verifyPayment1(paymentDataObject) // Use paymentDataObject directly
//       .then(result => {
//         if (result.success) {
//           console.log('결제 검증 및 처리 성공', result);
//           alert('결제 검증 및 처리 성공');

//           setIsPaymentSuccessful(true); // 상태를 true로 변경
       
//           console.log(result)


//           const token = localStorage.getItem('accessToken');
//           const request = {
//             "orderId" : result.payload.data.orderId,
//             "dataProductId" : productId
//           };
          
//           console.log(request)

//           const apiUrl = '/v1/data-products/after';
//           const jsonHeaders = {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           };

//           const formData = new FormData();
//           formData.append('zipFile', zipFileData, 'test.zip');

//           axios.post(apiUrl, JSON.stringify(request), {
//               headers: jsonHeaders,
//               withCredentials: true,
//             })
//             .then((response1) => {
//               const responseData1 = response1.data;
//               console.log(responseData1);
//               if (responseData1.code === 0) {
//                 console.log('after 함수 성공:', responseData1.message);
//               } else {
//                 console.error('after 함수 실패:', responseData1.message);
//               }
//             })
//             .catch((error) => {
//               console.error('after 함수 오류:', error);
//             });


            
//         } else {
//           console.error('결제 검증 및 처리 실패', result);
//           alert('결제 검증 및 처리 실패');
//         }
//       })
//       .catch((error) => {
//         console.error('결제 검증 및 처리 실패', error);
//         alert('결제 검증 및 처리 실패');
//       });
//   };
  
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Datasize, setDatasize] = useState([]);
    const [Category, setCategory] = useState([]);

    const [CustomCategory, setCustomCategory] = useState("");
    const [zipFileData, setZipFileData] = useState(null);
    // const onFileChange = (event) => {
    //   const file = event.target.files[0];
    //   console.log(file); // 파일이 올바르게 선택되었는지 확인
    //   setZipFileData(file);
   
    // };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      console.log(file); // 파일이 올바르게 선택되었는지 확인
      if (file) {
        // 파일을 File 객체로 생성하여 zipFileData로 설정
        const zipFile = new File([file], file.name, { type: file.type });
        setZipFileData(zipFile);
      } else {
        console.error('파일이 선택되지 않았습니다.');
      }
    };
    

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
          !zipFileData

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
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1> 상품 등록 </h1>
            </div>


           <div className="row mt-4">
    <div className="col-lg-12 offset-lg-0">
        <div className="search-form-box my-custom-box p-4 rounded bg-light">




        <Form onSubmit={submitHandler}>
  <h5>zip 이미지 파일 업로드</h5>
  <p>      *폴더 압축이 아닌 이미지 압축 zip파일을 업로드 해주세요 </p>
  <input 
    type="file" 
    className="upload-button" 
    accept=".zip" 
    onChange={onFileChange} // 파일 선택 시 실행되는 함수
  />



                <br />

                <br />
                <h5 style={{ marginRight: '10px' }}>파일명</h5>
                <Input placeholder="생성하고자 하는 이미지 데이터 파일의 이름을 입력해주세요" onChange={titleChangeHandler} value={Title} />

                <br />
                <br />

                <br />
                <h5 style={{ marginRight: '10px' }}>설명</h5>
                <TextArea placeholder="생성하고자 하는 이미지 데이터 파일을 3줄 이상 설명해주세요" onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />


                <div className="search-category">
    <h5 style={{ marginRight: '10px', marginBottom: 0 }}>생성 데이터 수</h5>
    <Checkbox.Group onChange={DatasizeChangeHandler} value={Datasize}>
        {DataSizeOptions.map(item => (
            <Checkbox key={item.key} value={item.value}>
                {item.value}
            </Checkbox>
        ))}
    </Checkbox.Group>
    {Datasize.includes("직접입력") && (
        <Input
            placeholder="숫자로 입력해주세요"
            style={{ marginTop: "10px" }}
            value={Datasize}
            onChange={DatasizeChangeHandler}
        />
    )}
</div>

<br />

<div className="search-category">
    <h5 style={{ marginRight: '10px', marginBottom: 0 }}>카테고리</h5>
    <Checkbox.Group onChange={categoryChangeHandler} value={Category}>
                {categoryIds.map(item => (
                    <Checkbox key={item.key} value={item.value}>
                        {item.value}
                    </Checkbox>
                ))}
            </Checkbox.Group>

</div>
<br />
                <br />
                <div className="button-container">
                {!isUploadSuccessful && (
                  <button className="data-create-button" type="submit" onClick={submitHandler}>
                    데이터 생성
                  </button>
                )}
                {isUploadSuccessful && (
                  <button className="data-create-button" onClick={handlePayment}>
                    결제하기
                  </button>
                )}
              </div>
              

            </Form>



        </div>
        </div>


        </div>


        

        </div>
        </div>

        </div>
    )
}


export default UploadProductPage