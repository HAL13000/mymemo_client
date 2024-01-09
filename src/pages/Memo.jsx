import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";

export const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const Navigate = useNavigate();

  // useStateでメモの状態を更新する　Const updateMemo もいる

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        // console.log(res);
        setTitle(res.title);
        setDescription(res.description);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 1000;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    let temp = [...memos];
    dispatch(setMemo(temp));

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };
  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    // let temp = [...memos];
    // dispatch(setMemo(temp));

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async (e) => {
    try {
      await memoApi.delete(memoId);
      if (newMemos.length === 0) {
        Navigate("/");
      } else {
        Navigate(`/memo/${newMemos[0]._id}`);
      }

      const newMemos = memos.filter((e) => e._id !== memoId);
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>

        <Typography></Typography>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder="Theme"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiInputBase-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": {
              fontSize: "2rem",
              fontWeight: "700",
            },
          }}
        />
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder="Add"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiInputBase-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": {
              fontSize: "1rem",
            },
          }}
        />
      </Box>
    </>
  );
};
