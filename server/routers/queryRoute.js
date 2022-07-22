const express = require("express");
const queryRouter = express.Router();
const foodDataController = require("../controllers/foodDataController");

queryRouter.get("/get-meals", foodDataController.getMeal, (req, res) => {
  res.status(200).send(res.locals.mealsArray);
});

queryRouter.get(
  "/get-ingredients",
  foodDataController.getIngredients,
  (req, res) => {
    res.status(200).send(res.locals.ingredCategoryList);
  }
);

module.exports = queryRouter;
