var db = require('../data');

module.exports = {
    findById: function(id, cb) {
        db.get('select * from user where id = @id', id, cb);
    }
};