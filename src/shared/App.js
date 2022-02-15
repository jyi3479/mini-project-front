import "./App.css";
import React from "react";
import { PostList, Login, Signup, PostWrite, PostEdit } from "../pages";
import { Header } from "../components";
import { Grid, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
  // const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (document.cookie) dispatch(userActions.loginCheck());
  }, []);
  return (
    <div className="App">
      <Grid padding="10px 30px">
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/edit/:postId" exact component={PostEdit} />
        </ConnectedRouter>
      </Grid>
      {/* {is_login && ( */}
      <Button
        font_size="30px"
        width="50px"
        is_circle
        _onClick={() => {
          history.push("/write");
        }}
      >
        +
      </Button>
      {/* )} */}
    </div>
  );
}

export default App;
