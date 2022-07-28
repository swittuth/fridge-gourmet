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
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
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
          height: "90%",
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          overflowX: "hidden",
          gap: "10px",
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
            fontSize: "2em",
            paddingTop: "20px",
            color: "primary.dark",
          }}
        >
          {info.name.toUpperCase()} |{" "}
          <a
            className="link-source-typography"
            href={info.source}
            target="_blank"
          >
            Source Link
          </a>
        </Typography>
        <Box
          sx={{
            height: "100%",
            width: "70%",
          }}
        >
          <AwesomeSlider animation="foldOutAnimation" bullets={false}>
            <Box>
              <img src={info.image} />
            </Box>
            <div className="video-modal-container">
              <iframe
                className="video-recipe"
                src={info.youtube.replace("watch?v=", "embed/")}
              ></iframe>
            </div>
          </AwesomeSlider>
        </Box>

        <Table
          sx={{
            width: "70%",
            height: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.2em",
                  color: "secondary.dark",
                }}
              >
                INGREDIENTS
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.2em",
                  color: "secondary.dark",
                }}
              >
                MEASUREMENTS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rowArray}</TableBody>
        </Table>

        <Box
          sx={{
            height: "max-content",
            width: "70%",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              textAlign: "center",
              fontSize: "1.3em",
              color: "secondary.dark",
            }}
          >
            INSTRUCTIONS
          </Typography>
          <Typography
            sx={{
              textAlign: "justify",
            }}
          >
            {info.instructions}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
}
