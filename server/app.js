const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// create an array to store our recipes
let recipes = [
  {
    id: 1,
    name: 'Nutella Powder',
    ingredients: [
      {
        name: 'Nutella',
        amount: 60,
        unit: 'grams',
      },
      {
        name: 'Tapioca Maltodextrin Powder',
        amount: 40,
        unit: 'grams',
      },
    ],
    instructions: 'Weigh the stuff. Mix it together. Blend it. Enjoy!',
  },
  {
    id: 2,
    name: 'Bittman Chinese Chicken With Bok Choy',
    ingredients: [
      {
        name: 'Chicken Breast',
        amount: 2,
        unit: 'units',
      },
      {
        name: 'Bok Choy',
        amount: 1,
        unit: 'units',
      },
      {
        name: 'Sauce',
        amount: 1,
        unit: 'deciliters',
      },
    ],
    instructions:
      'Make sauce. Steam bok choy and chicken. Carry on steaming. Pour sauce over.',
  },
  {
    id: 3,
    name: "Brogrammer's Dream",
    ingredients: [
      {
        name: 'Pizza',
        amount: 1,
        unit: 'units',
      },
    ],
    instructions: 'Order a pizza, delivered. Preferably your favorite. Eat it.',
  },
]

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,Authorization',
  )
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next()
})

// GET
app.get('/recipes', (req, res) => {
  const ingredient = req.query.ingredient
  if (!ingredient) {
    return res.json(recipes)
  }
  const filteredRecipes = recipes.filter(r =>
    r.ingredients.some(
      ing => ing.name.toLowerCase().indexOf(ingredient.toLowerCase()) != -1,
    ),
  )
  if (!filteredRecipes.length)
    return res
      .status(404)
      .json({ message: 'No recipes found with the given ingredient.' })
  res.json(filteredRecipes)
})

// GET recipe by id
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id))
  if (!recipe)
    return res
      .status(404)
      .json({ message: 'The recipe with the given ID was not found.' })
  res.json(recipe)
})

// POST recipe
app.post('/recipes', (req, res) => {
  // create new recipe object from the data in the request body
  const newRecipe = {
    id: req.body.id,
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  }

  // add new recipe to the array
  recipes.push(newRecipe)

  res.json(newRecipe)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
