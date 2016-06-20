var db = require('../data');

module.exports = {
    findByNamePassword: function (name, password, callback) {
        db.get('select rowid, * from user where name = @name and password=@password', name, password, callback);
    },
    findById: function (id, callback) {
        db.get('select rowid, * from user where rowid = @id', id, callback);
    },
};