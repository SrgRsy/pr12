const express = require('express');
const userRout  = require('./routes/users');
const cardsRout = require('./routes/cards');
const app = express();
const { PORT = 3000 } = process.env;


app.use('/', userRout);
app.use('/', cardsRout);
app.use(express.static('public'));
app.use( (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
})

app.listen(PORT, () => {
    console.log(`Используется порт ${PORT}`);
})


