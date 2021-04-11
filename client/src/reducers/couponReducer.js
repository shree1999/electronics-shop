import { COUPON_APPLIED } from '../constants';

const initialState = {
  couponApplied: false,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUPON_APPLIED:
      return action.payload;

    default:
      return state;
  }
};
