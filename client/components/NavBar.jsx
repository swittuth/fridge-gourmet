import React from "react";
import logo from "../assets/fridge_gourmet_logo.svg";
import { Link } from "react-router-dom";
import {
  AppBar,
  Typography,
  Stack,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function NavBar(prop) {
  return (
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
          <IconButton>
            <AccountCircleIcon></AccountCircleIcon>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
