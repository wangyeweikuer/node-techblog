var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

function Parser(domain) {
    var f = fs.readFileSync(path.join(__dirname, domain + ".sql"), 'UTF-8');
    var array = f.split("\n");
    var map = {};
    var str = '';
    var key = '';
    for (var i in array) {
        var a = array[i].trim();
        if (a.length == 0) {
            continue;
        } else if (a.indexOf('#') == 0 || a.indexOf('--') == 0) {
            if (key.length != 0) {
                map[key] = str;
                str = '';
            }
            key = a.replace(/-|#/g, '');
        } else {
            str += array[i];
        }
    }
    map[key] = str;
    //
    this.getSql = function(key, params) {
        var sql = map[key];
        if (params) {
            if (typeof params == 'number' || typeof params == 'boolean' || typeof params == 'string') {
                var pattern = "\$\{.*\}";
                sql = sql.replace(pattern, mysql.escape(params));
            } else {
                for (var p in params) {
                    var pattern = "\$\{" + p + "\}";
                    sql = sql.replace(pattern, mysql.escape(params[p]));
                }
            }
        }
        return sql;
    }
    return this;
}

module.exports = function(domain) {
    return new Parser(domain);
};
