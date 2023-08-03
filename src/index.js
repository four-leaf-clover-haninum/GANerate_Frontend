import React from 'react';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// 변경된 부분: "react-dom"에서 "react-dom/client"로 수정합니다.
import { createRoot } from 'react-dom/client';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const renderApp = () => {
  // React 18에서는 ReactDOM.render 대신 ReactDOM.createRoot를 사용합니다.
  // createRoot는 일반적으로 한 번만 호출해야 합니다.
  createRoot(root).render(app);
};

// 개발 환경에서는 모듈 핫 리로딩을 지원하도록 유연성을 제공합니다.
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App', renderApp);
}

renderApp(); // 초기 앱 렌더링
reportWebVitals();