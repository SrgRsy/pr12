const users = require('../data/users.json');


routes.get('/users',(req,res) =>{
  res.send(users);
});


routes.get('/users/:id',(req,res) =>{
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