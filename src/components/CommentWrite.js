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
    console.log(post_id, user_info.nickname, comment);
    dispatch(
      commentActions.addCommentDB(
        parseInt(post_id),
        user_info.nickname,
        comment
      )
    );
    setComment(""); // set 지워지니까 input의 value도 없어짐
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Grid is_flex>
      <Grid width="100%">
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={comment}
          onSubmit={addComment}
          is_submit
        />
      </Grid>
      <Button
        width="50px"
        margin="0px 2px 14px 2px"
        _onClick={addComment}
        // _disabled={comment === "" ? true : false}
      >
        작성
      </Button>
    </Grid>
  );
};

export default CommentWrite;
