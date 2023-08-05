import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  NAVBAR_USER,
  HOMEPAGE_USER,
  AUTH_USER,
  EMAIL_VERIFICATION_FAILURE,
  EMAIL_VERIFICATION_SUCCESS
} from '../_actions/types';


const initialState = {
    emailFailure: null,
    emailSuccess: null
  };


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
      case AUTH_USER:
          return {...state, userData: action.payload};
    case EMAIL_VERIFICATION_FAILURE:
        return { ...state, emailFailure: action.payload, emailSuccess: null };
    case EMAIL_VERIFICATION_SUCCESS:
        return { ...state, emailSuccess: action.payload, emailFailure: null };
      default:
          return state;
  }
};

export default userReducer;
