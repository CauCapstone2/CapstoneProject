import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction } from "redux-actions";

function getArtifactDetailApi(artifactId) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/detail/${artifactId}`);
}

//action type
const GET_ARTIFACTDETAIL = "artifactdetail/GET_ARTIFACTDETAIL";

//action creator
export const getArtifactDetail = createAction(
  GET_ARTIFACTDETAIL,
  getArtifactDetailApi
);

// reducer
const initialState = {
  data: {
    artifact: null,
  },
};

export default handleActions(
  {
    ...pender({
      type: GET_ARTIFACTDETAIL,
      onSuccess: (state, action) => {
        const artifact = action.payload.data;
        return {
          data: artifact,
        };
      },
    }),
  },
  initialState
);