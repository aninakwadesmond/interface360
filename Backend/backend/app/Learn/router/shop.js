const { Router } = require('express');
const routerShop = Router();
const db = require('../db/db');

routerShop.post('/', (req, res, next) => {
  console.log('helloShop');
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(208).json({
      success: false,
      message: 'username,password and email are all required',
    });
  }
  console.log(username, email, password);
  db.query(
    'insert into ShopLogin(username, email,password) values (? , ?, ?)',
    [username, email, password],
    (err, data) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: 'login successful',
        data: data[0],
      });
    }
  );
});

routerShop.post('/cart', (req, res, next) => {
  const { category, price, title, image } = req.body;
  console.log(category, price, title, image);
  db.query(
    'insert into cart(category, price, title, image) values(? , ?, ?, ?)',
    [category, price, title, image],
    (err, data) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        data: data,
      });
    }
  );
});
routerShop.get('/get', (req, res, next) => {
  db.query('select * from cart', (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
});

routerShop.get('/:username/:password', (req, res, next) => {
  console.log('hello');
  const { username, password } = req.params;
  console.log(username, password);

  if (!username || !password) {
    return res.status(203).json({
      status: false,
      message: 'username and password must be provided',
    });
  }
  db.query(
    `select * from ShopLogin where username = '${username}' and password= '${password}'`,
    (err, data) => {
      if (err) return next(err);
      console.log('hello2');
      if (data.length === 0) {
        console.log('object', data);
        return res.status(207).json({
          status: false,
          message: 'Account is not registered',
        });
      }
      // console.log(data);
      console.log('object2', data);
      return res.status(200).json({
        status: true,
        data: data,
        message: 'Login scuccessful',
      });
      // // return res.json(data);
    }
  );
});

routerShop.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  db.query(`delete  from cart where id=?`, [id], (err, data) => {
    if (err) return next(err);
    return res.status(200).json({
      status: 200,
      message: 'Succesffuly removed',
    });
  });
});

module.exports = routerShop;
