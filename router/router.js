const express = require('express');
const router = express.Router();
const dishesController = require('../controllers/dishesController');

// List all dishes
router.get('/', dishesController.getAllDishes);

// Get details of a specific dish by name
router.get('/dish/:name', dishesController.getDishByName);

// Search for dishes by name, ingredients, or origin
router.get('/search', dishesController.searchDishes);

// Suggest dishes based on provided ingredients
router.post('/suggest', dishesController.suggestDishes);
module.exports = router;