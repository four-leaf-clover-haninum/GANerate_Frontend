// axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.35.255.4',
});

// 인증 토큰을 가져오는 함수 (예시: 로컬 스토리지에서 토큰 가져오기)
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// 인증 토큰을 헤더에 설정
instance.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
