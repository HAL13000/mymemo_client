import { Box, TextField, ButtonBase } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const [usernameErrText, setUserNameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserNameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    // Get data
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    // console.log(username);
    // console.log(password);
    // console.log(confirmPassword);

    // Errors
    let error = false;
    if (username === "") {
      error = true;
      setUserNameErrText("You need your username");
    }
    if (username.length < 8) {
      error = true;
      setUserNameErrText("You need more than 8 characters");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("You need your password");
    }
    if (password.length < 8) {
      error = true;
      setPasswordErrText("You need more than 8 characters");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("You need to confirm your password");
    }
    if (confirmPassword.length < 8) {
      error = true;
      setConfirmPasswordErrText("You need more than 8 characters");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrText("You need to confirm your password");
    }
    if (error) return;

    // API register new account
    try {
      console.log("test1: connecting...");
      // register()に渡すParamはauthApiのページから来ている
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      console.log("test2:waiting...");
      localStorage.setItem("token", res.token);
      // res.tokenは　server　>　user.js　>　register で設定したres.tokenのこと
      console.log("New account registered!");
    } catch (err) {
      console.log(err);
      err.forEach((e) => {
        if (e.param === "username") {
          setUserNameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordErrText(e.msg);
        }
      });
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="username"
          label="User Name"
          margin="normal"
          name="username"
          type="username"
          required
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          margin="normal"
          name="password"
          type="password"
          required
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          margin="normal"
          name="confirmPassword"
          type="confirmPassword"
          required
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
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

export default Register;
