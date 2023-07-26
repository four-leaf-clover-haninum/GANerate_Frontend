import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  NAVBAR_USER,
  HOMEPAGE_USER
} from '../_actions/types';

const initialState = {};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
      case LOGIN_USER:
          return { ...state, loginSuccess: action.payload };
      case LOGIN_USER_FAILURE:
          return { ...state, error: action.payload };
      case REGISTER_USER:
          return { ...state, register: action.payload };
      case NAVBAR_USER:
          return { ...state, navbar: action.payload };
        case HOMEPAGE_USER:
            return { ...state, homepage: action.payload };
      default:
          return state;
  }
};

export default userReducer;
