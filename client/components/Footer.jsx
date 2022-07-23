import React from "react";
import { Paper, Box, Stack, Typography } from "@mui/material";

export function Footer() {
  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "primary.dark",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "flex-start",
          height: "100%",
          alignItems: "center",
          paddingLeft: "10px",
          gap: "10px",
        }}
      >
        &copy;<Typography> SWITTUTH CODING INC.</Typography>
      </Stack>
    </Paper>
  );
}
