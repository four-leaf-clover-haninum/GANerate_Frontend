import React, { useState } from 'react'
import { Typography, Button, Form, Input,Checkbox } from 'antd';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import { FaUserCircle} from 'react-icons/fa';
import './UploadProductPage.css'
import {createDataProduct, productbox} from '../../../_actions/user_action'

function UploadProductPage(props) {

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
                <input 
                type="file" 
                className="upload-button" 
                accept=".zip" 
                onChange={onFileChange} 
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
                 <button className="data-create-button" type="submit" onClick={submitHandler}>
                 데이터 생성
                  </button>
    
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
