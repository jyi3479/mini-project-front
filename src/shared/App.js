import "./App.css";
import React from "react";
import { PostList, Login, Signup, PostWrite } from "../pages";
import { Header } from "../components";
import { Grid, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
  // const is_login = useSelector((state) => state.user.is_login);
  return (
    <div className="App">
      <Grid padding="10px 30px">
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/post" exact component={PostWrite} />
        </ConnectedRouter>
      </Grid>
      {/* {is_login && ( */}
      <Button
        font_size="30px"
        width="50px"
        is_circle
        _onClick={() => {
          history.push("/post");
        }}
      >
        +
      </Button>
      {/* )} */}
    </div>
  );
}

export default App;
