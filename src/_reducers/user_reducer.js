import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  NAVBAR_USER,
  HOMEPAGE_USER,
  AUTH_USER,
  EMAIL_VERIFICATION_FAILURE,
  EMAIL_VERIFICATION_SUCCESS,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
  SET_PRODUCTS,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE

} from '../_actions/types';


const initialState = {
    emailFailure: null,
    emailSuccess: null
  };


  export default function (state = {}, action) {
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
    case ADD_TO_CART:
        return {...state,userData: {...state.userData,cart: action.payload}};
    case GET_CART_ITEMS:
        return { ...state, cartDetail: action.payload };
    case REMOVE_CART_ITEM:
        return {...state, cartDetail: action.payload.productInfo,
                    userData: {
                        ...state.userData,
                        cart: action.payload.cart
                    }}

    case PAYMENT_SUCCESS:
        return { ...state, success: true, error: null };
    case PAYMENT_FAILURE:
        return { ...state, success: false, error: action.payload };

    case ON_SUCCESS_BUY:
        return {...state, cartDetail: action.payload.cartDetail,
                    userData: {...state.userData, cart: action.payload.cart}
                };
    case SET_PRODUCTS:
        return { ...state, products: action.payload };

      default:
          return state;
  }
  }
