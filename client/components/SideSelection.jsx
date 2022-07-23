import React, { useEffect } from "react";
import { Drawer, Typography } from "@mui/material";
import { SideIngredContainer } from "./SideIngredContainer";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../redux/reducers/ingredientSlice";

export function SideSelection(prop) {
  const dispatch = useDispatch();
  const ingredientState = useSelector((state) => state.ingredients);
  const ingredientStatus = ingredientState.latest;
  const ingredientCategory = ingredientState.ingredients;

  useEffect(() => {
    if (!ingredientStatus) {
      dispatch(getIngredients(ingredientState.url));
    }
  }, []);

  const ingredientsContainer = [];

  for (let category in ingredientCategory) {
    const sortedIngredientList = ingredientCategory[category].slice();
    sortedIngredientList.sort((a, b) => a.name.localeCompare(b.name));
    // console.log(sortedIngredientList);
    ingredientsContainer.push(
      <SideIngredContainer
        category={category}
        ingredientList={sortedIngredientList}
      />
    );
  }

  return (
    <Drawer
      anchor="left"
      open={prop.openDrawer}
      onClose={() => {
        prop.setOpenDrawer(false);
      }}
      PaperProps={{
        sx: {
          width: "25%",
        },
      }}
    >
      {ingredientsContainer}
    </Drawer>
  );
}
