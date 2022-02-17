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
  console.log(post_index);
  // const post_list = useSelector((state) => state.post.list);
  // // 상세페이지 조회 이따가 해보기. 서버랑 연결.
  // const post_idx = post_list.findIndex(
  //   (p) => p.postId === parseInt(post_index)
  // );
  // const post = post_list[post_idx];
  // console.log(post);

  const post = useSelector((state) => state.post.target);
  const login_user = localStorage.getItem("nickname");
  console.log(post.nickname, login_user);

  React.useEffect(() => {
    // if (document.cookie) dispatch(userActions.loginCheck());
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
            // push는 메인페이지 이동해도 뒤로가기 하면 write 페이지 나올 수 있다.
            // replace는 페이지를 교체해주는 것이기 때문에 메인페이지로 이동해도 뒤로가기 누르면 write 페이지 안나온다.
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
      {post && (
        <Card
          {...post}
          is_me={post.nickname === login_user ? true : false}
          post_id={post_index}
        />
      )}

      <Permit>
        <CommentWrite post_id={post_index} />
      </Permit>
      <CommentList post_id={post_index} />
    </Grid>
  );
};

export default PostDetail;
