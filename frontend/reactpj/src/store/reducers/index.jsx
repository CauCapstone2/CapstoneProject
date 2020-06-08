import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import { reducer as authReducer } from ".auth";
import artifactlist from ".artifactlist";

export default combineReducers({
  authReducer,
  artifactlist,
  pender: penderReducer,
});
