import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Grid, Input, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CommentEdit(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");
  const user_info = useSelector((state) => state.user.user);

  const { comment_id, post_id } = props;

  const editComment = () => {
    const comment_list = {
      postId: post_id,
      comment: comment,
    };
    console.log(comment_id, comment_list);
    dispatch(
      commentActions.editCommentDB(parseInt(comment_id), post_id, comment_list)
    );
    setComment(""); // set 지워지니까 input의 value도 없어짐
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <span onClick={handleOpen}>수정</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Input
            placeholder="댓글 내용을 입력해주세요 :)"
            _onChange={onChange}
            value={comment}
            onSubmit={editComment}
            is_submit
          />
          <Button
            width="50px"
            margin="0px 2px 0px 2px"
            _onClick={editComment}
            // _disabled={comment === "" ? true : false}
          >
            수정
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
