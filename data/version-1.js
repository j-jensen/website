

module.exports = function (db, cb) {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='db_schema';", function (err, row) {
        if (!row) {
            db.run("CREATE TABLE db_schema (version INTEGER);", function () {
                db.run('INSERT INTO db_schema (version) VALUES(?)', 1, function () { cb(null, { version: 1 }) });
            });
        } else {
            db.get('select version from db_schema', function (err, schema) {
                //console.log('Schema version', version);
                cb(null, schema);
            });
        }
    });
};
