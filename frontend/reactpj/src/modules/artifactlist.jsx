import axios from "axios";
import { handleActions } from "redux-actions";

//action type
const GET_ARTIFACTLIST_PENDING = "artifactlist/GET_ARTIFACTLIST_PENDING";
const GET_ARTIFACTLIST_SUCCESS = "artifactlist/GET_ARTIFACTLIST_SUCCESS";
const GET_ARTIFACTLIST_FAILURE = "artifactlist/GET_ARTIFACTLIST_FAILURE";

// action creator
function getArtifactListApi(page) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/list/?page=${page}`);
}

export const getArtifactList = (page) => (dispatch) => {
  dispatch({ type: GET_ARTIFACTLIST_PENDING });

  return getArtifactListApi(page)
    .then((response) => {
      dispatch({
        type: GET_ARTIFACTLIST_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ARTIFACTLIST_FAILURE,
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
    [GET_ARTIFACTLIST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_ARTIFACTLIST_SUCCESS]: (state, action) => {
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
    [GET_ARTIFACTLIST_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
