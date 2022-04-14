import React, { useState } from "react";
import { Grid, Input, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [comment, setComment] = useState("");

  const addComment = () => {
    console.log(post_id, user_info.nickname, comment);
    dispatch(commentActions.addCommentDB(parseInt(post_id), user_info.nickname, comment));
    setComment("");
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Grid is_flex>
      <Grid width="100%">
        <Input placeholder="댓글 내용을 입력해주세요 :)" _onChange={onChange} value={comment} onSubmit={addComment} is_submit />
      </Grid>
      <Button width="50px" margin="0px 2px 14px 2px" _onClick={addComment}>
        작성
      </Button>
    </Grid>
  );
};

export default CommentWrite;
