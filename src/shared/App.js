import "./App.css";
import React from "react";
import { PostList } from "../pages";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={PostList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
