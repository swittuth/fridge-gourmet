import React, { useEffect } from "react";
import logo from "../assets/fridge_gourmet_logo.svg";
import { Navigate } from "react-router-dom";
import { AppBar, Stack, Toolbar, Button, IconButton } from "@mui/material";
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
    } else {
      prop.setProfilePage(true);
    }
  }

  useEffect(() => {
    dispatch(checkLogin());
    if (userInfo.loggedIn) {
      prop.setLoginMode(false);
    }
  });

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
              onClick={() => {
                prop.setProfilePage(false);
              }}
            >
              HOME
            </Button>
            <IconButton onClick={verifyLogin}>
              <AccountCircleIcon></AccountCircleIcon>
            </IconButton>
            {userInfo.loggedIn && (
              <form action="http://localhost:3001/auth/logout">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#d50000",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ff1744",
                    },
                  }}
                  type="submit"
                >
                  LOGOUT
                </Button>
              </form>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
