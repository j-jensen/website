var db = require('../data')('1.0'); 

module.exports = {
    getTest : function(err, test){
        db.all("SELECT rowid AS id, info FROM lorem", function(err, rows) {
                test(err, rows);
            });
    }
};