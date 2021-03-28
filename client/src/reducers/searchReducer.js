import { SEARCH_QUERY } from '../constants';

const initialState = {
  text: '',
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
