const express = require('express')
const validator = require('validator')

const app = express()

// Exercise 1:
app.get('/greetings/:username', (request, response) => {
  response.send(`Hello there, ${request.params.username}!`)
})

// Exercise 2:
app.get('/roll/:number', (request, response) => {
  if (!validator.isInt(request.params.number)) {
    response.send("You must specify a number.")
  }
  else {
    const number = Math.floor(Math.random() * ( request.params.number - 0))
    response.send(`You rolled a ${number}`)
  }
})

// Exercise 3:
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get("/collectibles/:index", (request, response) => {
  const index = request.params.index
  if (index >= collectibles.length || index < 0) {
    response.send(`This item is not yet in stock. Check back soon!`)
  }
  else {
    response.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`)
  }
})

// Exercise 4:
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (request, response) => {
  const minPrice = request.query["min-price"]
  const maxPrice = request.query["max-price"]
  const type = request.query.type
  const filteredShoes = []

  if (minPrice) {
    shoes.forEach((shoe) => {
      if (shoe.price >= minPrice) {
        filteredShoes.push(`Name: ${shoe.name}, Price: ${shoe.price}, type: ${shoe.type}`)
      }
    })
    response.send(filteredShoes)
  }
  else if (maxPrice) {
    shoes.forEach((shoe) => {
      if (shoe.price <= maxPrice) {
        filteredShoes.push(`Name: ${shoe.name}, Price: ${shoe.price}, type: ${shoe.type}`)
      }
    })
    response.send(filteredShoes)
  }
  else if (type) {
    shoes.forEach((shoe) => {
      if (shoe.type === type) {
        filteredShoes.push(`Name: ${shoe.name}, Price: ${shoe.price}, type: ${shoe.type}`)
      }
    })
    response.send(filteredShoes)
  }
  else {
    response.send(shoes)
  }
})

app.listen(3000, () => {
})