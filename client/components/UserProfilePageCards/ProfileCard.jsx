import React from "react";
import { Typography, Box, Avatar, Paper, Divider } from "@mui/material";
import { useSelector } from "react-redux";

export function ProfileCard() {
  const userInfo = useSelector((state) => state.user);
  return (
    <Paper
      elevation={5}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "20%",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          backgroundColor: "orange",
          display: "flex",
          gap: "10px",
        }}
      >
        <Avatar
          variant="circular"
          sx={{
            marginLeft: "10px",
            marginTop: "3%",
            width: "70px",
            height: "70px",
            border: 3,
          }}
        ></Avatar>
        <Typography
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            fontWeight: 600,
          }}
        >
          {userInfo.name.toUpperCase()}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <Typography>Test</Typography>
      </Box>
    </Paper>
  );
}
