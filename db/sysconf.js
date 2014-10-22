var dao = require('./dao');
var parser = require('./sqlparser')('sysconf');
module.exports = {
    insert: function(sckey, scvalue) {
        var sql = parser.getSql('insert', {
            "sckey": sckey,
            "scvalue": scvalue
        });
        dao.execute(sql);
    },
    get: function(sckey, callback) {
        var sql = parser.getSql('get', {
            sckey: sckey
        });
        dao.query(sql, function(rows) {
            if (rows && rows.length > 0) {
                callback(rows[0]);
            } else {
                callback(null);
            }
        });
    }
}
