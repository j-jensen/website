var sqlite = require('sqlite3');
var db = new sqlite.Database("test.db");

 

module.exports = {
    getTest : function(err, test){
        db.serialize(function(){
                db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

                var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                for (var i = 0; i < 10; i++) {
                    stmt.run("Ipsum " + i);
                }
                stmt.finalize();
        });

        db.all("SELECT rowid AS id, info FROM lorem", function(err, rows) {
                test(err, rows);
            });
    }
};