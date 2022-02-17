import React from "react";
import logo from "../images/logo.png";
import { Grid, Text, Button, Image } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const nickname = localStorage.getItem("nickname");
  const is_login = useSelector((state) => state.user.is_login);
  if (document.cookie) {
    return (
      <Grid center>
        <div style={{ position: "fixed", top: 10, right: 15 }}>
          <Grid is_flex>
            <Text margin="0px 10px">
              <span style={{ fontWeight: "bold" }}>{nickname}</span>님
              환영합니다
            </Text>

            <Button
              width="60px"
              padding="7px"
              bg="#61b165"
              margin="0px 10px 0px 0px"
            >
              내정보
            </Button>

            <Button
              width="70px"
              padding="7px"
              bg="#92969a"
              _onClick={() => {
                dispatch(userActions.logoutAction());
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </div>
        <Grid
          _onClick={() => {
            history.push("/");
          }}
        >
          <Logo src={logo} alt="Logo" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid center>
      <div style={{ position: "fixed", top: 10, right: 15 }}>
        <Grid is_flex>
          <Button
            width="60px"
            padding="7px"
            bg="#61b165"
            margin="0px 10px 0px 0px"
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>

          <Button
            width="70px"
            padding="7px"
            bg="#92969a"
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </Grid>
      </div>

      <Text margin="0px" size="36px" bold>
        <Grid
          _onClick={() => {
            history.push("/");
          }}
        >
          <Logo src={logo} alt="Logo" />
        </Grid>
      </Text>
    </Grid>
  );
};

Header.defaultProps = {};

const HeaderBar = styled.header`
  height: 75px;
  padding: 1rem;
  color: white;
  background: teal;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  width: 258px;
  height: 150px;
`;

export default Header;
