import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Image, Button, Like } from "../elements";
import { history } from "../redux/configureStore";
import Permit from "../shared/Permit";
import { actionCreators as likeActions } from "../redux/modules/like";
import { actionCreators as postActions } from "../redux/modules/post";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { likeApis, postApis } from "../shared/api";
import styled from "styled-components";

const Card = (props) => {
  const dispatch = useDispatch();
  const [is_like, setIsLike] = React.useState(false);
  const [like_cnt, setLikeCnt] = React.useState(0);

  const likeCheck = async () => {
    const res = await likeApis.clickLike(props.post_id);
    console.log(res.data);
    setIsLike(!is_like);
    setLikeCnt(res.data.likeCnt);
  };

  React.useEffect(async () => {
    const res = await postApis.detailPost(props.post_id);
    setLikeCnt(res.data.getResponseDto.likeCnt);
    if (res.data.getResponseDto.islike === true) {
      setIsLike(true);
    }
  }, []);

  return (
    <Grid>
      <Grid border="1px solid #d7d7d7" padding="15px" margin="15px 0px">
        <Grid is_flex padding="0px 16px">
          <Grid is_flex width="auto">
            <Text bold size="15px">
              <Index>{props.evaluation}</Index>
            </Text>
          </Grid>

          <Grid is_flex width="auto">
            <Text margin="0px 5px">
              {props.postDate?.split("T")[0]} {props.postDate?.split("T")[1]?.split(".")[0]}
            </Text>

            {props.is_me && (
              <Button
                width="auto"
                padding="5px"
                margin="4px"
                bg="#eb8738"
                _onClick={() => {
                  history.push(`/edit/${props.postId}`);
                }}
              >
                수정
              </Button>
            )}
            {props.is_me && (
              <Button
                width="auto"
                padding="5px"
                margin="4px"
                bg="#acacac"
                _onClick={() => {
                  console.log("삭제!");
                  dispatch(postActions.deletePostDB(props.postId));
                  history.push("/");
                }}
              >
                삭제
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <Grid>
              <Grid>
                <Text margin="0px 0px 0px 16px" size="30px" bold>
                  {props.title}
                </Text>
              </Grid>
              <Grid padding="0px 16px" is_flex>
                <Text color="green">{props.nickname}</Text>
                <Text margin="0px 6px" size="16px" bold>
                  {props.country} &nbsp; / &nbsp; {props.city}
                </Text>
              </Grid>
              <Grid padding="40px">
                <Image shape="big_square" size="60vw" src={props.imgUrl} />
              </Grid>

              <Grid padding="16px" center>
                <div style={{ textAlign: "left" }}>
                  <Text size="16px">{props.content}</Text>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold color="#66696d">
            댓글 {props.commentCnt}개 &nbsp;좋아요 {like_cnt}개
          </Text>
          <Permit>
            <FavoriteIcon
              onClick={likeCheck}
              style={{
                color: is_like ? "pink" : "grey",
              }}
            />
          </Permit>
        </Grid>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  // postId: 1,
  // nickname: "juyeong",
  // title: "부산여행 후기",
  // postDate: "2022-02-01",
  // country: "한국",
  // city: "부산",
  // imgUrl:
  //   "data:image/jpeg;base64,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",
  // evaluation: "좋음",
  // content: "맛있는 음식이 많았다.",
  // commentCnt: 2,
  // likeCnt: 3,
  // is_me: false,
};

const Index = styled.span`
  border: 1px solid green;
  border-radius: 20px;
  padding: 4px;
  color: green;
  font-weight: bold;
`;

export default Card;
