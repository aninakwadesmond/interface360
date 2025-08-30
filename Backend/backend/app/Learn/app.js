const express = require('express');
const cors = require('cors');
const router = require('./router/router');
const routerShop = require('./router/shop');
require('dotenv').config();

const app = express();
//port to connect;

const port = 5000;

//set middlewares;
app.use(cors());
app.use(express.json());

//api request
app.use('/toLearn', router);
app.use('/shop', routerShop);

//handling error;
app.use((err, req, res, next) => res.json(err));

app.listen(port, () => console.log(`Listening to port:${port}`));
