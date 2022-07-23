import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RecipeDisplay } from "./RecipeDisplay";

export function MainDisplay() {
  const mainDisplayStyle = {
    display: "grid",
    height: "100%",
    width: "100%",
  };

  return (
    <Grid container sx={mainDisplayStyle}>
      <Grid
        item
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <RecipeDisplay></RecipeDisplay>
      </Grid>
    </Grid>
  );
}
