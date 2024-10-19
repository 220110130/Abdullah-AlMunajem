const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require(`morgan`);

const userRoutes = require('./src/api/routers/user');
const productRoutes = require('./src/api/routers/products');
const pageRoutes = require('./src/api/routers/pages');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/shoe-hub');

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(bodyParser.json({ limit: '10mb' }));

app.use(morgan('dev'));

app.use(cookieParser());

app.use('/', pageRoutes);
app.use('/api', productRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/a', (req, res) => {
    res.send('Hello World!');
  });
  