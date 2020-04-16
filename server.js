const express = require('express'),
      app = express(),
      {Client}= require('pg'),
      http = require('http').createServer(app),
      io = require('socket.io').listen(http),
      bcrypt = require('bcrypt');

const client = new Client({
  user: "testuser",
  password: "testPassword",
  host: "localhost",
  database: "testdb"
});

client.connect((err) => {
  if (err) throw err;
  else{
    console.log('conntected to database')
  }
});

client.query('select * from students')
.then(results => console.table(results.rows))
