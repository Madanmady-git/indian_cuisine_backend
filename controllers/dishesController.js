const dishes = require('../data/indian_food_sanitized.json');

// List all dishes
exports.getAllDishes = (req, res) => {
  res.json(dishes);
};

// Get details of a specific dish by name
exports.getDishByName = (req, res) => {
  const { name } = req.params;
  const dish = dishes.find(d => d.name.toLowerCase() === name.toLowerCase());
  
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
};

// Search for dishes by name, ingredients, or origin
exports.searchDishes = (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  console.log('search', search);

  const searchResults = dishes.filter(dish =>
    dish.name.toLowerCase().includes(search.toLowerCase()) ||
    dish.ingredients.toLowerCase().includes(search.toLowerCase()) ||
    dish.state.toLowerCase().includes(search.toLowerCase()) ||
    dish.region.toLowerCase().includes(search.toLowerCase())
  );

  res.json(searchResults);
};

// Suggest dishes based on provided ingredients
exports.suggestDishes = (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: 'Ingredients are required' });
  }

  // Convert ingredients to lowercase for case-insensitive matching
  const normalizedIngredients = ingredients.map(ingredient => ingredient.toLowerCase());

  const suggestedDishes = dishes.filter(dish => {
    const dishIngredients = dish.ingredients.toLowerCase().split(', ');
    return normalizedIngredients.every(ingredient => dishIngredients.includes(ingredient));
  });

  res.json(suggestedDishes);
};
