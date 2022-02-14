import React from "react";
import Card from "../components/Card";
import { CommentList, CommentWrite } from "../components";


const PostDetail = (props) => {
  return <React.Fragment>
    <Card/>
    <CommentWrite/>
    <CommentList>
    </CommentList>
  </React.Fragment>;
  
};

export default PostDetail;
