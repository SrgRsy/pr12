const express = require('express');
const app = express();
const routes = require('./routes');

const { PORT = 3000 } = process.env;



app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

