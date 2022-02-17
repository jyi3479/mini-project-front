import "./App.css";
import React from "react";
import {
  PostList,
  Login,
  Signup,
  PostWrite,
  PostEdit,
  PostDetail,
  MyPage,
} from "../pages";
import { Header } from "../components";
import { Grid, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Permit from "./Permit";
import Spinner from "./Spinner";

function App() {
  // const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.post.is_loaded);
  React.useEffect(() => {
    if (document.cookie) {
      dispatch(userActions.loginCheck());
    }
  }, []);
  return (
    <div className="App">
      <Grid padding="10px 60px 50px 60px">
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/detail/:postId" exact component={PostDetail} />
          <Route path="/edit/:postId" exact component={PostEdit} />
          <Route path="/mypage" exact component={MyPage} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          font_size="30px"
          width="50px"
          is_circle
          _onClick={() => {
            window.location.replace("/write");

            // history.push("/write");
          }}
        >
          +
        </Button>
      </Permit>
      {!is_loaded && <Spinner />}
    </div>
  );
}

export default App;
