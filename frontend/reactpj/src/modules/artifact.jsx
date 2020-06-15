import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction, createActions } from "redux-actions";

function getArtifactListApi(page) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/list/?page=${page}`);
}

function getArtifactDetailApi(artifactId) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/detail/${artifactId}`);
}

function deleteArtifactApi(artifactId) {
  return axios.delete(`http://127.0.0.1:8000/artifacts/api/${artifactId}`);
}

//action type
const GET_ARTIFACTLIST = "artifact/GET_ARTIFACTLIST";
const GET_ARTIFACTDETAIL = "artifact/GET_ARTIFACTDETAIL";
const DELETE_ARTIFACT = "artifact/DELETE_ARTIFACT";

// action creator
export const getArtifactList = createAction(
  GET_ARTIFACTLIST,
  getArtifactListApi
);
export const getArtifactDetail = createAction(
  GET_ARTIFACTDETAIL,
  getArtifactDetailApi
);
export const deleteArtifact = createAction(DELETE_ARTIFACT, deleteArtifactApi);

// reducer
const initialState = {
  data: null,
};

export default handleActions(
  {
    ...pender({
      type: GET_ARTIFACTLIST,
      onSuccess: (state, action) => {
        const { count, next, previous, results } = action.payload.data;
        return {
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
    }),
    ...pender({
      type: GET_ARTIFACTDETAIL,
      onSuccess: (state, action) => {
        const artifact = action.payload.data;
        return {
          data: artifact,
        };
      },
    }),
    ...pender({ type: DELETE_ARTIFACT }),
  },
  initialState
);
