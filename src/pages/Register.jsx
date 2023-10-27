import { Box, TextField, ButtonBase } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <Box component="form">
        <TextField
          fullWidth
          id="userName"
          label="User Name"
          margin="normal"
          name="userName"
          type="userName"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          margin="normal"
          name="password"
          type="password"
          required
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          margin="normal"
          name="confirmPassword"
          type="confirmPassword"
          required
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          variant="outlined"
          loading={false}
        >
          Sign In
        </LoadingButton>
      </Box>
      <ButtonBase component={Link} to="/login">
        *Already have an account
      </ButtonBase>
    </>
  );
};
