import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction } from "redux-actions";

function getSimilarImageApi(imageId) {
  return axios.get(`http://127.0.0.1:8000/similar-image/?imageId=${imageId}`);
}

// action type
const GET_SIMILARIMAGE = "similarimage/GET_SIMILARIMAGE";

//action creator
export const getSimilarImage = createAction(
  GET_SIMILARIMAGE,
  getSimilarImageApi
);

// reducer
const initailState = {
  data: null,
};

export default handleActions(
  {
    ...pender({
      type: GET_SIMILARIMAGE,
      onSuccess: (state, action) => {
        const similarImage = action.payload.data;
        return {
          data: similarImage,
        };
      },
    }),
  },
  initailState
);
