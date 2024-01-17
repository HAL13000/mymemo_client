import React, { useEffect } from "react";
import { ListItemButton, Typography } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.favorites.value);
  const { memoId } = useParams();

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
    // const
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

      <DragDropContext></DragDropContext>
    </div>
  );
};

export default FavoriteList;
