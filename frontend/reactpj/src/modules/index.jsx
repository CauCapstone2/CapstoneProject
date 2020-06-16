import { combineReducers, createStore, applyMiddleware, compose } from "redux";
// import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import penderMiddleware, { penderReducer } from "redux-pender";
import auth from "./auth";
import artifact from "./artifact";
import evaluation from "./evaluation";
import comment from "./comment";
import similarImage from "./similarimage";
import recreation from "./recreation";

const reducers = combineReducers({
  auth,
  artifact,
  evaluation,
  comment,
  similarImage,
  recreation,
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
