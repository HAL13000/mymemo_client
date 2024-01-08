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

export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const { memoId } = useParams();
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        // console.log(res);
        dispatch(setMemo(res));
        // console.log(memos);
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

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
              <IconButton>
                <AddBoxOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItemButton>
          <Box sx={{ paddingTop: "10px" }} />
          {memos.map((item, index) => (
            <ListItemButton
              sx={{ pl: "20px" }}
              component={Link}
              to={`/memo/${item._id}`}
              key={item._id}
              selected={index === activeIndex}
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
          ))}
        </List>
      </Drawer>
    </div>
  );
};
