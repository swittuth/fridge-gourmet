import React from "react";
import {
  Typography,
  Modal,
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export function ModalRecipeDisplay(props) {
  const modalState = useSelector((state) => state.modal);
  const info = modalState.mealInfo;
  const rowArray = [];
  const ingredients = info.ingredients;

  for (let ingred in ingredients) {
    rowArray.push(
      <TableRow>
        <TableCell align="center">{ingred}</TableCell>
        <TableCell align="center">{ingredients[ingred]}</TableCell>
      </TableRow>
    );
  }

  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      // onClick={() => {
      //   props.setOpenModal(false);
      // }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "80%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "min-content",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "15px",
            paddingTop: "5px",
          }}
        >
          <HighlightOffIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              props.setOpenModal(false);
            }}
          ></HighlightOffIcon>
        </Box>
        <Typography
          fontWeight={600}
          sx={{
            fontSize: "1.5em",
            paddingTop: "20px",
          }}
        >
          {info.name.toUpperCase()}
        </Typography>
        <Carousel
          sx={{
            width: "600px",
            height: "1800px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <img src={info.image} width="500px" height="500px" />
          <iframe
            height="500px"
            width="500px"
            src={info.youtube.replace("watch?v=", "embed/")}
          ></iframe>
        </Carousel>
        <TableContainer
          component={Paper}
          sx={{
            width: "70%",
          }}
        >
          <Table
            sx={{
              height: "100%",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">INGREDIENTS</TableCell>
                <TableCell align="center">MEASUREMENTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rowArray}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
}
