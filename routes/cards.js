const cards =  require('../data/cards.json');

routes.get('/cards',(req,res) =>{
  res.send(cards);
});

