/* eslint-disable no-loop-func */
import { createRequire } from "module";
import fetch from "node-fetch";
const require = createRequire(import.meta.url);
const db = require("../models/food_database");
const prompt = require("prompt-sync")();

// fetch all ingredients from api and insert them into the table
async function getIngredients() {
  const url = "https://www.themealdb.com/api/json/v2/9973533/list.php?i=list";
  const foodData = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  const mealsArray = foodData.meals;

  for (let mealObj of mealsArray) {
    const sql_query = `INSERT INTO public.ingredients VALUES(${Number(
      mealObj.idIngredient
    )}, '${mealObj.strIngredient}')`;
    db.query(sql_query);
  }
}

// insert missing ingredients from the database
async function insertMissingIngreds() {
  let number = 608;

  const set = new Set();
  const missingIngreds = [
    ["Green Chili"],
    ["Red Chili Powder"],
    ["Butter, Softened"],
    ["Spring Onion"],
    ["Chicken Thigh"],
    ["Gruyere Cheese"],
    ["Rose Water"],
    ["Green Chili"],
    ["Carrot"],
    ["Tarragon"],
    ["Carrot"],
    ["Ras El Hanout"],
    ["Potato"],
    ["Clove"],
    ["Clove"],
    ["Tomato Purée"],
    ["Red Chili"],
    ["Carrot"],
    ["Red Chili"],
    ["Clove"],
    ["Carrot"],
    ["Red Onion"],
    ["Parmigiano-Reggiano"],
    ["Harissa"],
    ["Vermicelli"],
    ["Cooking Wine"],
    ["Cooking Wine"],
    ["Carrot"],
    ["Self Raising Flour"],
    ["All Spice"],
    ["Blackberrys"],
  ];

  for (let e of missingIngreds) {
    set.add(e[0]);
  }

  for (let e of set) {
    const sql_query = `INSERT INTO public.ingredients VALUES( ${number}, '${e}')`;
    number += 1;
    db.query(sql_query);
  }
}

// fetch all meals
async function getMeals() {
  let url = "https://www.themealdb.com/api/json/v2/9973533/search.php?f=";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let char of alphabet) {
    const mealData = await fetch(url + char)
      .then((response) => response.json())
      .then((data) => data);
    const mealArray = mealData.meals;
    if (mealArray) {
      for (let meal of mealArray) {
        const sql_query =
          "INSERT INTO public.meal VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";

        const values = [
          Number(meal.idMeal),
          meal.strMeal,
          meal.strCategory,
          meal.strArea,
          meal.strMealThumb,
          meal.strYoutube,
          meal.strSource,
          meal.strInstructions,
        ];

        db.query(sql_query, values);
      }
    }
  }
}

// create table for meal - ingred
// check if the strIngredient is true -> has content
// if has content push it into an array for ingredients
// check if the strMeasure is true -> has content
// if has content then push it into an array for measurements
// join it with the ingredients table based on name
// retrieve the id meal

// create an index for the measurement array
// loop through the ingredientsId array
// insert into the meal-ingred table with values (meal_id, ingred_id, measurement)
async function getMealsIngred() {
  let url = "https://www.themealdb.com/api/json/v2/9973533/search.php?f=";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let ingredientsId = [];
  let measurements = [];
  for (let char of alphabet) {
    const mealData = await fetch(url + char)
      .then((response) => response.json())
      .then((data) => data);
    const mealArray = mealData.meals;
    if (mealArray) {
      // if there exists an array of meals
      for (let meal of mealArray) {
        // extract the id of the meal
        const idMeal = meal.idMeal;
        // each meal object has a number of strIngredient(s)
        // loop through the meal obj
        for (let key in meal) {
          if (meal[key] !== " " && meal[key] !== "" && meal[key] !== null) {
            if (key.includes("strIngredient")) {
              console.log(meal[key]);
              // query id from database and push the id into an array
              const ingredArray = meal[key].split(" ");
              for (let i = 0; i < ingredArray.length; i++) {
                ingredArray[i] =
                  ingredArray[i].charAt(0).toUpperCase() +
                  ingredArray[i].slice(1);
              }
              const sql_query = "SELECT id FROM ingredients WHERE name = $1";
              const values = [ingredArray.join(" ")];
              let measurement =
                meal[
                  "strMeasure" +
                    key.slice(
                      key.indexOf("strIngredient") + "strIngredient".length
                    )
                ];
              if (typeof measurement === "undefined") {
                measurement = null;
              }

              await db.query(sql_query, values).then((data) => {
                ingredientsId.push(data.rows[0].id);
                measurements.push(measurement);
              });
            }
          }
        }

        let measurementIdx = 0;
        for (let id of ingredientsId) {
          const sql_query =
            "INSERT INTO public.meal_ingred VALUES ($1, $2, $3)";
          const values = [Number(idMeal), id, measurements[measurementIdx]];
          measurementIdx += 1;
          await db.query(sql_query, values).then((data) => data);
        }

        ingredientsId = [];
        measurements = [];
      }
    }
  }
}

async function insertCategories() {
  const categories = [
    "Vegetables",
    "Fruits",
    "Grains, Beans and Nuts",
    "Meat and Poultry",
    "Dairy",
    "Fish and Seafood",
    "Oil & Fats",
    "Spices and Herbs",
  ];
  let id = 1;
  for (let c of categories) {
    const values = [id, c];
    const sql_query = "INSERT INTO food_categories VALUES ($1, $2)";
    id += 1;
    await db.query(sql_query, values);
  }
}

// labelling ingredients manually
async function labelIngredientCategories() {
  const result = await db.query("SELECT * FROM ingredients ORDER BY id");
  const ingred_array = result.rows;
  for (let { id, name } of ingred_array) {
    const id_category = prompt(
      `Enter category for ${name.toUpperCase()}
    \n1. Vegetables
    \n2.Fruits
    \n3. Grains, Beans and Nuts
    \n4. Meat and Poultry
    \n5. Dairy
    \n6. Fish and Seafood
    \n7. Oil & Fats
    \n8. Spices and Herbs
    \n> `
    );
    const values = [id, Number(id_category)];
    const sql_query = "INSERT INTO ingred_categories VALUES ($1, $2)";
    await db.query(sql_query, values);
  }
}
