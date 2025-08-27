const { Router } = require('express');
const db = require('../db/db');
const router = Router();

router.get('/', (req, res, next) => {
  db.query('select * from learned', (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
});

//get by category
router.get('/:category', (req, res, next) => {
  const { category } = req.params;
  console.log(category);
  db.query(
    'select * from learned where category=(?)',
    [category],
    (err, data) => {
      if (err) return next(err);
      // console.log(data);
      return res.json(data);
      // return res.redirect('/toLearn');
    }
  );
});

router.get('/:id/:named', (req, res, next) => {
  console.log('hello get 1');
  const { id, named } = req.params;
  // console.log(id, named);
  db.query(`select ${named} from learned where id=?`, [id], (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
});

//working
router.post('/', (req, res, next) => {
  console.log('dominic');
  const { text, category } = req.body;
  console.log(req.body);
  console.log(text, category);
  db.query(
    'insert into learned(text, category) value (?, ?)',
    [text, category],
    (err, data) => {
      if (err) return next(err);
      // return res.json(data);
      return res.redirect('/toLearn');
    }
  );
});

router.put('/put', (req, res, next) => {
  console.log('hello push ');
  const { named, id, curNumber } = req.body;
  console.log(named, id, curNumber);
  db.query(
    `update learned set ${named}=? where id =? `,
    [+curNumber, id],
    (err, data) => {
      if (err) return next(err);
      // console.log(data, res.json(data));
      // return res.json(data);
      // return res.json(data);
      return res.status(200).json({
        success: true,
        message: 'Update successful',
        data: data[0],
      });
      return res.redirect('/toLearn');
    }
  );
  // [named].forEach((key) => {});
});

// router.put('/', (req, res, next) => {
//   const { named, id, count } = req.body;
//   console.log(named, id, count);
//   // router.get('/', (req, res, next) => {
//   //   console.log('object');
//   //   db.query('Select * from learned wheere id = ?', [id], (err, data) => {
//   //     if (err) return next(err);
//   //     console.log(data);
//   //   });
//   // });
//   const counter = 0;

//   // console.log('hello put 1');
//   // console.log({ named, id });
//   // console.log(req.body);

//   // const { named, id } = req.body;
//   // console.log(named, id);
//   // console.log(req.body['like']);
//   // // console.log(name, id);
//   // const field = [];
//   // const keys = ['like', 'mindblowing', 'dislike'];
//   // console.log(keys, field);
//   // keys.forEach((el) => {
//   //   if (el === req.body.el) {
//   //     field.push(el);
//   //   }
//   // });
//   // console.log(field);
//   // console.lo
//   // g('hello 2');

//   // array.forEach((element) => {});
//   [named].forEach((element, index) => {
//     db.query(
//       `update learned set ${element}=? where id = ?`,
//       [count, id],
//       (err, data) => {
//         if (err) return next(err);

//       }
//     );
//   });
// });

module.exports = router;
