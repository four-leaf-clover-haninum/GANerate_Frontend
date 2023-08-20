// axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.35.255.4',
});

// 인증 토큰을 가져오는 함수
const getAuthToken = () => {
  return localStorage.getItem('accessToken');  // 'authToken' 대신 'accessToken'을 사용
};

// 인증 토큰을 헤더에 설정
instance.interceptors.request.use(
  (config) => {
    // 로그인 경로에 대해서는 토큰을 추가하지 않음
    if (config.url !== '/v1/users/sign-in') {
      const authToken = getAuthToken();
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
