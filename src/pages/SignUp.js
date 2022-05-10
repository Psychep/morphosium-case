import React from "react";
import { TextField, Button, Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  changeName,
  changeEmail,
  changePassword,
  register,
} from "../redux/authSlice";

export default function SignUp() {
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    dispatch(changeName(e.target.value));
  };
  const handleEmailChange = (e) => {
    dispatch(changeEmail(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(changePassword(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Sign UP
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        id="name"
        label="Full Name"
        variant="outlined"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={handleNameChange}
      />

      <TextField
        fullWidth
        margin="normal"
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        autoComplete="email"
        onChange={handleEmailChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="password"
        label="Password"
        value={password}
        type="password"
        variant="outlined"
        onChange={handlePasswordChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign Up"}
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
          {"Have an account? Sign In"}
        </Link>
      </Box>
    </form>
  );
}
