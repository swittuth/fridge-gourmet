import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  ingredients: {}, // map that has category as the key and value as an array of ingredients - meat: ['beef', 'chicken', .etc]
  latest: false, // indicate that the latest ingredients have been retrieved
  url: "http://localhost:3001/get-ingredients",
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    updateIngredients(state) {
      state.latest = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.latest = true;
      const result = action.payload; // array of objects
      state.ingredients = {};
      for (let obj of result) {
        if (obj.category in state.ingredients) {
          state.ingredients[obj.category].push({
            id: obj.ingredients_id,
            name: obj.ingredients_name,
          });
        } else {
          state.ingredients[obj.category] = [
            {
              id: obj.ingredients_id,
              name: obj.ingredients_name,
            },
          ];
        }
      }
    });
  },
});

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (url) => {
    const data = await fetch(url).then((response) => response.json());
    return data;
  }
);

export const { updateIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;
