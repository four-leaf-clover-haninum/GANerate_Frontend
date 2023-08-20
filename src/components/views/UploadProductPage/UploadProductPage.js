import React, { useState } from 'react'
import { Typography, Button, Form, Input,Checkbox } from 'antd';
import FileUpload from '../../utils/FileUpload';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import Axios from 'axios';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import './UploadProductPage.css'

const { TextArea } = Input;


const Categories = [
    { key: 1, value: "100장" },
    { key: 2, value: "500장" },
    { key: 3, value: "1000장" },
    { key: 4, value: "직접입력" }
]

const Continents = [
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
    { key: 13, value: "기타" },
    // 다른 카테고리 항목 추가
];

function UploadProductPage(props) {
    const [Category, setCategory] = useState([]); // Selected categories state
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState([]); // Selected continents state
    const [Images, setImages] = useState([]);
    // Rest of your component code

    const categoryChangeHandler = (checkedValues) => {
        setCategory(checkedValues);
    };

    const continentChangeHandler = (checkedValues) => {
        setContinent(checkedValues);
    };


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const [CustomCategory, setCustomCategory] = useState(""); // Custom category input


    const customCategoryChangeHandler = (event) => {
        setCustomCategory(event.currentTarget.value);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Continent || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }
        
        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        Axios.post('/v1/data-products/sale/image', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
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


      
      
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1> 상품 업로드</h1>
            </div>


           <div className="row mt-4">
    <div className="col-lg-12 offset-lg-0">
        <div className="search-form-box my-custom-box p-4 rounded bg-light">

            <Form onSubmit={submitHandler}>
                <h5>zip 이미지 파일 업로드</h5>
                <FileUpload refreshFunction={updateImages}>
                <button className="upload-button">
                zip 이미지 파일 업로드
                </button>
                </FileUpload>



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

                <br />
<div style={{ display: 'flex', alignItems: 'center' }}>
    <h5 style={{ marginRight: '10px' }}>태그</h5>
    <span style={{ fontSize: '12px', color: '#9a1548', marginRight: '5px' }}>
        *이미지를 나타내는 대표 문구 3가지를 작성해주세요
    </span>
</div>
<div style={{ display: 'flex' }}>
    <Input style={{ flex: 1, marginRight: '5px' }} placeholder="태그 1" />
    <Input style={{ flex: 1, marginRight: '5px' }} placeholder="태그 2" />
    <Input style={{ flex: 1 }} placeholder="태그 3" />
</div>
<br />
<br />


                <div className="search-category">
    <h5 style={{ marginRight: '10px', marginBottom: 0 }}>생성 데이터 수</h5>
    <Checkbox.Group onChange={categoryChangeHandler} value={Category}>
                {Categories.map(item => (
                    <Checkbox key={item.key} value={item.value}>
                        {item.value}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            {Category.includes("직접입력") && (
                <Input
                    placeholder="숫자로 입력해주세요"
                    style={{ marginTop: "10px" }}
                    value={CustomCategory}
                    onChange={customCategoryChangeHandler}
                />
    )}
</div>
<br />


<br />
<div className="search-category">
    <h5 style={{ marginRight: '10px', marginBottom: 0 }}>카테고리</h5>
    <Checkbox.Group onChange={continentChangeHandler} value={Continent}>
                {Continents.map(item => (
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
