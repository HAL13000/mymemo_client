import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";

export const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
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
        setIcon(res.icon);
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
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], title: newTitle };
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
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);

      const newMemos = memos.filter((e) => e._id !== memoId);
      if (newMemos.length === 0) {
        Navigate("/memo");
      } else {
        Navigate(`/memo/${newMemos[0]._id}`);
      }
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
        <Box>
          <EmojiPicker icon={icon} />
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
      </Box>
    </>
  );
};
