import React from "react";
import Card from "../components/Card";
import { CommentList, CommentWrite } from "../components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const post_index = params.postId;
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
    dispatch(postActions.getDetailDB(post_index));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <Card {...post} is_me={post.nickname === login_user ? true : false} />
      )}

      <Permit>
        <CommentWrite post_id={post_index} />
      </Permit>
      <CommentList post_id={post_index} />
    </React.Fragment>
  );
};

export default PostDetail;
