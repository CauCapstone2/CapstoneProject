import axios from "axios";
import { handleActions, handleAction } from "redux-actions";

// action type
const GET_EVALUATION_PENDING = "artifactdetail/GET_EVALUATION_PENDING";
const GET_EVALUATION_SUCCESS = "artifactdetail/GET_EVALUATION_SUCCESS";
const GET_EVALUATION_FAILURE = "artifactdetail/GET_EVALUATION_FAILURE";

//action creator
function getEvaluationApi(artifactId) {
  return axios.get(
    `http://127.0.0.1:8000/evaluation/api/?artifactID=${artifactId}`
  );
}

export const getEvaluation = (artifactId) => (dispatch) => {
  dispatch({ type: GET_EVALUATION_PENDING });

  return getEvaluationApi(artifactId)
    .then((response) => {
      dispatch({
        type: GET_EVALUATION_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_EVALUATION_FAILURE,
        payload: error,
      });
    });
};

// reducer
const initialState = {
  pending: false,
  error: false,
  data: {
    evaluation: null,
  },
};

export default handleActions(
  {
    [GET_EVALUATION_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_EVALUATION_SUCCESS]: (state, action) => {
      const evaluation = action.payload.data;

      return {
        ...state,
        pending: false,
        data: evaluation,
      };
    },
    [GET_EVALUATION_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
