import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export function MainDisplay() {
  const mainDisplayStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateAreas: "Main",
    height: "100%",
  };

  return (
    <Grid container sx={mainDisplayStyle}>
      <Grid item sx={{ gridArea: "Main" }}>
        <Box>
          <Typography>Main Area</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
