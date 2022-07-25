const express = require('express');
const app = express();  
const mysql = require('mysql2'); 
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

connection.connect(function(err){
    if (err) throw err;
    connection.query('SELECT * FROM products', function (err, result){
        if(err) throw err;
        console.log(result);
        //puintodom(result);
    });
});

app.listen(5000, () => {
    console.log('servidor en puerto 5000');
});

function puintodom(result){
    const inputRef = useRef(null);
    const element = inputRef.current;
    var elem = document.getElementById('frame');
    for (let i = 0 ; i < Object.keys(result).length; i++) {
        var name = result[i].product_name;
        var description = result[i].product_description;
        var text = '<div class="card" ><h5 class="card-title">' + name + '</h5>' + '<p class="card-text">' + description + '</p></div>';
        elem.appendChild(text);
    }
}
