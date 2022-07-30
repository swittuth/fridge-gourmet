import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { updateMealInfo } from "../redux/reducers/modalSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export function RecipeContainer(props) {
  const dispatch = useDispatch();
  function updateModalInfo() {
    dispatch(updateMealInfo(props.details));
  }

  return (
    <motion.div
      className="recipe-card"
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
        delay: props.delayTime,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          margin: "10px",
          borderRadius: "20px",
        }}
      >
        <CardHeader
          title={props.details.name}
          subheader={`${props.details.category} | ${props.details.area}`}
          titleTypographyProps={{ variant: "h6", fontSize: "1em" }}
        />
        <CardMedia component="img" image={props.details.image} />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "primary.dark",
            }}
            onClick={() => {
              // update the modal information
              updateModalInfo();
              props.setOpenModal(true);
            }}
          >
            MORE INFO
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
