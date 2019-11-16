const users = require('../data/users.json');
const userRout = require('express').Router();


userRout.get('/users',(req,res) =>{
  res.send(users);
});


userRout.get('/users/:id',(req,res) =>{
  const {id} = req.params;
    const user = users.find(user => {
      return user._id == id
    })
    if (user) {
      res.send(user)
    }else{
      res.status(404).send({ "message": "Нет пользователя с таким id" });
    }
});


module.exports = userRout;