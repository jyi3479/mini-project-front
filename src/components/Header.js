import React from "react";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

const Header = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex padding="5px 16px 50px 16px">
        <Grid
          _onClick={() => {
            history.push("/");
          }}
        >
          <Text margin="0px" size="36px" bold>
            Logo
          </Text>
        </Grid>

        <Grid is_flex width="auto">
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
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
