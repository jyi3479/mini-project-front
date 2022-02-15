import React from "react";
import Card from "../components/Card";
import { CommentList, CommentWrite } from "../components";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";

const PostDetail = (props) => {
  const params = useParams();
  const post_index = params.index;
  const post_list = useSelector((state) => state.post.list);

  console.log(post_list);
  console.log(post_index);
  console.log(post_list[post_index])
  return <React.Fragment>
    <Card>
        <div className="Title" style={{fontSize:"20px", padding:"16px"}}>
           제목: {post_list[post_index]}  닉네임(nickname): {post_list[post_index]}
         </div>
         <div className="Location" style={{fontSize:"20px", padding:"16px"}}>
            나라(country)/도시(city): {post_list[post_index]} / {post_list[post_index]}
         </div>
         <div className="Evaluation" style={{fontSize:"20px", padding:"16px"}}>
            평가: {post_list[post_index]}
         </div>
         <div className="Review" style={{fontSize:"20px", padding:"16px"}}>
           후기: {post_list[post_index]}
         </div>
         </Card>
    <CommentWrite/>
    <CommentList>
    </CommentList>
  </React.Fragment>;
  
};

export default PostDetail;
