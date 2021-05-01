import { combineReducers } from 'redux';

import { authReduer } from './authReducer';
import { productReducer } from './productReducer';
import { searchReducer } from './searchReducer';
import { cartReducerFunction } from './cartReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

export const rootReducers = combineReducers({
  auth: authReduer,
  product: productReducer,
  search: searchReducer,
  cart: cartReducerFunction,
  coupon: couponReducer,
  COD: CODReducer,
});
