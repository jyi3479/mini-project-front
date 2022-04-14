import React from "react";
import { Title, Text, Input, Grid, Button, Image } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/check";
import { Upload } from "../components";
import axios from "axios";
import { userApis } from "../shared/api";

const Signup = (props) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const idcheck = () => {
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    userApis
      .idcheck(id)
      .then((res) => {
        if (res.data === true) {
          alert("사용 가능한 아이디입니다!");
        }
      })
      .catch((err) => {
        console.log(err);

        alert("중복된 아이디가 존재합니다.");
      });
  };

  const nickcheck = () => {
    userApis
      .nickcheck(user_name)
      .then((res) => {
        if (res.data === true) {
          alert("사용 가능한 닉네임입니다!");
        }
      })
      .catch((err) => {
        console.log(err);

        alert("중복된 닉네임이 존재합니다.");
      });
  };

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

    dispatch(userActions.signupDB(id, pwd, pwd_check, user_name));
  };
  return (
    <Grid is_flex>
      <Grid padding="16px" width="50vw" margin="auto">
        <Grid center>
          <Text size="36px" bold>
            회원가입
          </Text>
        </Grid>

        {/* <Grid>
          <Text bold>프로필 사진</Text>
          <Grid>
            <Image
              half
              shape="circle"
              src={
                preview
                  ? preview
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAXVBMVEXv7+9mZmbs7OxfX1/39/d+fn6np6fX19fz8/POzs55eXlbW1uDg4PS0tJkZGRhYWFqamrn5+eLi4tWVlbh4eGUlJSqqqqhoaH7+/u+vr5vb2/Jycm/v7+Ojo6wsLDYus8vAAADXElEQVR4nO3b6XLiOhCGYWshtG0siWVCljNz/5c5LQhhiWAyFacO8rzPv2Bw1eeW1LIJTQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADcYMXKCKfRs4gd4TzfbT7MxzFUkFY6F3v3devYt2MMku/lZ6GbjWCR+uH+02ptR6mJLMY5z/eSbpQRKJq2itqOM99Ie39Ie4u91lUnmPZq1kmmFZHmSuDppZXN0G6ubIgnltbKZuvi2vzYSGlATyytn3frZFIMaVMq7sTSNj+jCSlq3lVT+MS00srcGZNCSsa4eeH4xNI+uxQ1qta3f55+bZ9dfNGwOpLjP5B23ufK5rjrtnC86rTiP7y0iPu0oZtWB7LWv66WFyuvH2La5Q2vpVgVp/Wvyc2Wl28dOuN699L6afVbaVN86WcXoazY/349vi7FyuWFaCpOK63J3SZ254+areb1XrfJxTuhWtP6IUQTc9zZ6cv27W7A7p6V7+prT26IKk0rw9vau1t9S5tEtRvOZ3d/daaVoQ+HtMl11743kW0n9ddW2vAeVjeJujIXM/itc4s8pt9fqTGtNtWYjrUtxc3zVx7WenOwypU91LfCtNp6jpXdi7O8zThZh2VpZRvy3Har/PfbgerSWhlMNJfiru+edZ0HF0Me5+uf9n2pri6tb81lZQ9xT3usf3RBB7ne2afdYN5/vLa0MiQX0se0eWU+dCLJq3EurDbkoIl1MNva0tpcOh3GpcruqtsdMlldjU/fFsLK79eputLqpuLjnD1w3X52Wvu07c/f5xa+vrR+cLEwio/V3Rc3h81z9jjMjVlIPlRTWtGw17O+x9VNRZ7Zx+uSH7m6RS58NWlz67md1bz13e2Hqa25damSmtLqLd4f0+oEXe777KWQd1X1fKPp2+RuzNlDFcNLviShlDeumlUlaeeD3rxfaz5nY1ZbbGEQpD7F+GPRz+8/re/MQxfMrfX4mLYs5EsVQ6ygtr5zn5izn1FDWulKm8Wppn3qPjGIJ5NW5+1ISHtv/r20I0zcVEva3sWv/3uynmJdQdrm18Moto/bzf8d5RPEy5MfQeEL3/sjdpxfP4zzY4zvZhu7zE8Uv2pZ/uYPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7/0G6cMyGr/MjwcAAAAASUVORK5CYII="
              }
            />
            <Upload />
          </Grid>
        </Grid> */}

        <Grid is_flex>
          <Grid width="100%">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요"
              value={id}
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>
          <Button width="8vw" _disabled={id === "" ? true : false} margin="8px 0px 0px 4px" _onClick={idcheck}>
            중복확인
          </Button>
        </Grid>
        <Grid is_flex>
          <Grid width="100%">
            <Input
              label="닉네임"
              placeholder="닉네임를 입력해주세요"
              value={user_name}
              _onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Grid>
          <Button width="8vw" _disabled={user_name === "" ? true : false} margin="8px 0px 0px 4px" _onClick={nickcheck}>
            중복확인
          </Button>
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
            _disabled={id === "" || pwd === "" || user_name === "" ? true : false}
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
