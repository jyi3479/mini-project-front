import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import { getCookie } from "./Cookie";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://13.125.207.144:8080",
  withCredentials: true,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // token: token,
  },
});

instance.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["authorization"] = `BEARER ${accessToken}`;
  return config;
});

export const userApis = {
  // 게시물 불러오기
  login: (id, pwd) =>
    instance.post("/user/login", { username: id, password: pwd }),
  // 로그인 요청
  signup: (id, pwd, nickname) =>
    instance.post("/user/signup", {
      username: id,
      password: pwd,
      // passwordcheck: pwdcheck,
      nickname: nickname,
    }),
  userInfo: (token) =>
    instance.post(`/user/userinfo`, {
      authorization: token,
    }),
  // signup: (id, pwd, pwdcheck, nickname) =>
  //   instance.post("/user/signup", {
  //     username: id,
  //     password: pwd,
  //     passwordcheck: pwdcheck,
  //     nickname: nickname,
  //   }),

  // 회원가입 요청
};

export const postApis = {
  // 게시물 불러오기
  getPost: () => instance.get("/post?postType=like"),
  // 게시물 작성하기
  createPost: (content) => instance.post("/post", content),
  // 게시물 수정하기
  editPost: (id, content) => instance.put(`/posts/${id}`, content),
  // 게시물 삭제하기
  delPost: (id) => instance.delete(`/posts/${id}`),
};

//   export const commentApis = {
//     // 게시물 불러오기
//     getPost: () => instance.get("/posts"),
//     // 게시물 작성하기
//     createPost: (contents) => instance.post("/posts", contents),
//     // 게시물 수정하기
//     editPost: (id, content) => instance.put(`/posts/${id}`, content),
//     // 게시물 삭제하기
//     delPost: (id) => instance.delete(`/posts/${id}`),
//   };

//   export const likeApis = {
//     // 게시물 불러오기
//     getPost: () => instance.get("/posts"),
//     // 게시물 작성하기
//     createPost: (contents) => instance.post("/posts", contents),
//     // 게시물 수정하기
//     editPost: (id, content) => instance.put(`/posts/${id}`, content),
//     // 게시물 삭제하기
//     delPost: (id) => instance.delete(`/posts/${id}`),
//   };
