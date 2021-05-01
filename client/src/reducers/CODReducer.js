import { COD_APPLIED } from '../constants';

export const CODReducer = (state = false, action) => {
  switch (action.type) {
    case COD_APPLIED:
      return action.payload;

    default:
      return state;
  }
};
