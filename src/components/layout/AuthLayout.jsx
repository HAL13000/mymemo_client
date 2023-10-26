import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";

export const AuthLayout = () => {
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
      </Container>
      <Outlet />
    </div>
  );
};
