import React, { useEffect, useState } from "react";
import { ListItemButton, Typography, Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { setFavoriteList } from "../../redux/features/favoriteSlice";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.favorites.value);
  const { memoId } = useParams();
  const [activeItem, setActiveIndex] = useState(0);
  //   const [favorites, updateFavorites] = useState(FavoriteList);

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
    const index = memos.findIndex((e) => e._id === memoId);
    // console.log("favoriteList", memos);
    setActiveIndex(index);
  }, [memoId]);

  const handleOnDragEnd = () => {};
  //   function handleOnDragEnd(result) {
  //     if (!result.destination) return;

  //     const items = Array.from(`list-memo-droppable`);
  //     const [reorderedItem] = memos.splice(result.source.index, 1);
  //     items.splice(result.destination.index, 0, reorderedItem);

  //     updateFavorites(items);
  //   }

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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          key={`list-memo-droppable`}
          droppableId={`list-memo-droppable`}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {memos.map((item, index) => (
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
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FavoriteList;
