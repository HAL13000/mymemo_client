import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useParams } from "react-router-dom";
import memoApi from "../api/memoApi";

export const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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

    timer = setTimeout(async () => {
      const newTitle = e.target.value;
      setTitle(newTitle);

      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
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
        <IconButton variant="outlined" color="error">
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
