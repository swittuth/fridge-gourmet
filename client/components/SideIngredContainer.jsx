import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addSearchIngredient } from "../redux/reducers/recipeSlice";

export function SideIngredContainer(props) {
  const ingredientList = props.ingredientList;
  const dispatch = useDispatch();
  const buttonList = [];
  for (let ingredient of ingredientList) {
    buttonList.push(
      <Button
        sx={{
          color: "secondary.dark",
        }}
        onClick={() => {
          dispatch(addSearchIngredient(ingredient.name));
        }}
      >
        {ingredient.name}
      </Button>
    );
  }

  return (
    <Accordion
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary>
        <Typography
          sx={{
            fontWeight: 600,
            textAlign: "center",
            width: "100%",
            color: "primary.dark",
          }}
        >
          {props.category.toUpperCase()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{buttonList}</AccordionDetails>
    </Accordion>
  );
}
