var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var User = require('./model/user');

module.exports.init = function(app) {
    app.use(expressSession({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false
    }));

    // Init pp
    passport.use(new LocalStrategy(function(username, password, done) {
        console.log('Verify...');
        return done(null, {
            id: 1234,
            username: username
        });
    }));
    passport.serializeUser(function(user, done) {
        console.log('Serialize...');
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('Deserialize...');
        done(null, {
            id: id
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login'
    }));

    app.get('/login', function(req, res) {
        res.render('login')
    });

    app.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};