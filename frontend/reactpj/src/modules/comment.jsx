import axios from "axios";
import { pender } from "redux-pender";
import { handleActions, createAction } from "redux-actions";

function getCommentApi(artifactId) {
  return axios.get(
    `http://127.0.0.1:8000/comments/api/?artifactID=${artifactId}`
  );
}

function postCommentApi(data) {
  return axios.post("http://127.0.0.1:8000/comments/api/", data);
}

function deleteCommentApi(commentId) {
  return axios.delete(`http://127.0.0.1:8000/comments/api/${commentId}`);
}

// action type
const GET_COMMENT = "comment/GET_COMMENT";
const POST_COMMENT = "comment/POST_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

// action creator
export const getComment = createAction(GET_COMMENT, getCommentApi);
export const postComment = createAction(POST_COMMENT, postCommentApi);
export const deleteComment = createAction(DELETE_COMMENT, deleteCommentApi);

// reducer
const initialState = {
  data: null,
};

export default handleActions(
  {
    ...pender(
      {
        type: GET_COMMENT,
        onSuccess: (state, action) => {
          const comment = action.payload.data;
          comment.forEach((element) => {
            element.date = element.date.split(".")[0];
            element.date = element.date.replace("T", " ");
            element.date = element.date.replace("Z", " ");
          });
          return {
            data: comment,
          };
        },
      },
      { type: POST_COMMENT },
      { type: DELETE_COMMENT }
    ),
  },
  initialState
);
