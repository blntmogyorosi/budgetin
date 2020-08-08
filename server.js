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

// Start the application
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}!`);
});