const express = require('express');
const app = express();  
const mysql = require('mysql'); 
const port = 5000; 
require('dotenv').config();
const path = require('path');
app.use('/public', express.static('public'));

app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, 'Home.html'));
});

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if(err) throw err;
    console.log('connected to database');
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/read', (req, res) => {
    read(
        connection, 
        (result) => {
            res.json(result);
        }
    );
});


app.listen(5000, () => {
    console.log('servidor en puerto 5000');
});

function read(connection, callback){
    connection.query('SELECT * FROM products', function (err, result){
        if(err) throw err;
        callback(result);
    });
}

module.exports = {read};