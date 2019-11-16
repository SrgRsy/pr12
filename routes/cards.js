const cards =  require('../data/cards.json');
const cardsRout = require('express').Router();

cardsRout.get('/cards',(req,res) =>{
  res.send(cards);
});

module.exports = cardsRout;