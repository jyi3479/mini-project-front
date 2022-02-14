import React from "react";
import axios from "axios";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

// const KakaoAuthHandle = (props) => {
//     useEffect(() => {
//       let code = new URL(window.location.href).searchParams.get('code')
//       const kakaoLogin = async () => {
//         await axios
//           .get(`http://3.36.100.253/user/kakao/callback?code=${code}`)
//           .then((res) => {
//             sessionStorage.setItem('x_auth', res.headers.authorization)
//             props.history.replace('/')
//           })
//       }
//       kakaoLogin()
//     }, [props.history])
const Kakao = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code));
  }, []);

  return <div>카카오 로그인 성공</div>;
};

export default Kakao;
