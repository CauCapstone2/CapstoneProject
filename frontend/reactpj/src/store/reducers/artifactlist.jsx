import { handleActions } from "redux-actions";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  error: false,
  data: {
    title: "",
    body: "",
  },
};

export default handleActions(
  {
    [actionTypes.GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [actionTypes.GET_POST_SUCCESS]: (state, action) => {
      const { title, body } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          title,
          body,
        },
      };
    },
    [actionTypes.GET_POST_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
