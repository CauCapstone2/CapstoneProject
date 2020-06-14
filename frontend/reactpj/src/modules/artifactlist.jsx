import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction } from "redux-actions";

function getArtifactListApi(page) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/list/?page=${page}`);
}

//action type
const GET_ARTIFACTLIST = "artifactlist/GET_ARTIFACTLIST";

// action creator
export const getArtifactList = createAction(
  GET_ARTIFACTLIST,
  getArtifactListApi
);

// reducer
const initialState = {
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
  },
  initialState
);
