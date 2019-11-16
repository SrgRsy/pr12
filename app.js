const express = require('express');
const routes = require('express').Router();
const app = express();
const { PORT = 3000 } = process.env;


app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Используется порт ${PORT}`)
})


module.exports = routes;