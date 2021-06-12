import axios from 'axios';
import types from '../types';
import API from '../../../services/api';
// import notification from '../../services/notification';
import routes from '../../routes/index';

export const sendForm =
  (credentials, history) => async (dispatch, getState) => {
    const {
      auth: {
        user: { id: userId },
      },
    } = getState();
    dispatch({ type: types.SEND_FORM_START });
    try {
      const { data } = await axios.patch(
        `https://gentle-sierra-61969.herokuapp.com/users/${userId}`,
        credentials
      );
      console.log(data);
      dispatch({ type: types.SEND_FORM_SUCCESS, payload: data });
      history.push('/home');
    } catch (e) {
      console.log(e);
      // dispatch({ type: types.SEND_FORM_FAILURE, payload: e });
    }
  };

export const sendTrainings =
  (credentials, history) => async (dispatch, getState) => {
    const {
      auth: {
        user: { _id: userId },
      },
    } = getState();
    dispatch({ type: types.SEND_TRAINING_START });
    try {
      // const { data } = await API.auth.sendForm(credentials);
      console.log(credentials);
      const { data } = await axios.patch(
        `https://gentle-sierra-61969.herokuapp.com/users/historyTraining/${userId}`,
        credentials
      );

      dispatch({ type: types.SEND_TRAINING_SUCCESS });
    } catch (e) {
      console.log(e);
      // dispatch({ type: types.SEND_FORM_FAILURE, payload: e });
    }
  };

export const getCurrentUserTrains = (userId) => async (dispatch, getState) => {
  // const {
  //   auth: {
  //     user: { id: userId },
  //   },
  // } = getState();
  dispatch({ type: types.GET_CURRENT_USER_TRAINS_START });
  try {
    const { data } = await axios.get(
      `https://gentle-sierra-61969.herokuapp.com/users/${userId}`
    );
    // if (status < 200 && status >= 300) throw new Error('Something went wrong!');
    dispatch({ type: types.GET_CURRENT_USER_TRAINS_SUCCESS, payload: data });
    // notification({
    //   type: 'success',
    //   message: 'Register Success!',
    // });
  } catch (e) {
    console.log(e);
    // dispatch({ type: types.SIGNUP_FAILURE, payload: e });
  }
};
