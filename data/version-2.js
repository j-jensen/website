var previous = require('./version-1');

module.exports = function (db, cb) {
    previous(db, function (err, schema) {
        if (err || !schema)
            cb(new Error('Cannot upgrade db-schema'));

        if (schema.version == 1) {
            db.run("CREATE TABLE user (email VARCHAR(80) NOT NULL UNIQUE, name VARCHAR(50) NOT NULL UNIQUE, password CHAR(41) NOT NULL);", function () {
                db.serialize(function () {
                    db.run('INSERT INTO user (email, name, password) VALUES(?, ?, ?)', '@', 'admin', 'secret');
                    db.run('UPDATE db_schema SET version=?', 2);
                    cb(null, { version: schema.version });
                });
            });
        } else {
            // Do we ever get here???
            cb(null, schema);
        }
    });
};
