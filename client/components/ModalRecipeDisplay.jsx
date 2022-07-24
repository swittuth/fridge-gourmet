import React from "react";
import { Typography, Modal, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";

export function ModalRecipeDisplay(props) {
  const modalState = useSelector((state) => state.modal);
  const info = modalState.mealInfo;
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
      <Box
        sx={{
          width: "80%",
          height: "90%",
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Carousel
          defaultWait="0"
          sx={{
            height: "40%",
            width: "40%",
            border: 1,
          }}
        >
          <img src={info.image} width={"100%"} height={"100%"} />
          <iframe
            position="absolute"
            width="100%"
            height="100%"
            src={info.youtube.replace("watch?v=", "embed/")}
          ></iframe>
        </Carousel>

        <Typography>Content</Typography>
      </Box>
    </Modal>
  );
}
