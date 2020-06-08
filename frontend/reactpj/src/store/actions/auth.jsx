import axios from "axios";
import * as actionTypes from "./actionTypes";

export const firstDrawerOpen = () => {
  return {
    type: actionTypes.FIRSTDRAWER_OPEN,
  };
};

export const firstDrawerClose = () => {
  return {
    type: actionTypes.FIRSTDRAWER_CLOSE,
  };
};

export const loginDrawerOpen = () => {
  return {
    type: actionTypes.LOGINDRAWER_OPEN,
  };
};

export const loginDrawerClose = () => {
  return {
    type: actionTypes.LOGINDRAWER_CLOSE,
  };
};

export const signupDrawerOpen = () => {
  return {
    type: actionTypes.SIGNUPDRAWER_OPEN,
  };
};

export const signupDrawerClose = () => {
  return {
    type: actionTypes.SIGNUPDRAWER_CLOSE,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userid) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userid: userid,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
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
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        axios
          .get("http://localhost:8000/rest-auth/user/", {
            headers: {
              authorization: "Token " + token,
            },
          })
          .then((res) => {
            const userid = res.data.pk;
            localStorage.setItem("userid", userid);
          });
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, localStorage.getItem("userid")));
        dispatch(checkAuthTimeout(3600));
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
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        axios
          .get("http://localhost:8000/rest-auth/user/", {
            headers: {
              authorization: "Token " + token,
            },
          })
          .then((res) => {
            const userid = res.data.pk;
            localStorage.setItem("userid", userid);
          });
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, localStorage.getItem("userid")));
        dispatch(checkAuthTimeout(3600));
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
