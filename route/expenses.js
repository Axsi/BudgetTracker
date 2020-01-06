const express = require('express');
const router = express.Router();
const store = require('../store/expenses');

router.post('/addExpense',function(req, res){
    store.addExpense(req.body)
        .then(function(response){
            res.sendStatus(200);
        }).catch(error=>{
            console.log(error);
            res.sendStatus(400);
    })
});

router.get('/getExpenses/:userID',function(req, res){
    console.log("USERID: " + req.params.userID);
    store.getExpenses(req.params.userID)
        .then(function(response){
            res.status(200).json(response);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
});

router.put('/updateExpense',function(req, res){
    store.updateExpense(req.body)
        .then(function(response){
            res.status(200).json(response);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
});

router.delete('/deleteExpense',function(req,res){
    store.deleteExpense(req.body)
        .then(function(response){
            res.status(200).json(response);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
});

router.post('/setBudget',function(req,res){
    store.checkBudget(req.body)
        .then(function(response){
            let boolean = false;
            if(!response.rowCount){
                boolean = true;
            }
            store.setBudget(req.body, boolean)
                .then(function(response){
                    res.status(200).json(response);
                }).catch(err=>{
                    console.log(err);
                    res.sendStatus(404);
            })
        }).catch(function(err){
        console.log(err);
        res.sendStatus(404);
    })
});

router.get('/getBudget/:userID',function(req,res){
    store.getBudget(req.params.userID)
        .then(function(response){
            res.status(200).json(response);
        }).catch(err=>{
            console.log(err);
            res.sendStatus(404);
    })
});



module.exports = router;