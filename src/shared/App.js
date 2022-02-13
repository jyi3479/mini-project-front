import "./App.css";
import React from "react";
import { PostList, Login, Signup, PostDetail } from "../pages";
import { Header } from "../components";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/detail" exact component={PostDetail} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
