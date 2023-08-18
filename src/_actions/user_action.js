
import axios from '../components/axiosConfig';

import {
    LOGIN_USER,
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
    
} from './types';



export function loginUser(dataToSubmit) {
    return async (dispatch) => {
        try {
            const response = await axios.post('v1/users/sign-in', dataToSubmit);
            const { code, data } = response.data;

            if (code === 0) {
                // 로그인 성공 시
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                });
            } else if (code === 2201) {
                // 존재하지 않는 아이디
                dispatch({
                    type: LOGIN_USER_FAILURE,
                    payload: { message: '존재하지 않는 아이디' }
                });
            } else if (code === 2202) {
                // 올바르지 않은 비밀번호
                dispatch({
                    type: LOGIN_USER_FAILURE,
                    payload: { message: '올바르지 않은 비밀번호' }
                });
            } else if (code === -1) {
                // 비밀번호 누락
                dispatch({
                    type: LOGIN_USER_FAILURE,
                    payload: { message: '비밀번호는 필수입니다.' }
                });
            } else {
                // 기타 로그인 실패
                dispatch({
                    type: LOGIN_USER_FAILURE,
                    payload: { message: '로그인 실패' }
                });
            }
        } catch (error) {
            // 서버 오류 등 요청 실패 시
            dispatch({
                type: LOGIN_USER_FAILURE,
                payload: { message: '서버 오류: 로그인 실패' }
            });
        }
    };
}

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


  export const registerUser = (userData, history) => async dispatch => {
    try {
        const response = await axios.post('/v1/users/sign-up', userData);
        if (response.data.code === 0) {
            const responseData = response.data; // 응답 데이터의 내용을 추출
            console.log(responseData);
            alert('가입이 정상적으로 완료되었습니다.');

            // 회원 정보를 전달하도록 payload 수정
            dispatch({
                type: REGISTER_USER,
                payload: responseData
            });

            history.push('/v1/users/sign-in'); // 페이지 이동
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } 
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


        

// export function verifyEmailVerification(email, certificationNum) {
//   return async (dispatch) => {
//     try {
//       const requestData = {
//         email: email,
//         certificationNum: certificationNum,
//       };
//       const response = await axios.get('/v1/users/email', {
//         params: requestData, // 쿼리 파라미터로 데이터 전달
//         headers: {
//           'Accept': 'application/json',
//         },
//       });

//       const responseData = response.data;

//       if (responseData.code === 0) {
//         dispatch(emailVerificationSuccess(responseData));
//         console.log('인증번호 확인이 완료되었습니다.');
//         return responseData;
//       } else {
//         dispatch(emailVerificationFailure(responseData));
//         console.log('유효하지 않은 인증번호입니다.');
//         return responseData;
//       }
//     } catch (error) {
//       console.log(error.response);
//       dispatch({ type: 'EMAIL_VERIFICATION_FAILURE', payload: error.response });
//       throw error;
//     }
//   };
// }


  //
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
export const fetchProducts = () => {
  return (dispatch) => {
    // 서버로부터 데이터 가져오는 요청
    axios.get('/v1/data-products/{data-product-id}')
      .then(response => {
        dispatch(setProducts(response.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

// 검색 결과 가져오는 액션
export const searchProducts = (category, priceRange, searchQuery) => {
  return (dispatch) => {
    // 검색 조건에 맞는 상품 데이터 가져오는 요청
    axios.get(`/api/product/search?category=${category.join(',')}&price=${priceRange.join(',')}&q=${searchQuery}`)
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
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: 'PAYMENT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PAYMENT_FAILURE', payload: error.response.data });
  }
};