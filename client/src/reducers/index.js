import { combineReducers } from "redux";

import { authReduer } from "./authReducer";

export const rootReducers = combineReducers({
  auth: authReduer,
});
