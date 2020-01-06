const env = require('dotenv').config();
const pg = require('pg/lib'); //?
const crypto  = require('crypto');
const tables = require('./migrations/tables');

//pool config object is optional
const config = {
  user: process.env.DB_USERNAME, //password and username could be wrong
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

const pool = new pg.Pool(config);

//whenever the pool establishes a new client connection to the postgresql backend, it will emit the specified connect
//event. This presents an opportunity for you to run setup commands on a client
pool.on('connect', ()=>{
    console.log("connected to the database");
});

const createTables = async () =>{
    try{
        let accounts = await pool.query(tables.accountTable);
        console.log(accounts);
        let expenses = await pool.query(tables.expenseTable);
        console.log(expenses);
        let budgets = await pool.query(tables.budgetTable);
        console.log(budgets);
    }catch(err){
        console.log(err);
    }
};


//======= Helper Functions ==============
function generateSalt(){
    return crypto.randomBytes(4).toString('hex');
}

function hashPassword(password){
    let salt = generateSalt();
    let hashedPassword = crypto.createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return {saltKey: salt, passwordHash: hashedPassword};
}

function authenticate(loginData){
    return pool.query('SELECT * FROM accounts WHERE username=$1', [loginData.username])
        .then(function(response){
            if(response.rows === 0){
                return false;
            }
            let hashedPassword = crypto.createHmac("sha256", response.rows[0].salt)
                .update(loginData.password)
                .digest("hex");
            return hashedPassword === response.rows[0].passwordhash;
        })
}

//=======================================

module.exports ={
    pool,
    hashPassword,
    authenticate,
    createTables
};

require('make-runnable');