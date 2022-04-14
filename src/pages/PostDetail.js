import React from "react";
import Card from "../components/Card";
import { Grid, Text, Button } from "../elements";
import { CommentList, CommentWrite } from "../components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/post";
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const post_index = parseInt(params.postId);

  const post = useSelector((state) => state.post.target);
  const login_user = localStorage.getItem("nickname");

  React.useEffect(() => {
    dispatch(postActions.getDetailDB(post_index));
  }, []);

  if (!document.cookie) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 볼 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <Grid width="80vw" margin="auto">
      {post && <Card {...post} is_me={post.nickname === login_user ? true : false} post_id={post_index} />}

      <Permit>
        <CommentWrite post_id={post_index} />
      </Permit>
      <CommentList post_id={post_index} />
    </Grid>
  );
};

export default PostDetail;
