const { Router } = require('express');
const db = require('../db/index.js');
const router = Router();

router.get('', (req, res, next) => {
  console.log('hello11111 ');
  db.query('select * from suppliers', (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
});

module.exports = router;
