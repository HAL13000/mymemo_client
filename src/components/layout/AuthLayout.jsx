import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";

export const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if JWT
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        console.log("no JWT detected");
      } else {
        console.log("JWT verified");
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          <h1>Notion Clone</h1>
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};
