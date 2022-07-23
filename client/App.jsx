import { useState } from "react";
import { Grid, Drawer, Typography } from "@mui/material";
import { BrowserRouter, Router, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { MainDisplay } from "./components/MainDisplay.jsx";
import { SideSelection } from "./components/SideSelection.jsx";
import "./App.scss";

function App() {
  const [openDrawer, setOpenDrawer] = useState(true);
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
    <>
      <SideSelection
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      ></SideSelection>
      <Grid container sx={gridOuterContainer}>
        {/* main section */}
        <Grid item sx={{ gridArea: "Header" }}>
          <NavBar
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          ></NavBar>
        </Grid>
        <Grid
          item
          sx={{
            gridArea: "MainContainer",
            width: "100%",
            height: "100%",
          }}
        >
          <MainDisplay></MainDisplay>
        </Grid>
        <Grid item sx={{ gridArea: "Footer" }}>
          <Footer></Footer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
