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
// import { setFavoriteList } from "../redux/features/favoriteSlice";
import { store } from "../redux/store";

export const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = memos.filter((memo) => memo.favorite === true);
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
        setIsFavorite(res.favorite);
      } catch (err) {
        if (err.message) {
          alert(err.message);
        } else {
          alert("An error: Update memos");
          console.log(err);
        }
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
        if (err.message) {
          alert(err.message);
        } else {
          alert("An error: Update memos");
          console.log(err);
        }
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
        if (err.message) {
          alert(err.message);
        } else {
          alert("An error: Update description");
          console.log(err);
        }
      }
    }, timeout);
  };

  const addFavorite = async (e) => {
    let newFavoriteMemos = [...memos];

    try {
      const memo = await memoApi.update(memoId, { favorite: !isFavorite });
      if (isFavorite) {
        newFavoriteMemos = newFavoriteMemos.map((memo) =>
          memo._id === memoId ? { ...memo, favorite: false } : memo
        );
      } else {
        newFavoriteMemos = newFavoriteMemos.map((memo) =>
          memo._id === memoId ? { ...memo, favorite: true } : memo
        );
      }

      setIsFavorite(!isFavorite);
      dispatch(setMemo(newFavoriteMemos));
    } catch (err) {
      if (err.message) {
        alert(err.message);
      } else {
        alert("An error: Add favorites");
        console.log(err);
      }
    }
  };
  // const addFavorite = async () => {
  //   try {
  //     const memo = await memoApi.update(memoId, { favorite: !isFavorite });
  //     // console.log("addFavorite-- update Memo", memo);
  //     let newFavoriteMemos = [...favoriteMemos];
  //     // console.log(isFavorite);

  //       if (isFavorite) {
  //         const index = newFavoriteMemos.find((e) => e._id === memoId);
  //         newFavoriteMemos[index] = {
  //           ...newFavoriteMemos[index],
  //           // favorite: false,
  //         };

  //       console.log(newFavoriteMemos.find((e) => e._id === memoId));
  //     } else {
  //       newFavoriteMemos.unshift(memo);
  //     }
  //     console.log(newFavoriteMemos);
  //     dispatch(setMemo(newFavoriteMemos));
  //     // dispatch(setFavoriteList(newFavoriteMemos));
  //     setIsFavorite(!isFavorite);
  //   } catch (err) {
  //     if (err.message) {
  //       alert(err.message);
  //     } else {
  //       alert("An error: Add favorites");
  //       console.log(err);
  //     }
  //   }
  // };

  const deleteMemo = async (e) => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);

      if (isFavorite) {
        const newFavoriteMemos = favoriteMemos.filter((e) => e._id !== memoId);
        dispatch(setMemo(newFavoriteMemos));
        // dispatch(setFavoriteList(newFavoriteMemos));
      }

      const newMemos = memos.filter((e) => e._id !== memoId);
      if (newMemos.length === 0) {
        Navigate("/memo");
      } else {
        Navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemo(newMemos));
    } catch (err) {
      if (err.message) {
        alert(err.message);
      } else {
        alert("An error: Delete memos");
        console.log(err);
      }
      // alert(err);
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
      if (err.message) {
        alert(err.message);
      } else {
        alert("An error: Change Icons");
        console.log(err);
      }
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
      <Box
        sx={{
          padding: "10px 50px",
          "@media (max-width: 600px)": {
            padding: "10px 15px",
          },
        }}
      >
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
              "@media (max-width: 600px)": {
                ".MuiOutlinedInput-root": {
                  fontSize: "1.5rem",
                  fontWeight: "700",
                },
              },
            }}
          />
          <TextField
            multiline
            minRows={5}
            maxRows={25}
            onChange={updateDescription}
            value={description}
            placeholder="Add"
            variant="outlined"
            fullWidth
            minRows="5"
            sx={{
              ".MuiInputBase-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": {
                fontSize: "1rem",
              },
              "@media (max-width: 600px)": {
                ".MuiOutlinedInput-root": {
                  fontSize: "0.8rem",
                },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};
