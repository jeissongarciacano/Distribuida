const mysql = require('mysql');

function read(connection, callback){
    connection.query('SELECT * FROM products', function (err, result){
        if(err) throw err;
        callback(result);
    });
}

module.exports = {read};