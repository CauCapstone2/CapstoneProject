import axios from "axios";
import { handleActions } from "redux-actions";

//action type
const GET_POST_PENDING = "GET_POST_PENDING";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_FAILURE = "GET_POST_FAILURE";

// action creator
function getArtifactListApi() {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/list/`);
}

function getArtifactListPageApi(page) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/list/?page=${page}`);
}

export const getArtifactList = () => (dispatch) => {
  dispatch({ type: GET_POST_PENDING });

  return getArtifactListApi()
    .then((response) => {
      dispatch({
        type: GET_POST_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_POST_FAILURE,
        payload: error,
      });
    });
};

// reducer
const initialState = {
  pending: false,
  error: false,
  data: {
    artifacts: [],
    pagination: {
      count: 0,
      prev: null,
      next: null,
    },
  },
};

export default handleActions(
  {
    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_POST_SUCCESS]: (state, action) => {
      const { count, next, previous, results } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          artifacts: results,
          pagination: {
            count: count,
            prev: previous,
            next: next,
          },
        },
      };
    },
    [GET_POST_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
