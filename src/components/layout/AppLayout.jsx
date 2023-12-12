import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import { Sidebar } from "../common/Sidebar";
import { Box } from "@mui/material";

export const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        console.log("no user detected");
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};
