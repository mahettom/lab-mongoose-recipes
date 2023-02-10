const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
// Import of the data from './data.json'
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)

  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2 ———  Create a recipe and print the title 
  .then(async () => {
    const recipe1 = await Recipe.create({
      title: "eggs",
      level: "Easy Peasy",
      ingredients: ["eggs"],
      cuisine: "small",
      dishType: "other",
      image: "",
      duration: 1,
      creator: "the chicken or the egg, who knows",
      created: '0000-12-09',
    })
    console.log(recipe1.title);
  })

  // Iteration 3 ——— Insert multiple recipes and print title
  .then(async () => {

    const dataRecipe = await Recipe.insertMany(data)

    dataRecipe.forEach(one => {
      console.log(`${one.title}`);
    });
  })

  // Iteration 4 ——— update duration to 100
  .then(async () => {
    const update = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true },
    );

    console.log(`The ${update.title} has been update`);
  })

  // Iteration 5 ——— Remove a recipe
  .then(async () => {
    const remove = await Recipe.deleteOne({ title: 'Carrot Cake' })
    console.log(`woops, no more Carrot Cake`);
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    mongoose.connection.close()
  })