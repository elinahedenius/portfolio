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

//connect to database
client.connect((err) => {
  if (err) throw err;
  else{
    console.log('conntected to database')
  }
});

//start the server
http.listen(3000, (err) => {
  if (err) throw err;
  else{
    console.log('server started')
  }
})

app.use(express.static(__dirname + '/public/'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
})
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
})

client.query('select * from students')
.then(res => console.log(res.rows))

io.sockets.on('connection', (socket) => {

  //student login
  socket.on('student login', (data) => {
    client.query('select * from students')
    .then((res) => {
      console.log(res.rows)
      for(var i in res.rows){
        if(data.email == res.rows[i].email){
          if(data.password == res.rows[i].password){
            console.log('sucess')
          }
          else{
            console.log('wrong password')
          }
        }
        else{
          console.log('no uesr with that email')
        }
      }
    })
  })

  //teacher login
  socket.on('teacher login', (data) => {
    client.query('select * from teachers')
    .then((res) => {
      console.log(res.rows)
      for(var i in res.rows){
        if(data.email == res.rows[i].email){
          if(data.password == res.rows[i].password){
            console.log('sucess')
          }
          else{
            console.log('wrong password')
          }
        }
        else{
          console.log('no user with that email')
        }
      }
    })
  })

})
