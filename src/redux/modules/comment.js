import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { commentApis } from "../../shared/api";
import { useSelector } from "react-redux";
// import firebase from "firebase/app";
// import { firestore, realtime } from "../../shared/firebase";
// import moment from "moment";
import { actionCreators as postActions } from "./post";

//action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMETN";
const DELETE_COMMENT = "DELETE_COMMENT";

//action creators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const editComment = createAction(EDIT_COMMENT, (commentId, comment) => ({
  commentId,
  comment,
}));

const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));

//initialState
const initialState = {
  list: [
    // {
    //   postId: 1,
    //   commentId: 1,
    //   username: "zzz@zzz.com",
    //   nickname: "juyeong",
    //   comment: "멋있네요~!",
    //   commentDate: "2022-01-02",
    // },
    // {
    //   postId: 1,
    //   commentId: 2,
    //   username: "zzz@zzz.com",
    //   nickname: "sdf",
    //   comment: "멋있네요~!",
    //   commentDate: "2022-01-02",
    // },
  ],
};

//middleware
const getCommentDB = (post_id) => {
  return function (dispatch, getState, { history }) {
    commentApis
      .getComment(post_id)
      .then((res) => {
        console.log(res.data);
        let comment_list = res.data;
        dispatch(setComment(post_id, comment_list));
      })
      .catch((err) => {
        console.log(err);
        alert("댓글 불러오기 실패");
      });
  };
};

const addCommentDB = (post_id, nickname, comment) => {
  return function (dispatch, getState, { history }) {
    console.log(post_id, comment);
    const user_profile = getState().user.user.user_profile;
    console.log(user_profile);
    const _comment = {
      comment: comment,
    };
    const comment_data = {
      userProfile: user_profile,
      comment: comment,
      nickname: nickname,
      commentDate: moment().format("YYYY-MM-DD kk:mm:ss"),
    };
    const post = getState().post.list.find(
      (l) => l.postId === parseInt(post_id)
    );
    console.log(post);
    commentApis
      .createComment(post_id, _comment)
      .then((res) => {
        console.log(res);
        dispatch(addComment(post_id, comment_data));

        // dispatch(
        //   postActions.editPost(post_id, {
        //     commentCnt: parseInt(post.commentCnt) + 1,
        //   })
        // );
      })
      .catch((err) => {
        console.log(err);
        alert("작성에 실패했어요!");
      });
  };
};

const editCommentDB = (comment_id = null, post_id, comment = {}) => {
  return function (dispatch, getState, { history }) {
    if (!comment_id) {
      console.log("댓글 정보가 없어요!");
      alert("댓글 정보가 없어요!");
      return;
    }
    console.log(comment_id, comment);
    commentApis
      .editComment(comment_id, comment)
      .then((res) => {
        console.log(res);
        dispatch(editComment(comment_id, comment));
        // history.push(`/detail/${post_id}`);
      })
      .catch((err) => {
        console.log(err);
        alert("수정에 실패했어요!");
      });
  };
};

const deleteCommentDB = (comment_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!comment_id) {
      console.log("댓글 정보가 없어요!");
      alert("댓글 정보가 없어요!");
      return;
    }
    console.log(comment_id);
    commentApis
      .deleteComment(comment_id)
      .then((res) => {
        console.log(res);
        dispatch(deleteComment(comment_id));
      })
      .catch((err) => {
        console.log(err);
        alert("삭제에 실패했어요!");
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
        console.log(action.payload.comment_list);
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.commentId === action.payload.commentId
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.comment };
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.commentId === action.payload.commentId
        );
        draft.list.splice(idx, 1); //삭제할 게시글의 index를 찾아서 splice로 지운다.
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  getCommentDB,
  addCommentDB,
  editCommentDB,
  deleteCommentDB,
};

export { actionCreators };
