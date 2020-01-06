const express = require('express');
const router = express.Router();
const store = require('../store/register');

router.post('/registerAccount', function(req, res){
    console.log("Inside /registerAccount router.post");
    store.checkAccount({
        username: req.body.registerUsername,
    }).then(function(response) {
        if(!response.rowCount){
            store.registerAccount({
                username: req.body.registerUsername,
                password: req.body.registerPassword
            }).then(function(){
                res.status(200).json({url: "/"});
            }).catch(function(err){
                console.log(err);
                res.sendStatus(400);
            })
        }
    }).catch(function(err){
        console.log(err);
        res.sendStatus(400);
    });
});

module.exports = router;