import React from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
export const Memo = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>

        <Typography></Typography>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField placeholder="Theme" variant="outlined" fullWidth />
        <TextField placeholder="Add" variant="outlined" fullWidth />
      </Box>
    </>
  );
};
