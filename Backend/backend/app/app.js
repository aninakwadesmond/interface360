const express = require('express');
const fs = require('fs');
const Account = require('./account.json');
const { error } = require('console');
const path = require('path');
const cors = require('cors');
const filePath = path.join(__dirname, 'account.json');

const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 4000;
//fetching data
app.get('/login', (req, res) => {
  res.json(Account);
  console.log(`hello`);
});

//post /add data;
app.post('/login', (req, res) => {
  const { name, email, password } = req.body;
  const getId = Account.map((el) => el.id);
  const newData = {
    id: (getId.length > 0 ? Math.max(...getId) : 0) + 1,
    name,
    email,
    password,
  };
  const added = [...Account, newData];
  // fs.writeFile('./account.json', JSON.stringify(added), (error) =>
  //   console.log(error)
  // );
  // fs.writeFile('./account.json', JSON.stringify(added), (error) =>
  //   console.log(error)
  // );
  fs.writeFile(filePath, JSON.stringify([...Account, newData]), (error) =>
    console.log(error)
  );
  console.log(added);
  res.json(added);
});

//put or edit
app.put('/login:id', (req, res) => {
  const { id } = req.params;
  // const { name, email, password } = req.body;

  const oldData = Account[id];
  [('name', 'emial', 'password')].forEach((key) => {
    if (req.body[key]) {
      oldData[key] = req.body[key];
    }
  });
  res.json(Account);
  fs.writeFile(filePath, JSON.stringify(Account), (error) =>
    console.log(error)
  );
});
app.use((req, res, next) => {
  console.log('Incoming data:', req.body);
  next();
});

http: app.listen(port, () => console.log(`Listerning to port:${port}`));
