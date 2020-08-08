const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../models/User');


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        User
            .findById(payload._id)
            .then(user => {
                return user ? done(null, user) : done(null, false);
            })
            .catch(err => done(err));
    }));
}