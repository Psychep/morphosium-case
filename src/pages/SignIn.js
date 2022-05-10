import React from "react";
import { TextField, Button, Box, Link, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { changeEmail, changePassword, logIN } from "../redux/authSlice";
import { Link as RouterLink } from "react-router-dom";
export default function SignIn() {
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    dispatch(changeEmail(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(changePassword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIN({ email, password }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Sign IN
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        id="email"
        value={email}
        label="Email"
        onChange={handleEmailChange}
        variant="outlined"
        autoComplete="email"
        autoFocus
      />
      <TextField
        fullWidth
        margin="normal"
        id="password"
        label="Password"
        onChange={handlePasswordChange}
        type="password"
        value={password}
        variant="outlined"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </Button>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link component={RouterLink} to="../sign-in" variant="body2">
          Forgot password?
        </Link>
        <Link component={RouterLink} to="../sign-up" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </form>
  );
}
