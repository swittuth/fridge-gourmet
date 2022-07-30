import React from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function UserProfile(prop) {
  const gridLayout = {};

  if (prop.pages.profilePage) {
    return <Typography>Test</Typography>;
  } else {
    return <Navigate to="/" />;
  }
}
