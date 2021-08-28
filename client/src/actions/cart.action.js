import _ from 'lodash';

import { ADD_CART } from '../constants';

export const handleAddToCart = (
  product,
  setToolTip = undefined
) => dispatch => {
  if (typeof window !== undefined) {
    let cartItems = [];
    if (localStorage.getItem('cart')) {
      cartItems = JSON.parse(localStorage.getItem('cart'));
    }

    cartItems.push({ ...product, count: 1 });

    const unique = _.uniqWith(cartItems, _.isEqual);

    localStorage.setItem('cart', JSON.stringify(unique));

    if (setToolTip instanceof Function) {
      setToolTip('Added');
    }

    dispatch({ type: ADD_CART, payload: unique });
  }
};

export const ModifyCountOfProduct = (p, qty) => (dispatch, getState) => {
  if (typeof window !== undefined) {
    const cartItems = getState().cart;
    cartItems.forEach((product, i) => {
      if (product._id === p._id) {
        cartItems[i].count = qty;
        return;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch({ type: ADD_CART, payload: cartItems });
  }
};

export const removeCartItem = p => (dispatch, getState) => {
  if (typeof window !== undefined) {
    const cartItems = getState().cart;
    cartItems.forEach((product, i) => {
      if (product._id === p._id) {
        cartItems.splice(i, 1);
        return;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch({ type: ADD_CART, payload: cartItems });
  }
};
