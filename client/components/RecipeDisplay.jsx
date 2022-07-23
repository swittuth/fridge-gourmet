import { Grid } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMeals } from "../redux/reducers/recipeSlice";
import { RecipeContainer } from "./RecipeContainer";

export function RecipeDisplay() {
  const dispatch = useDispatch();
  const mealState = useSelector((state) => state.meals);

  const gridRecipeContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px",
    gridTemplateRows: "repeat(auto-fill, 250px",
    width: "100%",
    height: "100%",
  };

  return (
    <Grid container sx={gridRecipeContainer}>
      <p>Testtt</p>
      <Grid item>
        <RecipeContainer></RecipeContainer>
      </Grid>
    </Grid>
  );
}
