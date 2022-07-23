import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";

export function SideIngredContainer(props) {
  const ingredientList = props.ingredientList;
  const buttonList = [];
  for (let ingredient of ingredientList) {
    buttonList.push(
      <Button
        sx={{
          color: "secondary.dark",
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
