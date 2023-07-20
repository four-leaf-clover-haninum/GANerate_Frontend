import {
    LOGIN_USER,
    NAVBAR_USER,
    REGISTER_USER
} from '../_actions/types';

const userReducer = function (state = {}, action) {
    switch (action.type) { // action.tyoe가 아닌 action.type으로 수정해줍니다.
      case LOGIN_USER:
        return { ...state, loginSuccess: action.payload }; // loginSucess가 아닌 loginSuccess로 수정해줍니다.
      case REGISTER_USER:
        return { ...state, register: action.payload };
      case NAVBAR_USER:
        return { ...state, navbar: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;