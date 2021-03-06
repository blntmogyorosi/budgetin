// Load Config and Database
require('./config/config');
require('./config/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

// Load custom routes
const usersRoutes = require('./routes/api/users');
const categoriesRoutes = require('./routes/api/categories');
const unitsRoutes = require('./routes/api/units');
const transactionsRoutes = require('./routes/api/transactions');
const productsRoutes = require('./routes/api/products');


const app = express();

// Apply basic middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Apply passport middleware for authentication
app.use(passport.initialize());
require('./config/passport')(passport);

// Apply custom routes
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/units', unitsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/products', productsRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Start the application
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}!`);
});