import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Grid, Input, Button, Text } from "../elements";

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
  const { comment_id, post_id } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const user_info = useSelector((state) => state.user.user);
  const target_comment = useSelector((state) => state.comment.list);
  let _comment = target_comment.find((p) => p.commentId === comment_id);
  const [comment, setComment] = React.useState(
    _comment ? _comment.comment : ""
  );

  const editComment = () => {
    const comment_list = {
      postId: post_id,
      comment: comment,
    };
    console.log(comment_id, comment_list);
    dispatch(
      commentActions.editCommentDB(parseInt(comment_id), post_id, comment_list)
    );
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Text _onClick={handleOpen} point>
        수정
      </Text>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid is_flex>
            <Grid width="100%">
              <Input
                placeholder="댓글 내용을 입력해주세요 :)"
                _onChange={onChange}
                value={comment}
                defaultValue={comment}
                onSubmit={editComment}
                is_submit
              />
            </Grid>
            <Button
              width="50px"
              margin="0px 2px 14px 2px"
              _onClick={() => {
                editComment();
                handleClose();
              }}
            >
              수정
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
