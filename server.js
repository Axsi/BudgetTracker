const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');




app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server running on " + process.env.PORT)
});