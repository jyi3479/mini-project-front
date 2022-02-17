import React from "react";
// import {Post} from "../redux/modules/post"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ComplexGrid from "../components";
import { actionCreators as MyActions } from "../redux/modules/mypage";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.mypage.list);
  console.log(post_list);
  React.useEffect(() => {
    if (document.cookie) {
      dispatch(MyActions.myPostDB());
    }
  }, []);
  return <div>마이페이지!!!!!!!!!!!!</div>;
};

export default MyPage;
