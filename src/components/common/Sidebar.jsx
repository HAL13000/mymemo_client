import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/images/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Drawer
        container={window.document.body}
        variant="permanent"
        open={true}
        sx={{ width: 250, height: "100vh" }}
      >
        <List
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
              <IconButton>
                <LogoutOutlinedIcon onClick={logout} />
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
        </List>
      </Drawer>
    </div>
  );
};
