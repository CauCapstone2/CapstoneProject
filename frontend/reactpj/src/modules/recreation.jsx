import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction } from "redux-actions";

function getRecreationApi(artifactId) {
  return axios.get(`http://3.34.190.67/recreate/?artifactID=${artifactId}`);
}

// action type
const GET_RECREATION = "recreation/GET_RECREATION";

// action creator
export const getRecreation = createAction(GET_RECREATION, getRecreationApi);

// reducer
const initialState = { data: null };

export default handleActions(
  {
    ...pender({
      type: GET_RECREATION,
      onSuccess: (state, action) => {
        const recreation = action.payload.data;
        return {
          data: recreation,
        };
      },
    }),
  },
  initialState
);
