import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "./Cookie";

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
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
  // config.headers.common["authorization"] = `${accessToken}`;
  return config;
});

export const userApis = {
  // 로그인 요청
  login: (id, pwd) =>
    instance.post("/user/login", { username: id, password: pwd }),
  // 회원가입 요청
  signup: (id, pwd, pwdcheck, nickname, profile) =>
    instance.post("/user/signup", {
      user_profile: profile,
      username: id,
      password: pwd,
      passwordcheck: pwdcheck,
      nickname: nickname,
    }),
  userInfo: () => instance.get(`/user/loginInfo`),

  idcheck: (id) => instance.post(`/user/idcheck`, { username: id }),
  nickcheck: (nickname) =>
    instance.post(`/user/nicknamecheck`, { nickname: nickname }),

  // userInfo: (token) =>
  //   instance.post(`/user/userinfo`, {
  //     authorization: token,
  //   }),
  // signup: (id, pwd, pwdcheck, nickname) =>
  //   instance.post("/user/signup", {
  //     username: id,
  //     password: pwd,
  //     passwordcheck: pwdcheck,
  //     nickname: nickname,
  //   }),
};

export const postApis = {
  // 게시물 불러오기
  getPost: (type) => instance.get(`/post?postType=${type}`),
  // 게시글 상세 조회
  detailPost: (id) => instance.get(`/post/${id}`),
  // 게시물 작성하기
  createPost: (content) => instance.post("/post", content),
  // 게시물 수정하기
  editPost: (id, content) => instance.put(`/post/${id}`, content),
  // 게시물 삭제하기
  deletePost: (id) => instance.delete(`/post/${id}`),
};

export const commentApis = {
  // 게시물 불러오기
  getComment: (post_id) => instance.get(`/comment/${post_id}`),
  // 게시물 작성하기
  createComment: (post_id, comment) =>
    instance.post(`/comment/${post_id}`, comment),
  // 게시물 수정하기
  editComment: (comment_id, comment) =>
    instance.put(`/comment/${comment_id}`, comment),
  // 게시물 삭제하기
  deleteComment: (comment_id) => instance.delete(`/comment/${comment_id}`),
};

export const likeApis = {
  clickLike: (post_id) => instance.post(`/like/${post_id}`),
};

// export const mypageApis = {
//   mypost:
// }

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
