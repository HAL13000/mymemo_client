import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/images/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";
import FavoriteList from "./FavoriteList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CustomDroppable } from "./CustomDroppable";

export const Sidebar = () => {
  const [activeItem, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const { memoId } = useParams();
  const memos = useSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemos = async () => {
      // console.log(user);
      if (!user._id) {
        return;
      }
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        if (err.message) {
          alert(err.message);
        } else {
          alert("An error: Get memos at sidebar");
          console.log(err);
        }
        // alert(err);
      }
    };
    getMemos();
  }, [dispatch, user]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e.id === memoId);
    if (memos.length > 0 && memoId === undefined) {
    }
    setActiveIndex(activeIndex);
  }, [memos, memoId, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const createMemo = async () => {
    try {
      const res = await memoApi.create();
      // console.log(res);
      navigate(`/memo/${res._id}`);
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
    } catch (err) {
      if (err.message) {
        alert(err.message);
      } else {
        alert("An error: Create memos at sidebar");
        console.log(err);
      }
      // alert(err);
    }
  };

  function handleOnDragEnd(result) {
    // If there's no destination ー> return
    if (!result.destination) return;
    // console.log(result, favorites);

    const reorderedItem = memos[result.source.index];
    const newMemos = [...memos];

    const movedItem = newMemos.find(
      (entry) => entry._id === result.draggableId
    );
    console.log(memos, result, movedItem);

    newMemos.splice(result.source.index, 1);
    console.log(result.source.index);
    newMemos.splice(result.destination.index, 0, movedItem);

    dispatch(setMemo(newMemos));

    console.log(memos, newMemos);

    memoApi
      .updatePosition(newMemos)
      .then((res) => {
        console.log("success", res);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    // for (let i = 0; i < newMemos.length; i++) {
    //   console.log(newMemos[i], i);
    //   memoApi
    //     .update(newMemos[i]._id, {
    //       position: i,
    //     })
    //     .then(() => {
    //       console.log("success");
    //     })
    //     .catch((err) => {
    //       console.log(err, "error");
    //     });
    // }
  }

  return (
    <div>
      <Drawer
        container={window.document.body}
        variant="permanent"
        open={true}
        sx={{ width: 250, height: "100vh" }}
      >
        <List
          disablePadding
          sx={{
            width: 250,
            height: "100vh",
            backgroundColor: assets.colors.secondary,
          }}
        >
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
                {user.username}
              </Typography>
              <IconButton onClick={logout}>
                <LogoutOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItemButton>
          <Box sx={{ paddingTop: "10px" }} />
          <FavoriteList />
          <Box sx={{ paddingTop: "10px" }} />
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
                Private
              </Typography>
              <IconButton onClick={() => createMemo()}>
                <AddBoxOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItemButton>
          <Box sx={{ paddingTop: "10px" }} />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <CustomDroppable
              key={`list-memo-droppable`}
              droppableId={`list-memo-droppable`}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {memos.map((item, index) => (
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
                          component={Link}
                          sx={{
                            pl: "20px",
                            cursor: snapshot.isDragging
                              ? "grab"
                              : "pointer!important",
                          }}
                          component={Link}
                          to={`/memo/${item._id}`}
                          selected={index === activeItem}
                        >
                          <Box
                          // sx={{ pl: "20px" }}
                          // component={Link}
                          // to={`/memo/${item._id}`}
                          // key={item._id}
                          // selected={index === activeIndex}
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
                            <IconButton></IconButton>
                          </Box>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </CustomDroppable>
          </DragDropContext>{" "}
        </List>
      </Drawer>
    </div>
  );
};

{
  /* <ListItemButton>
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
          </ListItemButton> */
}
{
  /* <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              key={`list-memo-droppable`}
              droppableId={`list-memo-droppable`}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {memos.map((item, index) => (
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
                          component={Link}
                          sx={{
                            pl: "20px",
                            cursor: snapshot.isDragging
                              ? "grab"
                              : "pointer!important",
                          }}
                          component={Link}
                          to={`/memo/${item._id}`}
                          selected={index === activeItem}
                        >
                          <Box
                          // sx={{ pl: "20px" }}
                          // component={Link}
                          // to={`/memo/${item._id}`}
                          // key={item._id}
                          // selected={index === activeIndex}
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
                            <IconButton></IconButton>
                          </Box>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext> */
}
