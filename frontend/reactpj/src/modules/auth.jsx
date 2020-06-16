import axios from "axios";

// action type
const AUTH_START = "AUTH_START";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAIL = "AUTH_FAIL";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const FIRSTDRAWER_OPEN = "FIRSTDRAWER_OPEN";
const FIRSTDRAWER_CLOSE = "FIRSTDRAWER_CLOSE";
const LOGINDRAWER_OPEN = "LOGINDRAWER_OPEN";
const LOGINDRAWER_CLOSE = "LOGINDRAWER_CLOSE";
const SIGNUPDRAWER_OPEN = "SIGNUPDRAWER_OPEN";
const SIGNUPDRAWER_CLOSE = "SIGNUPDRAWER_CLOSE";
const TID_GET = "TID_GET";
const TID_DELETE = "TID_DELETE";

// action creator
export const tidDataSetaction = (tid, credit) => {
  return {
    type: TID_GET,
    tid: tid,
    credit: credit,
  };
};
export const tidDataGetaction = (tid, credit) => {
  return (dispatch) => {
    localStorage.setItem("tid", tid);
    localStorage.setItem("credit", credit);
    dispatch(
      tidDataSetaction(
        tid,
        credit
      )
    );
  };
};

export const tidDataDeleteaction = () => {
  localStorage.removeItem("tid");
  localStorage.removeItem("credit");
  return {
    type: TID_DELETE,
  };
};

export const tidDataCheckaction = () => {
  return (dispatch) => {
    const tid = localStorage.getItem("tid");
    const credit = localStorage.getItem("credit");
    console.log("tid in check : " + tid);
    console.log("credit in check : " + credit);
    if (tid != null && credit != null) {
      dispatch(tidDataSetaction(tid, credit));
    }
  };
};

export const firstDrawerOpen = () => {
  return {
    type: FIRSTDRAWER_OPEN,
  };
};

export const firstDrawerClose = () => {
  return {
    type: FIRSTDRAWER_CLOSE,
  };
};

export const loginDrawerOpen = () => {
  return {
    type: LOGINDRAWER_OPEN,
  };
};

export const loginDrawerClose = () => {
  return {
    type: LOGINDRAWER_CLOSE,
  };
};

export const signupDrawerOpen = () => {
  return {
    type: SIGNUPDRAWER_OPEN,
  };
};

export const signupDrawerClose = () => {
  return {
    type: SIGNUPDRAWER_CLOSE,
  };
};

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userid) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userid: userid,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://3.34.190.67/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        axios
          .get("http://3.34.190.67/rest-auth/user/", {
            headers: {
              authorization: "Token " + token,
            },
          })
          .then((res) => {
            const userid = res.data.pk;
            localStorage.setItem("userid", userid);
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("token", token);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(authSuccess(token, localStorage.getItem("userid")));
            dispatch(checkAuthTimeout(3600));
          });
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://3.34.190.67/rest-auth/registration/", {
        username: username,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        axios
          .get("http://3.34.190.67/rest-auth/user/", {
            headers: {
              authorization: "Token " + token,
            },
          })
          .then((res) => {
            const userid = res.data.pk;
            localStorage.setItem("userid", userid);
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("token", token);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(authSuccess(token, localStorage.getItem("userid")));
            dispatch(checkAuthTimeout(3600));
          });
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userid));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

//utility
const updateObject = (oldObject, updateProperties) => {
  return {
    ...oldObject,
    ...updateProperties,
  };
};

// reducer
const initialState = {
  token: null,
  userid: 0,
  error: null,
  loading: false,
  firstdrawer: false,
  logindrawer: false,
  signupdrawer: false,
  tid: null,
  credit: null,
};

const handleFirstDrawerOpen = (state, action) => {
  return updateObject(state, {
    firstdrawer: true,
  });
};

const handleFirstDrawerClose = (state, action) => {
  return updateObject(state, {
    firstdrawer: false,
  });
};

const handleLoginDrawerOpen = (state, action) => {
  return updateObject(state, {
    logindrawer: true,
  });
};

const handleLoginDrawerClose = (state, action) => {
  return updateObject(state, {
    logindrawer: false,
  });
};

const handleSignupDrawerOpen = (state, action) => {
  return updateObject(state, {
    signupdrawer: true,
  });
};

const handleSignupDrawerClose = (state, action) => {
  return updateObject(state, {
    signupdrawer: false,
  });
};

const handleAuthStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const handleAuthSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userid: action.userid,
    error: null,
    loading: false,
  });
};

const handleAuthFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const handleAuthLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userid: null,
  });
};
const tidDataDelete = (state, action) => {
  return updateObject(state, {
    tid: null,
    credit: null,
  });
};

const tidDataGet = (state, action) => {
  return updateObject(state, {
    tid: action.tid,
    credit: action.credit,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return handleAuthStart(state, action);
    case AUTH_SUCCESS:
      return handleAuthSuccess(state, action);
    case AUTH_FAIL:
      return handleAuthFail(state, action);
    case AUTH_LOGOUT:
      return handleAuthLogout(state, action);
    case FIRSTDRAWER_OPEN:
      return handleFirstDrawerOpen(state, action);
    case FIRSTDRAWER_CLOSE:
      return handleFirstDrawerClose(state, action);
    case LOGINDRAWER_OPEN:
      return handleLoginDrawerOpen(state, action);
    case LOGINDRAWER_CLOSE:
      return handleLoginDrawerClose(state, action);
    case SIGNUPDRAWER_OPEN:
      return handleSignupDrawerOpen(state, action);
    case SIGNUPDRAWER_CLOSE:
      return handleSignupDrawerClose(state, action);
    case TID_GET:
      return tidDataGet(state, action);
    case TID_DELETE:
      return tidDataDelete(state, action);
    default:
      return state;
  }
};

export default reducer;
