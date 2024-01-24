import React, { useEffect, useState } from "react";
import { ListItemButton, Typography, Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { setFavoriteList } from "../../redux/features/favoriteSlice";
import { CustomDroppable } from "./CustomDroppable";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.value);
  const { memoId } = useParams();
  const [activeItem, setActiveIndex] = useState(0);
  //   const [favorites, updateFavorites] = useState(favoriteLis);

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getFavorites();
        // console.log("favorite list", res);
        dispatch(setFavoriteList(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, []);

  useEffect(() => {
    const index = favorites.findIndex((e) => e._id === memoId);
    // console.log("favoriteList", memos);
    setActiveIndex(index);
  }, [memoId]);

  function handleOnDragEnd(result) {
    // If there's no destination ー> return
    if (!result.destination) return;
    // console.log(result, favorites);

    const reorderedItem = favorites[result.source.index];
    const newFavorites = [...favorites];
    newFavorites.splice(result.source.index);
    console.log(result.source.index);
    newFavorites.splice(result.destination.index, 0, {
      ...reorderedItem,
      favoritePosition: result.destination.index,
    });
    console.log(reorderedItem);
    console.log(result.destination.index);

    setFavoriteList([...favorites]);
  }

  // const reorderedItem = favorites.splice(result.source.index, 1);
  // const newReorderedItem = { ...reorderedItem };
  // favorites.splice(result.destination.index, 0, newReorderedItem);
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
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <CustomDroppable
          key={`list-memo-droppable`}
          droppableId={`list-memo-droppable`}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {favorites.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      selected={index === activeItem}
                      component={Link}
                      to={`/memo/${item._id}`}
                      sx={{
                        pl: "20px",
                        cursor: snapshot.idDragging
                          ? "grab"
                          : "pointer!important",
                      }}
                      //   onClick={() => console.log(item._id)}
                    >
                      <Typography
                        variant="body2"
                        ontWeight="700"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.icon}
                        {item.title}
                      </Typography>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </CustomDroppable>
      </DragDropContext>
    </div>
  );
};

export default FavoriteList;
