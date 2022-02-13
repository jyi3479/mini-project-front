import axios from "axios";

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  // baseURL: "http://13.125.207.144",
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    accept: "*/*",
    // "content-type": "application/json;charset=UTF-8",
    // accept: "application/json",
    //로그인 후에는 토큰도 headers에 담아서 건내줘야한다.
  },
});

// instance.interceptors.request.use(function (config) {
//   const accessToken = document.cookie.split("=")[1];
//   config.headers.common["authorization"] = `${accessToken}`;
//   return config;
// });

export const userApis = {
  // 게시물 불러오기
  login: (id, pwd) =>
    instance.post("/user/login", { username: id, password: pwd }),
  // 로그인 요청
  signup: (id, pwd, pwdcheck, nickname) =>
    instance.post("/user/signup", {
      username: id,
      password: pwd,
      passwordcheck: pwdcheck,
      nickname: nickname,
    }),
  // 회원가입 요청
};

// export const postApis = {
//     // 게시물 불러오기
//     getPost: () => instance.get("/posts"),
//     // 게시물 작성하기
//     createPost: (contents) => instance.post("/posts", contents),
//     // 게시물 수정하기
//     editPost: (id, content) => instance.put(`/posts/${id}`, content),
//     // 게시물 삭제하기
//     delPost: (id) => instance.delete(`/posts/${id}`),
//   };

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
