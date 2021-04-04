import { ADD_CART } from '../constants';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

export const cartReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      return action.payload;

    default:
      return state;
  }
};
