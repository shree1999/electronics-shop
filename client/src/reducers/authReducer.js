import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants';

const authReduer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...action.payload,
      };

    case USER_LOGGED_OUT:
      return action.payload;

    default:
      return state;
  }
};

export { authReduer };
