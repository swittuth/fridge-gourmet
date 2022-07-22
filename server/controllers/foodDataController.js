// handles the logic to ask the model / data to retrieve the data
const db = require("../models/food_database");
const foodDataController = {};

foodDataController.getMeal = async (req, res, next) => {
  // retrieve the id of the ingredients
  let ingredArray = req.query.ingred;
  if (!Array.isArray(ingredArray)) {
    ingredArray = [ingredArray];
  }

  if (ingredArray[0] !== undefined) {
    const ingredIdArray = [];
    for (let ingred of ingredArray) {
      const values = [ingred];
      const sql_query = "SELECT id FROM ingredients WHERE name = $1";
      const result = await db.query(sql_query, values);
      ingredIdArray.push(result.rows[0].id);
    }

    let mealIdArray = new Set();
    for (let id of ingredIdArray) {
      const values = [id];
      const sqlQuery = "SELECT meal_id FROM meal_ingred WHERE ingred_id = $1";
      const result = await db.query(sqlQuery, values);
      for (let e of result.rows) {
        mealIdArray.add(e.meal_id);
      }
    }

    let mealsArray = [];
    for (let id of mealIdArray) {
      const values = [id];
      const sqlMealInfo = "SELECT * FROM meal WHERE id = $1";
      const resultMealInfo = await db.query(sqlMealInfo, values);
      const mealObj = resultMealInfo.rows[0];

      const sql_ingredients =
        "SELECT ingred.name AS name, meal_ingred.measuremant AS measurement FROM meal_ingred JOIN ingredients ingred ON meal_ingred.ingred_id = ingred.id WHERE meal_ingred.meal_id = $1";
      const resultIngredMeasurement = await db.query(sql_ingredients, values);
      const ingredients = {};
      for (let ing of resultIngredMeasurement.rows) {
        if (!(ing in ingredients)) {
          ingredients[ing.name] = ing.measurement;
        }
      }
      mealObj["ingredients"] = ingredients;

      mealsArray.push(mealObj);
    }
    res.locals.mealsArray = mealsArray;
  } else {
    res.locals.mealsArray = [];
  }

  return next();
};

foodDataController.getIngredients = async (req, res, next) => {
  const sql_query = `SELECT ing.id AS ingredients_id, ing.name AS ingredients_name, fc.name AS category
  FROM ingredients ing JOIN ingred_categories ic ON ing.id = ic.ingred_id
  JOIN food_categories fc ON ic.category_id = fc.id`;

  const result = await db.query(sql_query);
  const resultArray = result.rows;
  res.locals.ingredCategoryList = resultArray;
  return next();
};

module.exports = foodDataController;
