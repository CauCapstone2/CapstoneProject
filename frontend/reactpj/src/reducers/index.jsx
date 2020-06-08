import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import penderMiddleware, { penderReducer } from "redux-pender";
import auth from "./auth";

const reducers = combineReducers({
  auth,
  pender: penderReducer,
});

const logger = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(logger, ReduxThunk, penderMiddleware())
);

export default store;
