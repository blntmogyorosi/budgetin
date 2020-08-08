const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(msg => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Some error occurred while tried to connect to database');
        console.trace(err);
    });

module.exports = mongoose;