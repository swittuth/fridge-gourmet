import React from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function UserProfile(prop) {
  const gridLayout = {
    display: "grid",
    width: "100vw",
    height: "88vh",
    gap: "20px",
    padding: "20px",
    gridTemplateAreas: `"Profile RecentActivity RecentActivity"
      "Information  RecentActivity RecentActivity"
      "Information RecentPosts RecentPosts"
      "Information RecentPosts RecentPosts"`,
  };

  if (prop.pages.profilePage) {
    return (
      <Grid container sx={gridLayout}>
        <Grid item sx={{ gridArea: "Profile" }}>
          <Paper
            elevation={5}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            Profile Section
          </Paper>
        </Grid>
        <Grid item sx={{ gridArea: "Information" }}>
          <Paper
            elevation={5}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            Information Section
          </Paper>
        </Grid>
        <Grid item sx={{ gridArea: "RecentActivity" }}>
          <Paper
            elevation={5}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            Recent Activity Section
          </Paper>
        </Grid>
        <Grid item sx={{ gridArea: "RecentPosts" }}>
          <Paper
            elevation={5}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            Recent Posts Section
          </Paper>
        </Grid>
      </Grid>
    );
  } else {
    return <Navigate to="/" />;
  }
}
