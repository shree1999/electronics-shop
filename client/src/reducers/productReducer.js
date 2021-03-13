import {
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../constants';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { isLoading: true, error: null, data: [] };

    case FETCH_PRODUCTS_SUCCESS:
      return { isLoading: false, error: null, data: action.payload };

    case FETCH_PRODUCTS_FAIL:
      return { isLoading: false, error: action.payload, data: [] };

    default:
      return state;
  }
};
