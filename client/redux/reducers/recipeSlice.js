import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  meals: [],
  status: "idle",
  error: null,
  selectedIngredients: ["Breadcrumbs"],
  url: "http://localhost:3001/get-meals?ingred=Breadcrumbs",
};

const recipeSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    // create another function to update the state to dispatch after fetching
    updateSearch(state, action) {
      // TODO: drop this, users should never hit this API
      state.url = "http://localhost:3001/get-meals?ingred=Breadcrumbs";
      state.status = "idle";
    },
    addSearchIngredient(state, action) {
      let currentIngredients = current(state).selectedIngredients;
      if (!currentIngredients.includes(action.payload)) {
        state.selectedIngredients.push(action.payload);
        state.url += `&ingred=${action.payload}`;
        state.status = "idle";
      }
      // need to set status back to idle to generate a fetch for meal based on ingredients
    },
    removeSearchIngredient(state, action) {
      let currentIngredients = current(state).selectedIngredients.filter(
        (ing) => ing !== action.payload
      );
      state.selectedIngredients = currentIngredients;
      state.url =
        currentIngredients.length > 0
          ? `http://localhost:3001/get-meals?ingred=${currentIngredients[0]}`
          : "http://localhost:3001/get-meals?";
      for (let i = 1; i < currentIngredients.length; i++) {
        state.url += `&ingred=${currentIngredients[i]}`;
      }
      state.status = "idle";
    },
    extraReducers(builder) {
      builder
        .addCase(getMeals.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getMeals.fulfilled, (state, action) => {
          state.status = "succeeded";
          const mealsData = action.payload; // array of meals
          const meals = [];
          for (let meal of mealsData) {
            /*
          meals: {
            id -> meal
          }
          */
            const {
              id,
              name,
              category,
              area,
              image,
              youtube,
              source,
              instructions,
              ingredients,
            } = meal;
            meals.push({
              // id: add this asap!
              id,
              name,
              category,
              area,
              image,
              youtube,
              source,
              instructions,
              ingredients,
            });
          }
          state.meals = meals;
        });
    },
  },
});

// takes in the action type string (getMeals) and a callback function that returns a promise
// will run the promise callback and dispatch the action based on the returned promise
export const getMeals = createAsyncThunk(
  "meals/getMeals",
  async (url) => {
    const data = await fetch(url).then((response) => response.json());
    return data;
  } // dispatch action from here afther this
);

export const { updateSearch, addSearchIngredient, removeSearchIngredient } =
  recipeSlice.actions;
export default recipeSlice.reducer;
