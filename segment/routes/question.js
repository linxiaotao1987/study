const express = require('express');
const router = express.Router();
const checkSession = require('../jsbean/CheckSession');
const questionModel = require('../models/questionModel');


router.all('/ask', function(req, res, next) {
    const loginbean = checkSession.check(req,res);
    const subflag = req.body['subflag'];
    if(!loginbean){return;}
    if(subflag){
        questionModel.ask(req,res);
    } else {
        res.render('ask',{loginbean:loginbean});
    }    
});

router.get('/detail', function(req, res, next) {
    res.send('success');
});

module.exports = router;
