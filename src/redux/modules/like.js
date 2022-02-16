import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { likeApis, postApis } from "../../shared/api";

const SET_LIKE = "SET_LIKE";

const setLike = createAction(SET_LIKE, (post_id, nickname, is_like) => ({
  post_id,
  nickname,
  is_like,
}));

const initialState = {};

const likeDB = (post_id, nickname) => {
  return function (dispatch, getState, { history }) {
    likeApis
      .clickLike(post_id)
      .then((res) => {
        console.log(res.data.postResponseDto);
      })
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setLike,
  likeDB,
};
export { actionCreators };
