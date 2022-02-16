import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

import FavoriteIcon from "@mui/icons-material/Favorite";

const Like = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();
  // const like_list = useSelector((state) => state.like.list);
  const user_info = useSelector((state) => state.user.user); // 접속자 id
  const like_info = useSelector((state) => state.like.is_like); // 접속자 id
  const [is_like, setIsLike] = React.useState(false);

  const likeCheck = () => {
    // const likeDB = realtime.ref(`like/${post_id}/${user_id}`);
    // likeDB.update({ like: true });
    dispatch(likeActions.likeDB(post_id, user_info.nickname));
  };

  React.useEffect(() => {
    // const likeDB = realtime.ref(`like/${post_id}/${user_id}`);
    // likeDB.on("value", (snapshot) => {
    //   console.log(snapshot.val()?.is_click);
    //   setIsLike(snapshot.val()?.is_click);
    // });
  }, []);

  return (
    <React.Fragment>
      <FavoriteIcon
        onClick={likeCheck}
        style={{ color: is_like ? "pink" : "grey" }}
      />
    </React.Fragment>
  );
};

Like.defaultProps = {
  post_id: "",
};

export default Like;
