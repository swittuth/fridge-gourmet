import { useState } from "react";
import { Grid } from "@mui/material";
import { BrowserRouter, Router, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import "./App.scss";

function App() {
  const gridOuterContainer = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "100px 1fr 30px",
    margin: "0px",
    padding: "0px",
    height: "100vh",
    width: "100vw",
    border: 1,
    gridTemplateAreas: `
    "Header"
    "MainContainer"
    "Footer"
    `,
  };
  return (
    <Grid container sx={gridOuterContainer}>
      {/* main section */}
      <Grid item sx={{ gridArea: "Header" }}>
        <NavBar></NavBar>
      </Grid>
      <Grid item sx={{ gridArea: "MainContainer" }}></Grid>
      <Grid item sx={{ gridArea: "Footer" }}>
        <Footer></Footer>
      </Grid>
    </Grid>
  );
}

export default App;
