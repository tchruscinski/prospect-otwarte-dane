var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'K1zM2B8fPZ',
  password : 'j1vHV2gmfd',
  database : 'K1zM2B8fPZ'
});
 
connection.connect();

module.exports = connection;