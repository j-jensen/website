var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var flash = require('express-flash');
var User = require('./model/user');

module.exports.init = function (app) {
    app.use(expressSession({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false
    }));

    // Init pp
    passport.use(new LocalStrategy(function (name, password, done) {
        User.findByNamePassword(name, password, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, { message: 'Failed to login.' });

            done(null, user);
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.rowid);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/login', function (req, res) {
        res.render('login')
    });

    app.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};