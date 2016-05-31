var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.format({
    text: function (params) {
      res.send('Users...');
    },
    html: function (params) {
      res.send('<ul><li>Jesper</li><li>Kari</li></ul>');
    },
    'application/json': function (params) {
      res.send([{name:'Jesper'}, {name: 'Kari'}])
    }
    
  });
});

module.exports = router;
