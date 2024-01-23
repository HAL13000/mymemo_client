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

export const Sidebar = () => {
  const [activeItem, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const { memoId } = useParams();
  const memos = useSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

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
      alert(err);
    }
  };

  const onDragEnd = () => {};

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
          {/* <ListItemButton>
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
          </ListItemButton> */}
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
          <DragDropContext onDragEnd={onDragEnd}>
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
          </DragDropContext>
        </List>
      </Drawer>
    </div>
  );
};
