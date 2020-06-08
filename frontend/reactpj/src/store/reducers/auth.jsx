import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userid: null,
  error: null,
  loading: false,

  firstdrawer: false,
  logindrawer: false,
  signupdrawer: false,
};

const firstDrawerOpen = (state, action) => {
  return updateObject(state, {
    firstdrawer: true,
  });
};

const firstDrawerClose = (state, action) => {
  return updateObject(state, {
    firstdrawer: false,
  });
};

const loginDrawerOpen = (state, action) => {
  return updateObject(state, {
    logindrawer: true,
  });
};

const loginDrawerClose = (state, action) => {
  return updateObject(state, {
    logindrawer: false,
  });
};

const signupDrawerOpen = (state, action) => {
  return updateObject(state, {
    signupdrawer: true,
  });
};

const signupDrawerClose = (state, action) => {
  return updateObject(state, {
    signupdrawer: false,
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userid: action.userid,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userid: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FIRSTDRAWER_OPEN:
      return firstDrawerOpen(state, action);
    case actionTypes.FIRSTDRAWER_CLOSE:
      return firstDrawerClose(state, action);
    case actionTypes.LOGINDRAWER_OPEN:
      return loginDrawerOpen(state, action);
    case actionTypes.LOGINDRAWER_CLOSE:
      return loginDrawerClose(state, action);
    case actionTypes.SIGNUPDRAWER_OPEN:
      return signupDrawerOpen(state, action);
    case actionTypes.SIGNUPDRAWER_CLOSE:
      return signupDrawerClose(state, action);
    default:
      return state;
  }
};

export default reducer;
