import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authReducer from './auth/reducer';
import trainReducer from './trains/reducer';

// import errorsReducer from './error/reducer';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
  // transforms: [encryptor],
};

const rootReducers = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  training: trainReducer,
});

export default rootReducers;
