import { Container, Avatar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../config/hooks";

export default function AuthLayout() {
  const isLoggedIn = useIsLoggedIn();
  const error = useSelector((state) => state.auth.error);

  if (isLoggedIn === null) return <h1>Loading...</h1>;
  else if (isLoggedIn === true) return <Navigate replace to="/" />;

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Avatar sx={{ mx: "auto", bgcolor: "primary.main", mb: 2 }} />
      {error && (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "error.main" }}
        >
          {error}
        </Typography>
      )}
      <Outlet></Outlet>
    </Container>
  );
}
