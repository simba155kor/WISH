// basic
import React, { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/http-common';

// material ui
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Zoom from '@material-ui/core/Zoom';

// toast
import { toast } from 'react-toastify';

// action
import { deleteToken } from '../../common/JWT-common';

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

// 회원탈퇴
const deleteUser = createAsyncThunk(
  'DELETE_USER',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/members');
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export default function DraggableDialog({nickname}) {
  const [open, setOpen] = useState(false);
  // const { nickname } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doDeleteUser = () => {
    handleClose();
    dispatch(deleteUser())
      .unwrap()
      .then(() => {
        toast.success('😥 회원탈퇴가 완료 되었습니다');
        deleteToken();
        navigate.push('/login');
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          deleteToken();
          navigate.push('/login');
        } else if (err.status === 404) {
          toast.error('😥 회원정보가 존재하지 않습니다');
          deleteToken();
          navigate.push('/login');
        } else if (err.status === 400) {
          toast.error('😥 다시 한 번 시도해주세요');
        } else if (err.status === 500) {
          navigate.push('/error');
        }
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        회원탈퇴
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" />
        <DialogContent>
          <DialogContentText>
            {nickname}님 정말로 탈퇴하시겠습니까?😥😥
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={doDeleteUser} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
