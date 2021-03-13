import { combineReducers } from 'redux';

import { authReduer } from './authReducer';
import { productReducer } from './productReducer';

export const rootReducers = combineReducers({
  auth: authReduer,
  product: productReducer,
});
