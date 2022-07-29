import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./reducers/ingredientSlice";
import recipeReducer from "./reducers/recipeSlice";
import modalReducer from "./reducers/modalSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    meals: recipeReducer,
    modal: modalReducer,
    user: userReducer,
  },
});
