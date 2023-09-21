import React, { useState, useEffect } from 'react';
import axios from '../../../components/axiosConfig'
import { Row, Col, Checkbox, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from './Sections/UserCardBlock';
import { Navbar as CustomNavbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaDownload } from 'react-icons/fa';
import './CartPage.css';
import { searchProducts, fetchProducts, fetchProductsByCategory } from '../../../_actions/user_action';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../DeteilProductPage/DetailProductPage';


//
function CartPage() {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const products = useSelector(state => state.user.products);
  const [Products, setProducts] = useState([]);
    const [Category, setCategory] = useState([]);
    const [PriceRange, setPriceRange] = useState([]);
    const [SearchQuery, setSearchQuery] = useState(''); 
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
      // 데이터 초기 로딩
      fetchProductData(currentPage);
    }, [currentPage]);
    
    const fetchProductData = (page) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        dispatch(fetchProducts(page, token))
          .then((response) => {
            setProducts(response.data.content);
            console.log(response.data.content) // content 배열을 사용
          })
          .catch((error) => {
            console.error('상품 데이터를 불러오는 중 에러 발생', error);
          });
      } else {
        console.error("Token is not available in local storage");
      }
    };
    
    
    
  
    const handleCategoryChange = (checkedValues) => {
      // 카테고리 체크박스 선택 시 동작
      setCategory(checkedValues);
      setCurrentPage(1); // 페이지 초기화
    };

    const handleSearchQueryChange = (e) => {
        // 검색어 입력 시 동작
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
      // 검색 버튼 클릭 시 검색 결과 가져오는 액션 디스패치
      setCurrentPage(0); // 검색 시 페이지 초기화
      const token = localStorage.getItem("accessToken");
      if (token) {
        // 이 부분에서 검색어와 카테고리, 가격 범위를 서버에 전달하도록 설정
        const searchData = {
          category: Category,       // 카테고리 배열
          priceRange: PriceRange,   // 가격 범위 배열
          searchQuery: SearchQuery  // 검색어
        };
    
        // searchProducts 함수가 Promise를 반환하도록 수정
        dispatch(searchProducts(searchData, token))
          .then((response) => {
            setProducts(response.data.content);
            console.log(response.data.content); // content 배열을 사용
          })
          .catch((error) => {
            console.error('상품 데이터를 불러오는 중 에러 발생', error);
          });
      } else {
        console.error("Token is not available in local storage");
      }
    };
    



    //   const handlePriceRangeChange = (checkedValues) => {
    //     // "직접입력" 체크 시 해당 값만 선택
    //     if (checkedValues.includes("range4")) {
    //         setPriceRange(["range4"]);
    //     } else {
    //         // 다른 체크박스 선택 시 "직접입력" 체크 해제 후 선택한 값만 선택
    //         const filteredValues = checkedValues.filter(value => value !== "range4");
    //         setPriceRange(filteredValues);
    //     }
    // };

    const handlePriceRangeChange = (checkedValues) => {
      // "직접입력" 체크 시 해당 값만 선택
      if (checkedValues.includes("range4")) {
        setPriceRange(["range4"]);
      } else {
        // 다른 체크박스 선택 시 "직접입력" 체크 해제 후 선택한 값만 선택
        const filteredValues = checkedValues.filter(value => value !== "range4");
        setPriceRange(filteredValues);
      }
      setCurrentPage(0); // 페이지 초기화
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
      <Nav.Link href="/v1/users/sign-in" className="btn btn-1" style={{ fontSize: '20px', color: 'white' }}>Log Out</Nav.Link>
      <Nav.Link href="/MyPage" className="btn btn-2 ml-2" style={{ fontSize: '20px', color: 'white', marginLeft: '20px' }}>
        <FaUserCircle style={{ fontSize: '24px', marginRight: '10px' }} />
        My Page
      </Nav.Link>
      </Nav>

      </div>
    </CustomNavbar>
    </React.Fragment>
   


    <div className="container mt-5">
  <h1 className="text-center" style={{ marginBottom: "60px" }}>데이터 상품 검색</h1>
  <div className="row mt-4">
    <div className="col-lg-12 offset-lg-0">
      <div className="search-form-box p-4 rounded bg-light">
        <h3 className="text-center" style={{ marginBottom: '30px' }}>상세 조회</h3>


        <div className="search-category">
        <h4>카테고리</h4>
        <Checkbox.Group onChange={handleCategoryChange}>
          <div>
            <Checkbox value="category1">보건/의료</Checkbox>
            <Checkbox value="category2">동물/식물</Checkbox>
            <Checkbox value="category3">사람</Checkbox>
            <Checkbox value="category4">추상</Checkbox>
          </div>
          <div>
            <Checkbox value="category5">패션</Checkbox>
            <Checkbox value="category6">건물/랜드마크</Checkbox>
            <Checkbox value="category7">풍경/배경</Checkbox>
            <Checkbox value="category8">경제/비즈니스</Checkbox>
          </div>
          <div>
            <Checkbox value="category9">사물/제품</Checkbox>
            <Checkbox value="category10">교통/물류</Checkbox>
            <Checkbox value="category11">스포츠</Checkbox>
            <Checkbox value="category12">기타</Checkbox>
          </div>
        </Checkbox.Group>
      </div>
      


          <div className="search-input">
    <h4>가격</h4>
    {/* 가격 범위 체크박스 */}
    <div>
    <Checkbox.Group value={PriceRange} onChange={handlePriceRangeChange}>
        <Checkbox value="range1">5만원 이하</Checkbox>
        <Checkbox value="range2">5만원 - 10만원</Checkbox>
        <Checkbox value="range3">10만원 - 20만원</Checkbox>
        <Checkbox value="range4">직접입력</Checkbox>
    </Checkbox.Group>
    </div>

    {/* 직접 입력 칸 */}
    {PriceRange.includes("range4") && (
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <Input placeholder="최솟값" style={{ marginBottom: "5px", width: "120px", marginRight: "10px" }} />
            <span style={{ fontSize: "20px" }}>~</span>
            <Input placeholder="최댓값" style={{ width: "120px", marginLeft: "10px" }} />
        </div>
    )}
</div>


            
            {/* 검색어 입력 */}

            <div className="search">
            <h4>검색어</h4>
            <div className="search-form-container" style={{ maxWidth: '300px' }}>
            </div>
            </div>

            <Input.Search
              value={SearchQuery}
              onChange={handleSearchQueryChange}
              onPressEnter={handleSearch}
              placeholder="상품명을 입력해주세요"
              style={{ marginTop: '10px' } }/>
            </div>


            {/* 최종 검색 */}
            <Button className="search-button" onClick={handleSearch} style={{ display: 'block', margin: '20px auto', fontSize: '17px' }}>
            검색
          </Button>
             </div>

             {fetchProducts()} 

        

{/* 상품 불러오기 */}
<div className="row mt-4">
  {Products.map(product => (
    <Link to={`/v1/data-products/${product.dataProductId}`} key={product.dataProductId} className="link-no-underline" onClick={() => window.scrollTo(0, 0)}>
      <div className="col-lg-12 offset-lg-0 product-card">





      <div className="product-image">
        <img alt="product" src={product.imageUrl} style={{ width: '180px', height: '180px', objectFit: 'cover' }} />
      </div>
      <div className="product-details">
        <div className="category-box">
          <div className="product-categoryNames">
            {product && product.categoryNames ? `${product.categoryNames}` : "categoryNames 정보 없음"}
          </div>
        </div>
        <h3 className="product-title">{product.title}</h3>
        <div className="description-box">
  <p className="product-description bold-text" style={{ fontSize: '15px', marginTop: '10px' }}>
    {product.description}
  </p>
</div>
        <div className="product-createdAt" style={{ fontSize: '13px', color: '#555555' }}>
        {product && product.createdAt ? `최초 등록일자 : ${product.createdAt}` : "최초 등록일자 : createdAt 정보 없음"}
        </div>
      <div className="product-buyCnt" style={{ display: 'flex', color: '#555555', justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: '13px' }}>
  현재까지 구매 수량 : {product.buyCnt}
</div>
        <div className="product-price" style={{ display: 'flex', fontWeight: 'bold', justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: '19px' }}>
  {product.price}원
</div>
      </div>
    </div>
    </Link>
  ))}
</div>




        {/* 페이지네이션 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  <div className="pagination">
    {[...Array(10).keys()].map((pageIndex) => (
      <Button

      key={pageIndex}
      className={`page-number-button ${currentPage === pageIndex ? 'active' : ''}`}
      onClick={() => {
        setCurrentPage(pageIndex);

        // 페이지 이동 및 스크롤
      //  window.location.href = '/Order';
        window.scrollTo(0, 0);
      }}
      style={{ marginLeft: '5px', marginRight: '5px' }}
    >
        {pageIndex + 1}
      </Button>
    ))}
  </div>
</div>


<br>
</br>
<br>
</br>
<br>
</br>
        
        </div>
    </div>
  </div>
  {/* ... (푸터 등 추가 코드) */}

  <br>
</br>
<br>
</br>
<br>
</br>

</div>


  );
}


export default CartPage;