var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var User = require('./model/user');

module.exports = function (app) {
    app.use(expressSession({
        secret: 'mySecretKey'
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Init pp
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (id, done) {
        done(err, {
            username: id
        });
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            done(null, {
                'username': username
            });
        }));

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/users',
        failureRedirect: '/'
    }));
    app.get('/login',function(req, res){res.render('login')})
};