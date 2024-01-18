import React, { useEffect, useState } from "react";
import { ListItemButton, Typography, Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { setFavoriteList } from "../../redux/features/favoriteSlice";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.favorites.value);
  const { memoId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getFavorites();
        dispatch(setFavoriteList(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, []);

  useEffect(() => {
    const index = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(index);
  }, [memoId]);

  return (
    <div>
      <ListItemButton>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Favorite
          </Typography>
        </Box>
      </ListItemButton>

      <ListItemButton
        sx={{
          pl: "20px",
          cursor: "",
        }}
      >
        <Typography
          variant="body2"
          fontWeight="700"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Favorite
        </Typography>
      </ListItemButton>
    </div>
  );
};

export default FavoriteList;
