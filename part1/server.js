var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
let bodyParser = require('body-parser');
let fs = require('fs');

app.use(bodyParser.json());

app.get('/hello', function(req, res) {
  res.send("Hello");
});

app.post('/create/:name', (req, res) =>{
  let user = {
    id: 2,
    name: req.params.name
  }
  res.send(user);
});

app.get('/', (req, res) => {
  let index = fs.readFileSync('part1/index.html', 'utf8');
  res.send(index);
});

app.get('/verify/:age', (req, res) => {
  if(req.params.age > 13){
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
