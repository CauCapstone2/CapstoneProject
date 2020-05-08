import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token : null,
    userid : null,
    error : null,
    loading : false,

    firstdrawer : false,
    logindrawer : false,
    signupdrawer : false
}

const firstDrawerOpen = (state, action) => {
    return updateObject(state, {
        firstdrawer : true,
    });
}

const authStart = (state, action) => {
    return updateObject(state, {
        error : null,
        loading : true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token : action.token,
        userid : action.userid,
        error : null,
        loading : false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error : action.error,
        loading : false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token : null,
        userid : null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL : return authFail(state, action);
        case actionTypes.AUTH_LOGOUT : return authLogout(state, action);
        case actionTypes.FIRSTDRAWER_OPEN : return firstDrawerOpen(state, action);
        default : return state;
    }
}

export default reducer;