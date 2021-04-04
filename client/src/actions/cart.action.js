import _ from 'lodash';

import { ADD_CART } from '../constants';

export const handleAddToCart = (
  product,
  setToolTip = undefined
) => dispatch => {
  {
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
  }
};
