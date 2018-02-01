const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session.loginbean);  
    res.render('user', { title: '<div>Heheda</div>' });
});

router.all('/login',(req,res)=>{
  const subflag = req.body['subflag'];
  console.log(subflag);
  if(subflag){
    UserModel.login(req,res);
  }else {
  res.render('login',{});
  }
});

router.post('/register',(req,res)=>{
  UserModel.register(req,res);
});

router.get('/register',(req,res)=>{
  const name = req.query['name'];
  console.log(name);
  res.send('heheda');
});


module.exports = router;
