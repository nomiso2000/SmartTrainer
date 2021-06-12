import { combineReducers } from 'redux';
import types from '../types';

const user = (state = null, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...payload };
    case types.SIGNUP_SUCCESS:
      return { ...state, ...payload };
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, ...payload };
    // case types.SEND_FORM_SUCCESS:
    //   return { ...state, ...payload.user };
    case types.SEND_MUSCLE_TRAINING_SUCCESS:
      return { ...state, ...payload };
    case types.LOGOUT_SUCCESS:
      return null;
    case types.LOGOUT_FAILURE:
      return null;

    default:
      return state;
  }
};
// const userTraining = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.GET_CURRENT_USER_SUCCESS:
//       return { ...state, ...payload };

//     default:
//       return state;
//   }
// };

const token = (state = null, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return payload.token;
    case types.SIGNUP_SUCCESS:
      return payload.token;
    case types.LOGOUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

// const balance = (state = 0, { type, payload }) => {
//   switch (type) {
//     case types.GET_CURRENT_USER_SUCCESS:
//       return payload.balance;
//     case types.ADD_SUCCESS:
//       return payload.balanceAfter;
//     case types.LOGIN_SUCCESS:
//       return payload.user.balance;
//     case types.LOGOUT_SUCCESS:
//       return null;

//     default:
//       return state;
//   }
// };

// const loading = (state = false, { type }) => {
//   switch (type) {
//     case types.LOGIN_START:
//       return true;
//     case types.LOGIN_SUCCESS:
//       return false;
//     case types.LOGIN_FAILURE:
//       return false;

//     case types.SIGNUP_START:
//       return true;
//     // case types.SIGNUP_SUCCESS:
//     //   return false;
//     case types.SIGNUP_FAILURE:
//       return false;

//     case types.LOGOUT_START:
//       return true;
//     case types.LOGOUT_SUCCESS:
//       return false;
//     case types.LOGOUT_FAILURE:
//       return false;

//     case types.GET_CURRENT_USER_START:
//       return true;
//     case types.GET_CURRENT_USER_SUCCESS:
//       return false;
//     case types.GET_CURRENT_USER_FAILURE:
//       return false;

//     default:
//       return state;
//   }
// };

export default combineReducers({ user, token });
