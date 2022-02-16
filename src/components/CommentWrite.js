import React, { useState } from "react";
import { Grid, Input, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user_info = useSelector((state) => state.user.user);

  const { post_id } = props;

  const addComment = () => {
    const comment_list = {
      // nickname: user_info.nickname,
      comment: comment,
    };
    console.log(post_id, comment_list);
    dispatch(commentActions.addCommentDB(parseInt(post_id), comment_list));
    setComment(""); // set 지워지니까 input의 value도 없어짐
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Grid is_flex padding="16px">
      <Input
        placeholder="댓글 내용을 입력해주세요 :)"
        _onChange={onChange}
        value={comment}
        onSubmit={addComment}
        is_submit
      />
      <Button
        width="50px"
        margin="0px 2px 0px 2px"
        _onClick={addComment}
        // _disabled={comment === "" ? true : false}
      >
        작성
      </Button>
    </Grid>
  );
};

export default CommentWrite;
