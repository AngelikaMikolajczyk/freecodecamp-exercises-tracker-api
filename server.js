const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { createUser } = require('./user-service');

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

  createUser(username, function(err, data){
    if(err){
      res.json({error: 'unexpected error'});
      return;
    }
    res.json({"username": data.username, "_id": data._id});
  })
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
