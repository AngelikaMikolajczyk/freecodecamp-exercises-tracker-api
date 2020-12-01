const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { createUser, findByUsername, findAllUsers } = require('./user-service');

require('./database-connection');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({extended: false}));

// create new user
app.post('/api/exercise/new-user', function(req, res){
  let username = req.body.username;

  findByUsername(username, function(err, data){
    if(err) {
      res.json({error: 'unexpected error'});
      return;
    } 
    if(data.username === username){
      res.status(400).send("Username already taken");
      return;
    }
    createUser(username, function(err, data){
      if(err){
        res.json({error: 'unexpected error'});
        return;
      }
      res.json({"username": data.username, "_id": data._id});
    })
  })
})

// generate list of all users
app.get('/api/exercise/users', function(req, res){
  findAllUsers(function(err, users){
    if(err){
      res.json({error: 'unexpected error'});
      return;
    }
    res.json(users);
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
