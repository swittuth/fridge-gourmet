import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMeals } from "../redux/reducers/recipeSlice";

export function RecipeDisplay() {
  const dispatch = useDispatch();
  const mealState = useSelector((state) => state.meals);
}
