import { combineReducers, createStore, applyMiddleware, compose } from "redux";
// import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import penderMiddleware, { penderReducer } from "redux-pender";
import auth from "./auth";
import artifactlist from "./artifactlist";
import artifactdetail from "./artifactdetail";
import evaluation from "./evaluation";
import comment from "./comment";

const reducers = combineReducers({
  auth,
  artifactlist,
  artifactdetail,
  evaluation,
  comment,
  pender: penderReducer,
});

// const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  // composeEnhancers(applyMiddleware(logger, ReduxThunk, penderMiddleware()))
  composeEnhancers(applyMiddleware(ReduxThunk, penderMiddleware()))
);

export default store;
