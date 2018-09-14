var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
let bodyParser = require('body-parser');
let fs = require('fs');



app.use(bodyParser.json());

app.get('/', function(req, res) {
  let data = fs.readFileSync('part2/storage.json', 'utf8')
    res.send(data);
});

app.post('/create/:name/:age', (req, res) => {
  let storage = fs.readFileSync(__dirname + '/storage.json', 'utf8');
  let data = JSON.parse(storage);
  let user = {
    name: req.params.name,
    age: req.params.age
  }

  data.push(user)
  fs.writeFileSync(__dirname + '/storage.json', JSON.stringify(data));
  res.send(data);
})

app.get('/:name', (req, res) => {
  let firstObj = JSON.parse(fs.readFileSync('part2/storage.json', 'utf8'));
  let user = firstObj.find(el => {
    return el.name === req.params.name
  })
  if(user){
    res.send(user)
  } else {
    res.sendStatus(400);
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
