var db = require('../data'); 

module.exports = {
    getTest : function(callback){
         db.all("SELECT rowid AS id, * FROM user", callback);
    }
};