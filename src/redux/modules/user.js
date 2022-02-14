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
// 내가 따로 쿠키 저장하는 함수
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(setUser(user));
    history.push("/");
  };
};

const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    userApis
      .login(id, pwd)
      .then((res) => {
        console.log("post response", res);
        // console.log(res.headers.get("set-cookie"));
        // const token = res.headers["authorization"];
        // setCookie("is_login", `${token}`);
        // setAuth(token);
        // document.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const signupDB = (id, pwd, pwdcheck, nickname) => {
  return function (dispatch, getState, { history }) {
    userApis
      .signup(id, pwd, pwdcheck, nickname)
      .then((res) => console.log(res, "회원가입 성공"))
      .catch((error) => console.log(error));
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
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
  getUser,
  logOut,
  loginAction,
  loginDB,
  signupDB,
};
export { actionCreators };
