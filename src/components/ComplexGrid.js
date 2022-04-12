import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { history } from "../redux/configureStore";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ComplexGrid = (props) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid
        container
        spacing={2}
        onClick={() => {
          history.push(`/detail/${props.postId}`);
        }}
      >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.imgUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                style={{ fontFamily: "inherit" }}
              >
                {props.title}
              </Typography>
              {/* <Typography
                variant="body2"
                gutterBottom
                style={{ fontFamily: "inherit" }}
              >
                {props.country} / {props.city}
              </Typography> */}
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ fontFamily: "inherit" }}
              >
                {props.country} / {props.city}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ fontFamily: "inherit" }}
            >
              댓글 {props.commentCnt} 좋아요 {props.likeCnt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ComplexGrid;
