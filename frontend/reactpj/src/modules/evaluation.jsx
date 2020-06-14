import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction } from "redux-actions";

function getEvaluationApi(artifactId) {
  return axios.get(
    `http://127.0.0.1:8000/evaluation/api/?artifactID=${artifactId}`
  );
}

function patchEvaluationApi(evaluationId, data) {
  return axios.patch(
    `http://127.0.0.1:8000/evaluation/api/${evaluationId}/`,
    data
  );
}

function postEvaluationAPi(data) {
  return axios.post("http://127.0.0.1:8000/evaluation/api/", data);
}

// action type
const GET_EVALUATION = "evaluation/GET_EVALUATION";
const PATCH_EVALUATION = "evaluation/PATCH_EVALUATION";
const POST_EVALUATION = "evaluation/POST_EVALUATION";

//action creator
export const getEvaluation = createAction(GET_EVALUATION, getEvaluationApi);
export const patchEvaluation = createAction(
  PATCH_EVALUATION,
  patchEvaluationApi
);
export const postEvaluation = createAction(POST_EVALUATION, postEvaluationAPi);

// reducer
const initialState = {
  data: null,
};

export default handleActions(
  {
    ...pender(
      {
        type: GET_EVALUATION,
        onSuccess: (state, action) => {
          const evaluation = action.payload.data;
          return {
            data: evaluation,
          };
        },
      },
      { type: PATCH_EVALUATION },
      { type: POST_EVALUATION }
    ),
  },
  initialState
);
