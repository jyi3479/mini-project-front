import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { likeApis, postApis } from "../../shared/api";

const SET_LIKE = "SET_LIKE";

const setLike = createAction(SET_LIKE, (like_data) => ({
  like_data,
}));

const initialState = {
  list: {
    // postId: 0,
    // nickname: "juyeong",
    // likeCnt: 2,
    // islike: false,
  },
};

const likeDB = (post_id, nickname) => {
  return function (dispatch, getState, { history }) {
    const nick = {
      nickname: nickname,
    };
    likeApis
      .clickLike(post_id)
      .then((res) => {
        console.log(res.data);
        const like_res = res.data;
        const like_data = {
          postId: post_id,
          nickname: nickname,
          likeCnt: like_res.likeCnt,
          islike: like_res.islike,
        };
        dispatch(setLike(like_data));
      })
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.like_data;
      }),
  },
  initialState
);

const actionCreators = {
  setLike,
  likeDB,
};
export { actionCreators };
