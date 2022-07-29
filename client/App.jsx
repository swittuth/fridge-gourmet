import { useState } from "react";
import { Grid, Drawer, Typography } from "@mui/material";
import { BrowserRouter, Router, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { MainDisplay } from "./components/MainDisplay.jsx";
import { SideSelection } from "./components/SideSelection.jsx";
import { UserModalLogin } from "./components/UserModalLogin.jsx";
import "./App.scss";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loginMode, setLoginMode] = useState(false);

  const gridOuterContainer = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "100px 1fr 30px",
    margin: "0px",
    padding: "0px",
    height: "100%",
    width: "100%",
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
      {loginMode && (
        <UserModalLogin
          loginMode={loginMode}
          setLoginMode={setLoginMode}
        ></UserModalLogin>
      )}
      <Grid container sx={gridOuterContainer}>
        {/* main section */}
        <Grid item sx={{ gridArea: "Header" }}>
          <NavBar
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            setLoginMode={setLoginMode}
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
