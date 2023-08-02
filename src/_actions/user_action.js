import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGIN_USER_FAILURE,
    HOMEPAGE_USER,
    AUTH_USER
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


export function registerUser(dataToSubmit) {
    const request = axios.post('/v1/users/sign-up', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    };
}

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

