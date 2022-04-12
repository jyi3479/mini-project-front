import React from "react";
import { Grid, Image, Text, Button, Input } from "../elements";
// import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";

import styled from "styled-components";
import { Upload } from "../components";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  //이미 App.js에서 세션이 있는지 확인했으니, is_login만 확인하면 된다.
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);

  const { history } = props;

  // const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [evaluation, setEvaluation] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [post_list, setPostList] = React.useState({});

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const selectBox = (e) => {
    console.log(e.target.value);
  };
  // const fileInput = React.useRef();
  // const selectFile = (e) => {
  //   console.log(e.target);
  //   // input에 가진 files 객체 보기
  //   console.log(e.target.files);
  //   // 선택한 파일에 어떻게 저장되어 있나 보기
  //   console.log(e.target.files[0]);
  //   // ref로도 확인
  //   console.log(fileInput.current.files[0]);
  // };

  // const reader = new FileReader();
  // const file = fileInput.current.files[0];
  // // 파일 내용을 읽어온다.
  // reader.readAsDataURL(file);
  // // 읽기가 끝나면 발생하는 이벤트 핸들러.
  // reader.onloadend = () => {
  //   console.log(reader.result);
  //   // dispatch(imageActions.setPreview(reader.result));
  // };

  const addPost = () => {
    console.log(title, country, city, evaluation, contents);

    // setPostList(temp_list);

    dispatch(postActions.addPostDB(title, country, city, evaluation, contents, preview));
  };

  if (!document.cookie) {
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
    <Grid padding="0px 40px" width="70vw" margin="auto">
      <Grid padding="10px">
        <Text margine="0px" size="24px" bold>
          미리보기
        </Text>
        <Grid is_flex>
          <Image
            half
            shape="big_square"
            src={
              preview
                ? preview
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAXVBMVEXv7+9mZmbs7OxfX1/39/d+fn6np6fX19fz8/POzs55eXlbW1uDg4PS0tJkZGRhYWFqamrn5+eLi4tWVlbh4eGUlJSqqqqhoaH7+/u+vr5vb2/Jycm/v7+Ojo6wsLDYus8vAAADXElEQVR4nO3b6XLiOhCGYWshtG0siWVCljNz/5c5LQhhiWAyFacO8rzPv2Bw1eeW1LIJTQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADcYMXKCKfRs4gd4TzfbT7MxzFUkFY6F3v3devYt2MMku/lZ6GbjWCR+uH+02ptR6mJLMY5z/eSbpQRKJq2itqOM99Ie39Ie4u91lUnmPZq1kmmFZHmSuDppZXN0G6ubIgnltbKZuvi2vzYSGlATyytn3frZFIMaVMq7sTSNj+jCSlq3lVT+MS00srcGZNCSsa4eeH4xNI+uxQ1qta3f55+bZ9dfNGwOpLjP5B23ufK5rjrtnC86rTiP7y0iPu0oZtWB7LWv66WFyuvH2La5Q2vpVgVp/Wvyc2Wl28dOuN699L6afVbaVN86WcXoazY/349vi7FyuWFaCpOK63J3SZ254+areb1XrfJxTuhWtP6IUQTc9zZ6cv27W7A7p6V7+prT26IKk0rw9vau1t9S5tEtRvOZ3d/daaVoQ+HtMl11743kW0n9ddW2vAeVjeJujIXM/itc4s8pt9fqTGtNtWYjrUtxc3zVx7WenOwypU91LfCtNp6jpXdi7O8zThZh2VpZRvy3Har/PfbgerSWhlMNJfiru+edZ0HF0Me5+uf9n2pri6tb81lZQ9xT3usf3RBB7ne2afdYN5/vLa0MiQX0se0eWU+dCLJq3EurDbkoIl1MNva0tpcOh3GpcruqtsdMlldjU/fFsLK79eputLqpuLjnD1w3X52Wvu07c/f5xa+vrR+cLEwio/V3Rc3h81z9jjMjVlIPlRTWtGw17O+x9VNRZ7Zx+uSH7m6RS58NWlz67md1bz13e2Hqa25damSmtLqLd4f0+oEXe777KWQd1X1fKPp2+RuzNlDFcNLviShlDeumlUlaeeD3rxfaz5nY1ZbbGEQpD7F+GPRz+8/re/MQxfMrfX4mLYs5EsVQ6ygtr5zn5izn1FDWulKm8Wppn3qPjGIJ5NW5+1ISHtv/r20I0zcVEva3sWv/3uynmJdQdrm18Moto/bzf8d5RPEy5MfQeEL3/sjdpxfP4zzY4zvZhu7zE8Uv2pZ/uYPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7/0G6cMyGr/MjwcAAAAASUVORK5CYII="
            }
          />

          <Upload />
        </Grid>
        {/* <Upload /> */}
      </Grid>

      <Grid padding="16px">
        <Input
          value={title}
          _onChange={(e) => {
            setTitle(e.target.value);
          }}
          multiLine
          label="제목"
          placeholder="제목"
        />
        <Grid is_flex>
          <Grid width="100%" margin="0px 7px 0px 0px">
            <Input
              value={country}
              _onChange={(e) => {
                setCountry(e.target.value);
              }}
              multiLine
              label="나라"
              placeholder="나라"
            />
          </Grid>
          <Grid width="100%" margin="0px 0px 0px 7px">
            <Input
              value={city}
              _onChange={(e) => {
                setCity(e.target.value);
              }}
              multiLine
              label="도시"
              placeholder="도시"
            />
          </Grid>
        </Grid>
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
          value={contents}
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
          _onClick={addPost}
          _disabled={title === "" || country === "" || city === "" || evaluation === "" || contents === "" ? true : false}
        >
          게시글 작성
        </Button>
      </Grid>
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
  border-radius: 10px;
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

export default PostWrite;
