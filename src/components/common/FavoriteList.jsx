import React, { useEffect, useState } from "react";
import { ListItemButton, Typography, Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import memoApi from "../../api/memoApi";
// import { setFavoriteList } from "../../redux/features/favoriteSlice";
import { CustomDroppable } from "./CustomDroppable";
import { setMemo } from "../../redux/features/memoSlice";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.memo.value);
  const user = useSelector((state) => state.user.value);
  const { memoId } = useParams();
  const [activeItem, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   const getMemos = async () => {
  //     if (!user._id) {
  //       return;
  //     }
  //     try {
  //       const res = await memoApi.getFavorites();
  //       // console.log("favorite list", res);
  //       dispatch(setFavoriteList(res));
  //     } catch (err) {
  //       if (err.message) {
  //         alert(err.message);
  //       } else {
  //         alert("An error: Get memos");
  //         console.log(err);
  //       }
  //       // alert(err);
  //     }
  //   };
  //   getMemos();
  // }, [user]);

  useEffect(() => {
    const index = memos.findIndex((e) => e._id === memoId);
    // console.log("favoriteList", favorites);
    setActiveIndex(index);
  }, [memoId]);

  function handleOnDragEnd(result) {
    // If there's no destination ー> return
    if (!result.destination) return;
    // console.log(result, favorites);

    const reorderedItem = memos[result.source.index];
    const newFavorites = [...memos];

    const movedItem = newFavorites.find(
      (entry) => entry._id === result.draggableId
    );
    // console.log(favorites, result, movedItem);

    newFavorites.splice(result.source.index, 1);
    // console.log(result.source.index);
    newFavorites.splice(result.destination.index, 0, movedItem);

    dispatch(setMemo(newFavorites));
    // dispatch(setFavoriteList(newFavorites));
    // console.log(favorites, newFavorites);

    for (let i = 0; i < newFavorites.length; i++) {
      // console.log(newFavorites[i], i);
      memoApi
        .update(newFavorites[i]._id, {
          favoritePosition: i,
        })
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  }

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
              {memos &&
                memos
                  .filter((memo) => memo.favorite === true)
                  .map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
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
                            fontWeight="700"
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
