import React from "react";
import { Title, Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/check";

import { KAKAO_AUTH_URL } from "../shared/KakaoAuth";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    // 이메일 형식 체크
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    console.log(id, pwd);
    dispatch(userActions.loginDB(id, pwd));
  };

  const kakaoAuth = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Grid is_flex>
      <Grid padding="15px" width="50vw" margin="auto">
        <Grid center>
          <Text size="36px" bold>
            로그인
          </Text>
        </Grid>
        <Grid>
          <Input
            value={id}
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Input
            value={pwd}
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            is_submit
            _onSubmit={login}
          />
        </Grid>

        <Grid is_flex>
          <Button
            width="20vw"
            margin="30px auto"
            _onClick={() => {
              login();
            }}
            _disabled={id === "" || pwd === "" ? true : false}
          >
            로그인하기
          </Button>
          <Button _onClick={kakaoAuth}>카카오로그인</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
