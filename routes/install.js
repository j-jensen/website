var express = require('express');
var router = express.Router();

var db = require('../data');
var version = require('../data/version-2');

router.get('/', function (req, res, next) {
    version(db, function (err, schema) {
        res.render('install', schema);
    });
});

module.exports = router;
