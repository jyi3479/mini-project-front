import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { userApis } from "../../shared/api";
import { setAuth } from "../../shared/setAuth";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    userApis
      .userInfo()
      .then((res) => {
        console.log(res.data);
        dispatch(
          setUser({
            username: res.data.username,
            nickname: res.data.nickname,
            user_profile: res.data.user_profile,
          })
        );
      })
      .catch((err) => {
        console.log("유저정보를 가져오지 못했어요");
      });
  };
};

const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    userApis
      .login(id, pwd)
      .then((res) => {
        console.log(res);
        const user_data = res.data;
        setCookie("token", user_data.token);
        localStorage.setItem("nickname", res.data.nickname);

        dispatch(
          setUser({
            id: id,
            password: pwd,
            username: res.data.username,
            nickname: res.data.nickname,
          })
        );
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        alert("회원정보가 일치하지 않습니다. 회원가입을 해주세요");
      });
    // apis
    //   .login(id, pwd)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  };
};

const logoutAction = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    localStorage.removeItem("nickname");
    dispatch(logOut());
    history.push("/login");
  };
};

const signupDB = (id, pwd, nickname) => {
  return function (dispatch, getState, { history }) {
    userApis
      .signup(id, pwd, nickname)
      .then((res) => console.log(res, "회원가입 성공"))
      .catch((error) => console.log(error));
    history.push("/login");
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        // console.log(getCookie("is_login"));
      }),
  },
  initialState
);

const actionCreators = {
  loginCheck,
  logoutAction,
  getUser,
  logOut,
  loginDB,
  signupDB,
};
export { actionCreators };
