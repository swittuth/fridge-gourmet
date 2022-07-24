import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography, Chip } from "@mui/material";
import { removeSearchIngredient } from "../redux/reducers/recipeSlice";
import { RecipeDisplay } from "./RecipeDisplay";

export function MainDisplay() {
  const mealState = useSelector((state) => state.meals);
  const selectedIngredients = mealState.selectedIngredients;
  const [chipIngredients, setChipIngredients] = useState([]);
  const dispatch = useDispatch();

  const mainDisplayStyle = {
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplateRows: "50px 1fr",
    gridTemplateAreas: `
    "Ingredients"
    "RecipeDisplay"
    `,
  };

  function deleteSearchIngredient(name) {
    dispatch(removeSearchIngredient(name));
  }

  useEffect(() => {
    const tempChipArray = [];
    for (let ingred of selectedIngredients) {
      tempChipArray.push(
        <Chip
          label={ingred}
          variant="outlined"
          onDelete={() => {
            deleteSearchIngredient(ingred);
          }}
        />
      );
    }
    setChipIngredients(tempChipArray);
  }, [selectedIngredients]);

  return (
    <Grid container sx={mainDisplayStyle}>
      <Grid
        item
        sx={{
          gridArea: "Ingredients",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          gap: "5px",
        }}
      >
        {chipIngredients}
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          height: "100%",
          gridArea: "RecipeDisplay",
        }}
      >
        <RecipeDisplay></RecipeDisplay>
      </Grid>
    </Grid>
  );
}
