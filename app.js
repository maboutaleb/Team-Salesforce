const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// require('dotenv/config');
const dotenv = require('dotenv');
const postRoute = require('./routes/userposts');
const path = require('path');

//CONNECT TO DIR PATH INDEX.HTML
app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});
//Parsing JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
// const { urlencoded } = require('body-parser');
// app.use(bodyParser, urlencoded({ extended: false }));

//import Routes
const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);

const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

const statusRoutes = require('./routes/statuses');
app.use('/statuses', statusRoutes);

const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);

const authRoute = require('./routes/auth');

const postsReservation = require('./routes/reservations');
app.use('/reservations',postsReservation);

const seatsRoutes=require('./routes/seats')
app.use('/seats',seatsRoutes)

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


// const tableRoutes = require('./routes/tables');
// app.use('/tables', tableRoutes);
//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});


dotenv.config();
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
);

//Middleware
app.use(express.json());

// start listening
app.listen(3000, () => console.log('Server up and running port:3000'));