import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/fridge_gourmet_logo.svg";
import {
  AppBar,
  Typography,
  Stack,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { checkLogin } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";

export function NavBar(prop) {
  const dispatch = useDispatch();
  // indicate whether the user is logged in - and retrieve user information
  const userInfo = useSelector((state) => state.user);

  function verifyLogin() {
    dispatch(checkLogin());
    if (!userInfo.loggedIn) {
      prop.setLoginMode(true);
    }
  }

  useEffect(() => {
    dispatch(checkLogin());
    console.log(userInfo);
    if (userInfo.loggedIn) {
      prop.setLoginMode(false);
    }
  }, [userInfo]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => {
              prop.setOpenDrawer(true);
            }}
          >
            <img src={logo} width="80px" />
          </IconButton>
          <Stack
            direction="row"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "primary.dark",
              }}
            >
              HOME
            </Button>
            <IconButton onClick={verifyLogin}>
              <AccountCircleIcon></AccountCircleIcon>
            </IconButton>
            {userInfo.loggedIn && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d50000",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff1744",
                  },
                }}
              >
                LOGOUT
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
