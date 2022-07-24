import { Grid, Modal, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMeals } from "../redux/reducers/recipeSlice";
import { RecipeContainer } from "./RecipeContainer";
import { ModalRecipeDisplay } from "./ModalRecipeDisplay";

export function RecipeDisplay() {
  const dispatch = useDispatch();
  const mealState = useSelector((state) => state.meals);
  const [openModal, setOpenModal] = useState(false);
  const [recipeArray, setRecipeArray] = useState([]);

  const gridRecipeContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    gridTemplateRows: "repeat(auto-fill)",
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    if (mealState.status === "idle") {
      fetchMeals();
    } else if (mealState.status === "succeeded") {
      // register into the recipe array for display
      const tempRecipeContainer = [];
      for (let meal of mealState.meals) {
        tempRecipeContainer.push(
          <Grid item>
            <RecipeContainer
              details={{
                ...meal,
              }}
              setOpenModal={setOpenModal}
            />
          </Grid>
        );
      }
      setRecipeArray(tempRecipeContainer);
    }
  }, [mealState.status]);

  async function fetchMeals() {
    await dispatch(getMeals(mealState.url));
  }

  return (
    <Grid container sx={gridRecipeContainer}>
      {openModal && (
        <ModalRecipeDisplay setOpenModal={setOpenModal}></ModalRecipeDisplay>
      )}
      {recipeArray}
    </Grid>
  );
}
