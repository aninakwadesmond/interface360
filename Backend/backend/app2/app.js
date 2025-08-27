const express = require('express');
const cors = require('cors');
const carsRoutes = require('./routes/routes');

const app = express();
const port = 3000;

//cross sectional data permission with cors
app.use(cors());
// app.use(express.json());

// console.log(carsRoutes);
app.get('/carpack', (req, res, next) => {
  console.log('getting carpack ');
});

app.use('/cars', carsRoutes);

// app.use((err, req, res, next) => res.json(err));

app.listen(port, () => console.log(`Listening to port: ${port}`));
