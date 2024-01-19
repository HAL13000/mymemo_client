import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";
import { setFavoriteList } from "../redux/features/favoriteSlice";

export const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favorites.value);
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

      if (isFavorite) {
        const newFavoriteMemos = favoriteMemos.filter((e) => e._id !== memoId);
        dispatch(setFavoriteList(newFavoriteMemos));
      }

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

  const onIconChange = async (newIcon) => {
    // console.log(newIcon);
    let temp = [...memos];
    // console.log(temp);
    const index = temp.findIndex((e) => e._id === memoId);
    // console.log(index);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const addFavorite = async () => {
    try {
      const memo = await memoApi.update(memoId, { favorite: !isFavorite });
      let newFavoriteMemos = [...favoriteMemos];
      if (isFavorite) {
        const newFavoriteMemos = newFavoriteMemos.filter(
          (e) => e.id !== memoId
        );
      } else {
        newFavoriteMemos.unshift(memo);
      }
      dispatch(setFavoriteList(newFavoriteMemos));
      setIsFavorite(!isFavorite);
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
        <IconButton onClick={addFavorite} variant="outlined">
          {isFavorite ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>

        <Typography></Typography>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
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
