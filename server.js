const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const register = require('./route/register');
const expenses = require('./route/expenses');
const crypto = require('crypto');

const db = require('./db');
const pool = db.pool;

app.use(bodyParser.json());
app.use('/', register);
app.use('/',expenses);



app.use(passport.initialize());
app.use(passport.session());


app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(user !== false){
            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }
                res.json({url: "/userhub", username: req.user.rows[0].username, userID: req.user.rows[0].accountid})
            })
        }
    })(req, res, next);
});


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server running on " + process.env.PORT)
});

//=========PassportJS==============
passport.use(new LocalStrategy(
    function(username, password, done){
        pool.query('SELECT * FROM accounts where username=$1', [username], (error, user)=>{
            if(error){
                return done(error);
            }
            if(!user){
                return done(null, false);
            }
            db.authenticate({username: username, password: password})
                .then(function(response){
                    if(!response){
                        return done(null, false);
                    }else{
                        return done(null, user);
                    }
                })
        })
    }
));

passport.serializeUser(function(user, done){
    done(null, user.rows[0].username);
});

passport.deserializeUser(function(username, done){
    pool.query('SELECT * FROM accounts WHERE username=$1', [username], function(err, user){
        if(err){
            return done(err);
        }else{
            done(null, user);
        }
    })
});

//=================================