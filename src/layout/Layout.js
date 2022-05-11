import { Outlet, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Box } from "@mui/system";
import { useCurrentUser, useIsLoggedIn } from "../config/hooks";
import { logOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";
export default function Layout() {
  const isLoggedIn = useIsLoggedIn();
  const currentUser = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [confrimSignOutDialogOpen, setConfrimSignOutDialogOpen] =
    useState(false);
  if (isLoggedIn === null) return <h1>Loading...</h1>;
  else if (isLoggedIn === false) return <Navigate replace to="/sign-in" />;

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Home</Typography>
          <IconButton
            color="inherit"
            size="large"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            open={anchorEl}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setProfileDialogOpen(true);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setConfrimSignOutDialogOpen(true);
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Avatar />
            <Box ml={3}>
              <Typography>{currentUser?.displayName}</Typography>
              <Typography>{currentUser?.email}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setProfileDialogOpen(false);
              dispatch(logOut());
            }}
          >
            Sign Out
          </Button>

          <Button
            onClick={() => {
              setProfileDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confrimSignOutDialogOpen}
        onClose={() => {
          setConfrimSignOutDialogOpen(false);
        }}
      >
        <DialogTitle>
          <Typography variant="h6">
            Sign out from {currentUser?.email}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setConfrimSignOutDialogOpen(false);
              dispatch(logOut());
            }}
          >
            Sign Out
          </Button>
          <Button onClick={() => setConfrimSignOutDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Outlet />
    </>
  );
}
