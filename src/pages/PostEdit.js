import React from "react";
import { Grid, Image, Text, Button, Input } from "../elements";
// import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Upload } from "../components";

const PostEdit = (props) => {
  const dispatch = useDispatch();
  const target_id = useParams().postId;

  //이미 App.js에서 세션이 있는지 확인했으니, is_login만 확인하면 된다.
  const is_login = useSelector((state) => state.user.is_login);
  const target = useSelector((state) => state.post.target);
  console.log(target);
  const preview = useSelector((state) => state.image.preview);

  const { history } = props;

  // const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState(target ? target.title : "");
  const [country, setCountry] = React.useState(target ? target.country : "");
  const [city, setCity] = React.useState(target ? target.city : "");
  const [evaluation, setEvaluation] = React.useState(
    target ? target.evaluation : ""
  );
  const [content, setContents] = React.useState(target ? target.content : "");
  const [post_list, setPostList] = React.useState({});

  const editPost = () => {
    console.log(title, country, city, evaluation, content);

    // setPostList(temp_list);

    dispatch(
      postActions.editPostDB(
        target_id,
        title,
        country,
        city,
        evaluation,
        content
      )
    );
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            // push는 메인페이지 이동해도 뒤로가기 하면 write 페이지 나올 수 있다.
            // replace는 페이지를 교체해주는 것이기 때문에 메인페이지로 이동해도 뒤로가기 누르면 write 페이지 안나온다.
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid padding="10px">
        <Text margine="0px" size="24px" bold>
          미리보기
        </Text>
        <Grid is_flex>
          <Upload />
          <Image
            half
            shape="big_square"
            src={preview ? preview : target.imgUrl}
          />
        </Grid>
      </Grid>
      <Grid></Grid>
      <Grid padding="16px">
        <Input
          value={title}
          defaultValue={title}
          _onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="제목"
          placeholder="제목"
        />
        <div style={{ display: "flex", justifyContent: "stretch" }}>
          <Input
            value={country}
            _onChange={(e) => {
              setCountry(e.target.value);
            }}
            label="나라"
            placeholder="나라"
          />
          <Input
            value={city}
            _onChange={(e) => {
              setCity(e.target.value);
            }}
            label="도시"
            placeholder="도시"
          />
        </div>
        <Grid>
          <label htmlFor="select" style={{ fontWeight: 700, fontSize: "14px" }}>
            평가
          </label>
          <Select
            name="evaluation"
            onChange={(e) => {
              setEvaluation(e.target.value);
            }}
            value={evaluation}
            defaultValue={evaluation}
          >
            <option value="">평가</option>
            <option value="아주좋음">아주좋음</option>
            <option value="좋음">좋음</option>
            <option value="보통">보통</option>
            <option value="별로">별로</option>
            <option value="최악">최악</option>
          </Select>
        </Grid>
        <Input
          value={content}
          textarea
          _onChange={(e) => {
            setContents(e.target.value);
          }}
          multiLine
          label="후기"
          placeholder="후기"
        />
      </Grid>
      <Grid is_flex>
        <Button
          width="30vw"
          margin="10px auto"
          _onClick={editPost}
          _disabled={
            title === "" ||
            country === "" ||
            city === "" ||
            evaluation === "" ||
            content === ""
              ? true
              : false
          }
        >
          게시글 수정
        </Button>
      </Grid>
    </React.Fragment>
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

const UploadBox = styled.label`
  margin: 0 8px 0 8px;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default PostEdit;
