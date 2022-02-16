import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { commentApis } from "../../shared/api";
// import firebase from "firebase/app";
// import { firestore, realtime } from "../../shared/firebase";
// import moment from "moment";
// import { actionCreators as postActions } from "./post";

//action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

//action creators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

//initialState
const initialState = {
  list: {},
};

//middleware
const getcommentDB = (post_id) => {
  return function (dispatch, getState, { history }) {
    commentApis.getPost(post_id).then((res) => {
      console.log(res.data);
      // let comment_list = res.data.commentResponseDto;
      // dispatch(setComment(post_id, comment_list));
    });
  };
};

const addcommentDB = (post_id, comment) => {
  return function (dispatch, getState, { history }) {
    console.log(post_id, comment);
    commentApis
      .createComment(post_id, comment)
      .then((res) => {
        console.log(res);
        // dispatch(addComment(post_id, comment));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("작성에 실패했어요!");
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
        console.log(action.payload.comment_list);
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  getcommentDB,
  addcommentDB,
};

export { actionCreators };
