import axios from "axios";
import { handleActions } from "redux-actions";

//action type
const GET_ARTIFACTDETAIL_PENDING = "artifactdetail/GET_ARTIFACTDETAIL_PENDING";
const GET_ARTIFACTDETAIL_SUCCESS = "artifactdetail/GET_ARTIFACTDETAIL_SUCCESS";
const GET_ARTIFACTDETAIL_FAILURE = "artifactdetail/GET_ARTIFACTDETAIL_FAILURE";
const GET_EVALUATION_PENDING = "artifactdetail/GET_EVALUATION_PENDING";
const GET_EVALUATION_SUCCESS = "artifactdetail/GET_EVALUATION_SUCCESS";

//action creator
function getArtifactDetailApi(artifactId) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/detail/${artifactId}`);
}

export const getArtifactDetail = (artifactId) => (dispatch) => {
  dispatch({ type: GET_ARTIFACTDETAIL_PENDING });

  return getArtifactDetailApi(artifactId)
    .then((response) => {
      dispatch({
        type: GET_ARTIFACTDETAIL_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ARTIFACTDETAIL_FAILURE,
        payload: error,
      });
    });
};

// reducer
const initialState = {
  pending: false,
  error: false,
  data: {
    artifact: null,
  },
};

export default handleActions(
  {
    [GET_ARTIFACTDETAIL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_ARTIFACTDETAIL_SUCCESS]: (state, action) => {
      const artifact = action.payload.data;

      return {
        ...state,
        pending: false,
        data: artifact,
      };
    },
    [GET_ARTIFACTDETAIL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
