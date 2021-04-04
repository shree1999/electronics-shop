import { combineReducers } from 'redux';

import { authReduer } from './authReducer';
import { productReducer } from './productReducer';
import { searchReducer } from './searchReducer';
import { cartReducerFunction } from './cartReducer';

export const rootReducers = combineReducers({
  auth: authReduer,
  product: productReducer,
  search: searchReducer,
  cart: cartReducerFunction,
});
