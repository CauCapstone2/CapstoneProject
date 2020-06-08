import * as actionTypes from "./actionTypes";

import axios from "axios";

function getPostAPI(postId) {
  return axios.get(`http://127.0.0.1:8000/artifacts/api/list/`);
}

export const getPost = (postId) => (dispatch) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: actionTypes.GET_POST_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getPostAPI(postId)
    .then((response) => {
      console.log(response);
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: actionTypes.GET_POST_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({
        type: actionTypes.GET_POST_FAILURE,
        payload: error,
      });
    });
};
