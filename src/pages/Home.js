import { Button } from "@mui/material";
import React from "react";
import { logOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
