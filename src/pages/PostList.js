import React from "react";
import { Post } from "../components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Text } from "../elements";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import styled from "styled-components";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(postActions.getPostDB("like"));
  }, []);

  const getLike = () => {
    dispatch(postActions.getPostDB("like"));
  };

  const getTime = () => {
    dispatch(postActions.getPostDB("time"));
  };

  return (
    <Grid>
      <Grid container justifyContent="flex-end">
        <Text margin="0px 4px" _onClick={getLike} bold point>
          추천순
        </Text>
        <Text margin="0px 4px" _onClick={getTime} bold point>
          최신순
        </Text>
      </Grid>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {post_list.map((p, idx) => {
            return (
              <Grid xs={12} sm={6} md={4}>
                <Post key={p.id} {...p} />{" "}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Grid>
  );
};

const Select = styled.select`
  margin: 5px 0 20px 0px;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  font-family: inherit; // font 상속
  line-height: inherit;
  border: 2px solid #acacac;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  &:focus {
    border-color: #61b165;
  }

  /* 방향 화살표 없애기 */
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
`;

export default PostList;
