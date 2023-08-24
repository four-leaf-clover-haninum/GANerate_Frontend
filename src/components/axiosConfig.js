import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.35.255.4',
});

// 인증 토큰을 가져오는 함수
const getAuthToken = () => {
  return localStorage.getItem('accessToken');  // 'authToken' 대신 'accessToken'을 사용
};

// 인증 토큰을 헤더에 설정하는 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 로그인 경로에 대해서는 토큰을 추가하지 않음
    if (config.url !== '/v1/users/sign-in') {
      const accessToken = getAuthToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;