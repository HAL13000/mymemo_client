import React, { useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, TextField, ButtonBase } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

const Login = () => {
  const [usernameErrText, setUserNameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserNameErrText("");
    setPasswordErrText("");

    // Get data
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

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
    if (error) return;

    // Loading Button
    setLoading(true);

    // API Log in
    try {
      console.log("processing to log in...");
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      // res.tokenは　server　>　user.js　>　register で設定したres.tokenのこと
      dispatch(setUser(res.user));
      console.log("Log in succeeded!");
      navigate("/");
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((e) => {
        if (e.param === "username") {
          setUserNameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
      });
      setLoading(false);
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
          disabled={loading}
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
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          variant="outlined"
          loading={loading}
        >
          Log In
        </LoadingButton>
      </Box>
      <ButtonBase component={Link} to="/register">
        *Don't have an account? Sign Up
      </ButtonBase>
    </>
  );
};

export default Login;
