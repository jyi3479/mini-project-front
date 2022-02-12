import React from "react";
import { Title, Text, Input, Grid, Button } from "../elements";

// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/check";

const Signup = (props) => {
  //   const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    // 이메일 형식 체크
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    // 비밀번호 체크
    if (pwd !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }

    // dispatch(userActions.signupFB(id, pwd, user_name));
  };
  return (
    <Grid is_flex>
      <Grid padding="16px" width="50vw" margin="auto">
        <Grid center>
          <Text size="36px" bold>
            회원가입
          </Text>
        </Grid>
        <Grid>
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            value={id}
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Input
            label="닉네임"
            placeholder="닉네임를 입력해주세요"
            value={user_name}
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Input
            label="비밀번호"
            placeholder="비민번호를 입력해주세요"
            value={pwd}
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            value={pwd_check}
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>
        <Grid is_flex>
          <Button
            width="20vw"
            margin="30px auto"
            _onClick={() => {
              signup();
            }}
            _disabled={
              id === "" || pwd === "" || user_name === "" || pwd_check === ""
                ? true
                : false
            }
          >
            회원가입하기
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

Signup.defaultProps = {};

export default Signup;
