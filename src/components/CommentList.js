import React from "react";
import { Grid, Image, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.lsit);

  const { post_id } = props;

  // React.useEffect(() => {
  //   dispatch(commentActions.getCommentDB(post_id));
  // }, []);

  return <React.Fragment>댓글 리스트</React.Fragment>;
};

const CommentItem = (props) => {
  // const { user_name, comment, user_profile, insert_dt } = props;
  return (
    <Grid is_flex padding="16px">
      {/* <Image shape="circle" src={user_profile} /> */}
      {/* <Text>{props.nickname}</Text>
      <Text>{props.comment}</Text>
      <Text>{props.commentDate}</Text> */}
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "juyeong",
  user_id: "",
  post_id: 1,
  insert_dt: "2021-01-01 10:00:00",
  contents: "우와 라이언이다!",
};

export default CommentList;
