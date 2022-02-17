import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { mypageApis } from "../../shared/api";

const SET_MYPOST = "SET_MYPOST";

const setMyPost = createAction(SET_MYPOST, (my_post) => ({
  my_post,
}));

const initialState = {
  list: {
    // postId: 0,
    // nickname: "juyeong",
    // likeCnt: 2,
    // islike: false,
  },
};

const myPostDB = () => {
  return function (dispatch, getState, { history }) {
    mypageApis
      .mypost()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [SET_MYPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.my_post;
      }),
  },
  initialState
);

const actionCreators = {
  myPostDB,
};
export { actionCreators };
