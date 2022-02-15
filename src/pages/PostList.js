import React from "react";
import { Post } from "../components";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector} from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const history = useHistory();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return <Post key={p.id} {...p} onClick={() => history.push("/PostDetail/"+p.id)}/>; 
      })}
    </React.Fragment>
  );
};

export default PostList;