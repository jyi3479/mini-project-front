import React from "react";
// import {Post} from "../redux/modules/post"
import { useSelector } from "react-redux";
import { ComplexGrid } from "../components/ComplexGrid";

const MyPage = (props) => {
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  return (
    <>
      <h1>님의 최신 글입니다.</h1>
      {post_list.map((p, idx) => {
        return <ComplexGrid key={p.id} {...p} />;
      })}
    </>
  );
};

export default MyPage;
