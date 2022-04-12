import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";
import { actionCreators as postActions } from "../redux/modules/post";

import FavoriteIcon from "@mui/icons-material/Favorite";

const Like = (props) => {
  let { post_id } = props;
  const dispatch = useDispatch();
  const is_like = useSelector((state) => state.post.target).islike;
  const user_info = useSelector((state) => state.user.user); // 접속자 id
  const [isLike, setIsLike] = React.useState(is_like);
  console.log(is_like);
  const likeCheck = () => {
    dispatch(likeActions.likeDB(post_id, user_info.nickname));
    setIsLike(!isLike);
  };

  React.useEffect(() => {
    dispatch(postActions.getDetailDB(post_id));
  }, [isLike]);

  return (
    <React.Fragment>
      <FavoriteIcon onClick={likeCheck} style={{ color: isLike ? "pink" : "grey" }} />
    </React.Fragment>
  );
};

Like.defaultProps = {
  post_id: "",
};

export default Like;
