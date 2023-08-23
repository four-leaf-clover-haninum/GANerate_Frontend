
import axios from '../components/axiosConfig';

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
    GET_PRODUCT_DETAIL
    
} from './types';


export function getProductDetail(dataProductId) {
  const token = localStorage.getItem('accessToken');  // Retrieve access token from local storage
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  const request = axios.get(`/v1/data-products/${dataProductId}`, config)
      .then(response => {
          if (response.data.code === 0) {
              return response.data.product;
          } else {
              console.error("Failed to fetch data");
              return null;
          }
      })
      .catch(error => {
          console.error("An error occurred: ", error);
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
            localStorage.setItem('authToken', data.accessToken); 

              console.log(response.data);

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
            alert('가입이 정상적으로 완료되었습니다.');
            dispatch({
                type: REGISTER_USER,
                payload: responseData
            });
            console.log('가입이 정상적으로 완료되었습니다.');
            
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
          // CartItem들에 해당하는 정보들을  
          // Product Collection에서 가져온후에 
          // Quantity 정보를 넣어 준다.
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

// 서버에서 상품 데이터 가져오는 액션
export const fetchProducts = (page, token) => {
  return (dispatch) => {
    // 서버로부터 데이터 가져오는 요청
    return axios.get(`/v1/data-products?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        dispatch({
          type: SET_PRODUCTS,
          payload: response.data,
        });
        return response.data; // Return the data for chaining promises
      })
      .catch(err => {
        console.error(err);
        throw err; // Rethrow the error to be caught by the caller
      });
  };
};




// 검색 결과 가져오는 액션
export const searchProducts = (category, priceRange, searchQuery) => {
  return (dispatch) => {
    // 검색 조건에 맞는 상품 데이터 가져오는 요청
    //axios.get(`/v1/data-products/search?category=${category.join(',')}&price=${priceRange.join(',')}&q=${searchQuery}`)
    axios.get(`/v1/data-products/category/2?page=0`)
      .then(response => {
        dispatch(setProducts(response.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};


export const verifyPayment = (data) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8081/v1/payments/verifyIamport', data, {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTIzOTIxNjl9.RVyIBDsT7bPLFNBKuh4FwkaNFlWJZg9olS46d4HvFjk',
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: 'PAYMENT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PAYMENT_FAILURE', payload: error.response.data });
  }
};