
import axios from '../components/axiosConfig';
import setAuthorizationToken from '../components/utils/setAuthorizationToken';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import qs from 'qs';
import paymentDataObject from '../components/views/UploadProductPage/UploadProductPage'




import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    LOGIN_USER_FAILURE,
    HOMEPAGE_USER,
    AUTH_USER,
    EMAIL_VERIFICATION_SUCCESS,
    EMAIL_VERIFICATION_FAILURE,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    SET_PRODUCTS,
    PAYMENT_USER,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
    GET_PRODUCT_DETAIL,
    FETCH_PRODUCTS_SUCCESS,
    GET_USER_POINTS_SUCCESS,
  GET_USER_HEARTS_SUCCESS,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE
    
} from './types';





// 제품 상세 조회
export function getProductDetail(dataProductId) {
  const token = localStorage.getItem('accessToken');
  const request = axios.get(`/v1/data-products/${dataProductId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true // withCredentials 옵션 추가
  })

    .then(response => {
      if (response.data.code === 0) {
        console.log(response.data.data)
        return response.data.data;
  
      } else {
        console.error("Failed");
        console.log(response.data.data)
        return null;
      }
    })
    .catch(error => {
      console.error(error);
      return null;
    });
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request
  };
}




export function loginUser(dataToSubmit) {
  return async (dispatch) => {
      try {
          const response = await axios.post('/v1/users/sign-in', dataToSubmit);
          const { code, data } = response.data;
          if (code === 0) {

            localStorage.setItem('accessToken', data.accessToken);
            setAuthorizationToken(data.accessToken);

            alert('로그인에 성공하였습니다.');
            dispatch({
                type: LOGIN_USER,
                payload: data
            });

            console.log("로그인에 성공하였습니다.");  // 로그인 성공 메시지는 개발 도구의 콘솔에만 출력
            return data;  // dispatch 후 data 반환 (다음 then에서 사용하게 됨)
          } else {
            throw new Error("로그인에 실패하였습니다."); // 로그인 실패 처리
          }
      } catch (error) {
          console.error("There was an error logging in:", error);
          return null; // 로그인 실패 시 null 반환
      }
  };
}




export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const response = await axios.post('/v1/users/logout', {
        accessToken,
        refreshToken
      });

      const { code } = response.data;

      if (code === 0) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: LOGOUT_USER
        });

        console.log("로그아웃에 성공하였습니다.");
        return true;
      } else {
        throw new Error("로그아웃에 실패하였습니다.");
      }
    } catch (error) {
      console.error("There was an error logging out:", error);
      return false;
    }
  };
};



export function getUserProfile(userId) {
    return async (dispatch) => {
      try {
        const response = await axios.get(`/v1/users/${userId}/profile`);
        const { code, data } = response.data;
  
        if (code === 0) {
          // 프로필 정보를 가져오기 성공 시
          dispatch({
            type: HOMEPAGE_USER,
            payload: data
          });
        } else if (code === -1) {
          // 해당 유저가 존재하지 않을 때
          dispatch({
            type: LOGIN_USER_FAILURE,
            payload: { message: '해당 유저가 존재하지 않습니다.' }
          });
        } else {
          // 기타 요청 실패 시
          dispatch({
            type: LOGIN_USER_FAILURE,
            payload: { message: '프로필 정보 가져오기 실패' }
          });
        }
      } catch (error) {
        // 서버 오류 등 요청 실패 시
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: { message: '서버 오류: 프로필 정보 가져오기 실패' }
        });
      }
    };
  }


  export const registerUser = (userData) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/v1/users/sign-up', userData);
        if (response.data.code === 0) {
            const responseData = response.data;
            console.log(responseData);
            alert('가입이 정상적으로 완료되었어요.');
            dispatch({
                type: REGISTER_USER,
                payload: responseData
            });
            console.log('가입이 정상적으로 완료되었어요');
            
            return true;  // 회원가입 성공시 true 반환
        } else {
            alert(response.data.message);
            return false;  // 실패시 false 반환
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        }
        return false;  // 실패시 false 반환
    }
};





// 이메일 인증 번호 전송 API 처리 함수
export function sendEmailVerification(email) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/v1/users/email', {email });
      console.log(response.data);

      // 서버로부터 인증번호 전송 성공 시
      dispatch({ type: 'EMAIL_VERIFICATION_SENT', payload: response.data });
      console.log('이메일 인증 번호가 전송되었습니다.');
    } catch (error) {
      console.log(error.response);
      // 서버 오류 등 요청 실패 시
      dispatch({ type: 'EMAIL_VERIFICATION_FAILURE', payload: error.response });
    }
  };
}




// 이메일 인증 번호 인증 API 처리 함수

export function verifyEmailVerification(email, certificationNum) {
  return async dispatch => {
    try {
      const response = await axios.post('/v1/users/email/verify', {
        email: email,
        certificationNum: certificationNum
      });
      const responseData = response.data;

      if (responseData.code === 0) {
        dispatch(emailVerificationSuccess(responseData));
        console.log(responseData);
        console.log('이메일 인증이 완료되었습니다.');
        alert('이메일 인증이 완료되었습니다.');
      } 
      else {
        dispatch(emailVerificationFailure(responseData));
        console.log(responseData);
        alert('이메일 인증에 실패하였습니다.')
      }
      
      return responseData; // 이부분이 중요합니다. responseData를 반환하여 handleVerifyEmail 함수에서 사용합니다.

    } catch (error) {
      console.log(error.response);
      dispatch({ type: 'EMAIL_VERIFICATION_FAILURE', payload: error.response });
      throw error; // 이 부분은 오류가 발생하면 throw를 통해 handleVerifyEmail의 catch로 넘어갑니다.
    }
  };
}

  export const emailVerificationFailure = (payload) => ({
    type: EMAIL_VERIFICATION_FAILURE,
    payload,
  });

  export const emailVerificationSuccess = (payload) => ({
    type: EMAIL_VERIFICATION_SUCCESS,
    payload,
  });



export function navbarUser(dataToSubmit) {
    const request = axios.post('/', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function homepageUser(dataToSubmit) {
    const request = axios.post('/', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOMEPAGE_USER,
        payload: request
    };
}


export function auth() {

    const request = axios.get('/v1/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}



export function addToCart(id) {
  let body = {
      productId: id
  }
  const request = axios.post(`${'v1/data-products?page=0'}/addToCart`, body)
      .then(response => response.data);

  return {
      type: ADD_TO_CART,
      payload: request
  }
}

export function getCartItems(cartItems, userCart) {

  const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
      .then(response => {
          userCart.forEach(cartItem => {
              response.data.forEach((productDetail, index) => {
                  if (cartItem.id === productDetail._id) {
                      response.data[index].quantity = cartItem.quantity
                  }
              })
          })
          return response.data;
      });

  return {
      type: GET_CART_ITEMS,
      payload: request
  }
}

export function removeCartItem(productId) {

  const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
      .then(response => {
          //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다. 
          response.data.cart.forEach(item => {
              response.data.productInfo.forEach((product, index) => {
                  if (item.id === product._id) {
                      response.data.productInfo[index].quantity = item.quantity
                  }

              })
          })
          return response.data;
      });

  return {
      type: REMOVE_CART_ITEM,
      payload: request
  }
}



export function onSuccessBuy(data) {

  const request = axios.post(`/api/users/successBuy`, data)
      .then(response => response.data);

  return {
      type: ON_SUCCESS_BUY,
      payload: request
  }
}


//상품 조회 페이지


// 액션 생성 함수
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};


export const verifyPayment = async (paymentDataMap) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('/v1/payments/verifyIamport', Object.fromEntries(paymentDataMap), {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    if (response.data.code === 0) {
      console.log('결제 검증 성공');
      console.log(paymentDataMap)
      return { success: true, payload: response.data };
    } else {
      console.log('결제 검증 실패');
      console.log(paymentDataMap)
      console.log(Object.fromEntries(Map))
      console.log(response);
      return { success: false, payload: response.data };
    }
  } catch (error) {
    console.error('결제 검증 실패 에러', error);
    console.log(paymentDataMap);
    console.log(Object.fromEntries(Map))
    return { success: false, payload: error.response ? error.response.data : 'Network error' };
  }
};




// 함수 정의 부분에서 이름 변경
export const verifyPayment1 = async (paymentDataObject) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axios.post('/v1/payments/verifyIamport', paymentDataObject, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    if (response.data.code === 0) {
      console.log('결제 검증 성공');
      console.log(paymentDataObject); // 수정: paymentDataMap 대신 paymentDataObject 사용
      return { success: true, payload: response.data };
    } else {
      console.log('결제 검증 실패');
      console.log(paymentDataObject); // 수정: paymentDataMap 대신 paymentDataObject 사용
      console.log(Object.fromEntries(Map)); // 이 부분은 필요 없어 보입니다.
      console.log(response);
      return { success: false, payload: response.data };
    }
  } catch (error) {
    console.error('결제 검증 실패 에러', error);
    console.log(paymentDataObject); // 수정: paymentDataMap 대신 paymentDataObject 사용
    // console.log(Object.fromEntries(Map)); // 이 부분은 필요 없어 보입니다.
    return { success: false, payload: error.response ? error.response.data : 'Network error' };
  }
};






export const getUserHearts = (token) => {
  return axios.get('/v1/users/hearts', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  })
  .then(response => {
    if (response.data.code === 0) {
      return {
        type: GET_USER_HEARTS_SUCCESS,
        payload: response.data.data
      };
    } else {
      throw new Error(response.data.message);
    }
  })
  .catch(error => {
    throw error;
  });
};


export const getUserPoints = (token) => {
  return axios.get('/v1/users/points', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  })
  .then(response => {
    if (response.data.code === 0) {
      return {
        type: GET_USER_POINTS_SUCCESS,
        payload: response.data.data.point
      };
    } else {
      throw new Error(response.data.message);
    }
  })
  .catch(error => {
    throw error;
  });
};

export const getUserOrdersSuccess = data => ({
  type: GET_USER_ORDERS_SUCCESS,
  payload: data,
});

export const getUserOrdersFailure = error => ({
  type: GET_USER_ORDERS_FAILURE,
  payload: error,
});



// your action file (e.g., user_action.js)
export const getUserOrders = () => async (dispatch) => {
  const token = localStorage.getItem('accessToken');
  console.log('Token:', token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  };

  try {
    const response = await axios.get('/v1/users/orders', config);

    if (response.data.code === 0) {
      const ordersData = response.data.data || [];
      dispatch(getUserOrdersSuccess(ordersData));

      // title과 price 출력
      ordersData.forEach(order => {
        console.log('Title:', order.title);
        console.log('Price:', order.price);
      });

      return ordersData;
    } else {
      dispatch(getUserOrdersFailure(response.data.message));
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch(getUserOrdersFailure(error.message));
    throw error;
  }
};






export const createDataProduct = async (data, token) => {
  try {
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          },
          withCredentials: true
      };

      const response = await axios.post(`/v1/data-products`, data, config);

      if (response.data.code === 0) {
          // Success handling
          console.log("Data created successfully:", response.data);
          // You can add further UI actions or redirects here
          return response.data; // Return the successful response for potential further processing
      } else {
          // Error handling
          console.error("Data creation failed:", response.data.message);
          throw new Error(response.data.message); // Throw an error for the caller to handle
      }
  } catch (error) {
      console.error("API request failed:", error);
      throw error; // Re-throw the error for the caller to handle
  }
};



export const downloadOrderFile = (token, orderId) => {
  return axios.post(`/v1/users/orders/${orderId}`, null, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
    responseType: 'json'
  })
  .then(response => {
    if (response.data.code === 0) {

      console.log(response.data)
      console.log('상품 다운로드에 성공했습니다.')

      const zip = new JSZip();
      
      // Promise를 이용해 모든 파일을 순차적으로 다운로드
      const promises = response.data.data.map((file) => {
        
        // fetch API를 이용해 blob 객체를 가져옴
        return fetch(file.s3Url)
          .then(response => response.blob())
          .then(blob => {
            zip.file(file.originalZipName, blob, { binary: true });
          })
          .catch(error => {
            console.error('Error fetching S3 file:', error);
            throw error;
          });
      });

      // 모든 프로미스가 완료될 때까지 대기
      return Promise.all(promises).then(() => zip.generateAsync({ type: 'blob' }));
      
    } else {
      console.log(response.data.message);
      throw new Error(response.data.message);
    }
  })
  .then(zipBlob => {
    FileSaver.saveAs(zipBlob, `order-${orderId}.zip`);
  })
  .catch(error => {
    console.log(error);
    throw error;
  });
};

export const generateProduct = (productInfo) => {
  const accessToken = localStorage.getItem('accessToken'); // 로그인 후 받은 토큰

  return axios.post('/v1/data-products', productInfo, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // 토큰을 헤더에 추가
      }
  })
  .then(response => {
      if (response.data.code === 0) {
          alert('상품 생성에 성공했습니다.');
          return response.data;
      } else {
          alert('상품 생성에 실패했습니다.');
          return null;
      }
  })
  .catch(error => {
      console.log('상품 생성 오류:', error);
      return null;
  });
};




// 서버에서 상품 데이터 가져오는 액션
export const fetchProducts = (page) => {
  // const token = `${localStorage.getItem('accessToken')}`; // setAuthorizationToken() 함수를 호출해야 함
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true // withCredentials 옵션 추가
  };
  return (dispatch) => {
    return axios.get(`/v1/data-products?page=${page}`, config)
      .then(response => {
        dispatch({
          type: SET_PRODUCTS,
          payload: response.data,
          
        });
        console.log(response.data)
        return response.data; // Return the data for chaining promises
        
      })
      .catch(err => {
        console.error('통신코드에서 상품데이터를 가져오는 에러' + err);
        throw err; // Rethrow the error to be caught by the caller
        
      });
  };
};





// 검색 결과 가져오는 액션
export const searchProducts = (category, priceRange, searchQuery) => {
  const token = setAuthorizationToken(); 
  return (dispatch) => {
    axios.get(`/v1/data-products/category/2?page=1`, {
      headers: {
        'Authorization': `Bearer ` + token
      },
      withCredentials: true
    })
      .then(response => {
        dispatch(setProducts(response.data));
      })
      .catch(error => {
        console.error('검색 결과 가져오기 토큰' + token);
      });
  };
};


export const fetchProductsByCategory = (categoryIds, page, token) => {
  return (dispatch) => { // 이 부분이 수정되었습니다.
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    // 여러 카테고리 조회 시 쿼리스트링으로 전달
    const queryString = categoryIds.map(categoryId => `categoryId=${categoryId}`).join('&');

    axios
      .get(`/v1/data-products/category?${queryString}&page=${page}`, config)
      .then((response) => {
        dispatch({
          type: 'FETCH_PRODUCTS_SUCCESS',
          payload: response.data.content,
        });
      })
      .catch((error) => {
        // 에러를 별도의 액션으로 전달하여 처리
        dispatch({
          type: 'FETCH_PRODUCTS_FAILURE',
          payload: error,
        });
      });
  };
};






//productbox로 담고있는 함수 로직
export const productbox = async (token, title, description, dataSize, categoryIds) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true
  };

  const categoryMappings = {
    "보건/의료": 1,
    "동물/식물": 2,
    "사람": 3,
    "추상" : 4,
    "패션" : 5,
    "건물/랜드마크" : 6,
    "풍경/배경" : 7,
    "과학, 항공 및 우주" : 8,
    "경제/비즈니스" : 9,
    "사물/제품" : 10,
    "교통/물류"  : 11,
    "스포츠" : 12,
    "기타" : 13
  };

  const categoryIdsArray = categoryIds.map(category => categoryMappings[category]);

  const requestBody = {
    title: title,
    description: description,
    dataSize: parseInt(dataSize),
    categoryIds: categoryIdsArray
  };

  console.log(token);
  console.log(requestBody);

  try {
    const response = await axios.post('/v1/data-products/before', requestBody, config);
    if (response.data.code === 0) {
      console.log("상품이 정상적으로 업로드 되었습니다.")
      alert(("상품이 정상적으로 업로드 되었습니다."))
      alert(("결제버튼을 클릭해주세요."))
      return response.data;
    } else {
      console.error("Server responded with an issue:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error uploading data", error);
    throw error;
  }
};






// // `after` 함수 정의
// export function after(token, zipFileData, requestBody) {
//   // API 엔드포인트 URL
//   const apiUrl = '/v1/data-products/after';

//   // 요청 헤더 설정
//   const headers = {
//     'Content-Type': 'multipart/mixed; boundary=6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm',
//     Authorization: `Bearer ${token}`,
//   };

//   // 폼 데이터 생성
//   const formData = new FormData();
//   formData.append('zipFile', zipFileData, 'test.zip');
//   formData.append('request', JSON.stringify(requestBody));

//   // axios를 사용한 HTTP POST 요청 보내기
//   return axios.post(apiUrl, formData, {
//     headers,
//     withCredentials: true,
//   })
//   .then(response => {
//     const responseData = response.data;
//     if (responseData.code === 0) {
//       console.log('API 요청 성공:', responseData.message);
//     } else {
//       console.error('API 요청 실패:', responseData.message);
//     }
//     return responseData;
//   })
//   .catch(error => {
//     console.error('API 요청 오류:', error);
//     throw error; // 오류 처리
//   });
// }


export function after(token, zipFileData, requestBody) {
  const apiUrl = '/v1/data-products/after';

  // application/json 헤더 설정
  const jsonHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // application/json 헤더 설정
  };

  // multipart/form-data로 파일 설정
  const formData = new FormData();
  formData.append('zipFile', zipFileData, 'test.zip');

  // axios로 POST 요청 보내기
  return axios.post(apiUrl, JSON.stringify(requestBody), { headers: jsonHeaders, withCredentials: true })
    .then(response => {
      const responseData = response.data;
      console.log(responseData);
      // 필요한 처리를 수행합니다.
      return responseData;
    })
    .catch(error => {
      console.error('API 요청 오류:', error);
      throw error; // 오류 처리
    });
}
