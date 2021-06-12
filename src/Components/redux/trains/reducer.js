import { combineReducers } from 'redux';
import types from '../types';

const userTraining = (state = null, { type, payload }) => {
  switch (type) {
    case types.SEND_FORM_SUCCESS:
      return { ...state, ...payload.uploadedTraining };

    case types.GET_CURRENT_USER_TRAINS_SUCCESS:
      return { ...state, ...payload };
    // case types.LOGOUT_SUCCESS:
    //   return null;

    default:
      return state;
  }
};

export default combineReducers({ userTraining });
