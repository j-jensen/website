var sqlite = require('sqlite3');
var db = new sqlite.Database("test.db");

db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT);");
db.run("DELETE FROM lorem;");

var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
}
stmt.finalize();
                
module.exports = function(){
    return db;
};