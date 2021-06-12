import axios from 'axios';
import types from '../types';
import API from '../../../services/api';
// import notification from '../../services/notification';
import routes from '../../routes/index';

const token = {
  set(authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const logIn = (user, history) => async (dispatch) => {
  dispatch({ type: types.LOGIN_START });
  try {
    const { data, status } = await API.auth.login(user);
    // if (status < 200 && status >= 300) throw new Error('Something went wrong!');
    console.log(data);
    dispatch({ type: types.LOGIN_SUCCESS, payload: data });
    token.set(data.token);
    // clearForm();
    history.push('/home');
  } catch (e) {
    alert('Ви ввели неправильний логін або пароль! ');
    dispatch({ type: types.LOGIN_FAILURE, payload: e.response.data.message });
  }
};
export const register = (credentials, history) => async (dispatch) => {
  dispatch({ type: types.SIGNUP_START });
  try {
    const { data } = await API.auth.register(credentials);
    dispatch({ type: types.SIGNUP_SUCCESS, payload: data });
    token.set(data.token);
    history.push('/userinfo');
  } catch (e) {
    dispatch({ type: types.SIGNUP_FAILURE, payload: e });
  }
};

// export const sendForm = (credentials, history) => async (
//   dispatch,
//   getState
// ) => {
//   const {
//     auth: {
//       user: { id: userId },
//     },
//   } = getState();
//   dispatch({ type: types.SEND_FORM_START });
//   try {
//     // const { data } = await API.auth.sendForm(credentials);
//     const { data } = await axios.patch(
//       `http://localhost:3001/users/${userId}`,
//       credentials
//     );
//     console.log(data);
//     dispatch({ type: types.SEND_FORM_SUCCESS, payload: data });
//   } catch (e) {
//     console.log(e);
//     // dispatch({ type: types.SEND_FORM_FAILURE, payload: e });
//   }
// };

export const getCurrentUserOper = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();
  // if (!persistedToken) {
  //   return;
  // }
  token.set(persistedToken);
  dispatch({ type: types.GET_CURRENT_USER_START });
  try {
    const { data } = await API.auth.getCurrentUser();
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: data });
    console.log(data);
  } catch (e) {
    // dispatch({ type: types.LOGOUT_FAILURE });
    console.log(e);
  }
};

// export const logOut = (history) => async (dispatch) => {
//   dispatch({ type: types.LOGOUT_START });
//   try {
//     const data = await API.auth.logout();
//     // if (status < 200 && status >= 300) throw new Error('Something went wrong!');
//     dispatch({ type: types.LOGOUT_SUCCESS, payload: data });
//     history.push('/login');
//     token.unset();
//     notification({
//       type: 'success',
//       message: 'Logout Success!',
//     });
//   } catch (e) {
//     dispatch({ type: types.LOGOUT_FAILURE });
//   }
// };
export const signOut = (history) => async (dispatch) => {
  dispatch({ type: types.LOGOUT_START });
  try {
    const data = await API.auth.signout();
    // if (status < 200 && status >= 300) throw new Error('Something went wrong!');
    dispatch({ type: types.LOGOUT_SUCCESS, payload: data });
    history.push('/login');
    token.unset();
  } catch (e) {
    console.log(e);
    dispatch({ type: types.LOGOUT_FAILURE });
  }
};

export const sendMuscleTrainingToUpdate =
  (credentials, history) => async (dispatch, getState) => {
    const {
      auth: {
        user: { _id: userId },
      },
    } = getState();
    dispatch({ type: types.SEND_MUSCLE_TRAINING_START });
    try {
      // const { data } = await API.auth.sendForm(credentials);
      const { data } = await axios.patch(
        `https://gentle-sierra-61969.herokuapp.com/users/muscleTraining/${userId}`,
        credentials
      );

      dispatch({ type: types.SEND_MUSCLE_TRAINING_SUCCESS, payload: data });
    } catch (e) {
      console.log(e);
      // dispatch({ type: types.SEND_FORM_FAILURE, payload: e });
    }
  };
