import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { userApis } from "../../shared/api";
import { setAuth } from "../../shared/setAuth";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { responseInterceptor } from "http-proxy-middleware";

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

// const kakaoLogin = (code) => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .get(`http://13.125.207.144:8080/oauth/callback/kakao?code=${code}`, {
//         withCredentials: true,
//       })

//       .then((res) => {
//         console.log(res); // 토큰이 넘어올 것임

//         // const ACCESS_TOKEN = res.data.accessToken;

//         // localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

//         // history.replace("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
//       })
//       .catch((err) => {
//         console.log("소셜로그인 에러", err);
//         window.alert("로그인에 실패하였습니다.");
//         history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
//       });
//   };
// };

// middleware actions
// 내가 따로 쿠키 저장하는 함수
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(setUser(user));
    // history.push("/");
  };
};

const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    userApis
      .login(id, pwd)
      .then((res) => {
        console.log(res);
        // setCookie("token", res.headers["authorization"], 1);
        // const token = res.headers["authorization"];
        // localStorage.setItem("authorization", token);
        // dispatch(setUser({ token: id }));

        // userApis
        //   .userInfo(res.headers["authorization"])
        //   .then((res) =>
        //     dispatch(
        //       setUser({
        //         email: res.data.username,
        //         nickname: res.data.nickname,
        //         token: token,
        //       })
        //     )
        //   )
        //   .catch((error) => console.log(error));
        history.push("/");
        // dispatch(userInfo(res.headers["authorization"], id, pwd));
      })
      .catch((error) => alert("회원정보가 일치하지 않습니다."));
    // apis
    //   .login(id, pwd)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  };
};

const signupDB = (id, pwd, nickname) => {
  return function (dispatch, getState, { history }) {
    userApis
      .signup(id, pwd, nickname)
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
