var express = require('express');
var router = express.Router();

var test = require('../controllers/test');

/* GET users listing. */
router.get('/', function(req, res, next) {
      test.getTest( function(err, obj){
            res.render('users',{users: obj});
      });
});

module.exports = router;
