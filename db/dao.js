var mysql = require('mysql');
var fs = require('fs');
var dbconf = require('./db.json');

function executeSqlTemplate(sql, params, callback) {
    var conn = mysql.createConnection(dbconf);
    conn.connect();
    try {
        console.log('sql:' + sql);
        conn.query(sql, params, function(err, rows, fields) {
            if (err)
                throw err;
            if (callback)
                callback(rows);
        });
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

module.exports = {
    execute: function(sql, callback) {
        executeSqlTemplate(sql, callback);
    },
    query: function(sql, sqlParamsArray, callback) {
        var params = sqlParamsArray instanceof Array ? sqlParamsArray : [];
        var cb = callback || sqlParamsArray;
        executeSqlTemplate(sql, params, cb);
    },
};
