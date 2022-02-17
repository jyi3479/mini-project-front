import React from "react";
import { Grid, Image, Text } from "../elements";
import { CommentEdit } from ".";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as userActions } from "../redux/modules/user";

const CommentList = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();

  const comment_list = useSelector((state) => state.comment.list);

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(parseInt(post_id)));
  }, []);

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list.map((c) => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const login_user = localStorage.getItem("nickname");

  const {
    postId,
    commentId,
    username,
    nickname,
    comment,
    commentDate,
    userProfile,
  } = props;
  const deleteComment = () => {
    dispatch(commentActions.deleteCommentDB(parseInt(commentId)));
  };
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" src={userProfile} />
        <Text margin="5px" bold>
          {nickname}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 5px">
        <Text margin="0px">{comment}</Text>
        <Grid is_flex width="auto">
          <Text margin="5px">
            {commentDate?.split("T")[0]} &nbsp;
            {commentDate?.split("T")[1]?.split(".")[0]}
          </Text>
          {nickname === login_user && (
            <CommentEdit comment_id={commentId} post_id={postId} />
          )}
          {nickname === login_user && (
            <span style={{ margin: "5px" }} onClick={deleteComment}>
              삭제
            </span>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  postId: 1,
  commentId: 1,
  username: "zzz@zzz.com",
  nickname: "juyeong",
  comment: "멋있네요~!",
  commentDate: "2022-01-02",
};

export default CommentList;
