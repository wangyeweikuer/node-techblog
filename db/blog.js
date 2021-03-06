var dao = require('./dao');
var parser = require('./sqlparser')('blog');

module.exports = {
    save: function(blog, callback) {
        var sql = parser.getSql('insert', blog);
        dao.execute(sql, function(rows) {
            if (callback)
                callback(rows);
        });
    },
    update: function(blog, callback) {
        var sql = parser.getSql('update', blog);
        dao.execute(sql, function(rows) {
            if (callback)
                callback(rows);
        });
    },
    list: function(page, callback) {
        var start = (page && page >= 0) ? page : 0;
        var sql = parser.getSql('list', {
            start: start,
            limit: 10
        });
        dao.query(sql, function(rows) {
            callback(rows);
        });
    },
    find: function(id, callback) {
        var sql = parser.getSql('find', {
            id: id
        });
        dao.query(sql, function(rows) {
            if (!rows || rows.length == 0) {
                callback(null);
            } else {
                callback(rows[0]);
            }
        });
    },
    remove: function(id) {
        var sql = parser.getSql('remove', {
            id: id
        });
        dao.execute(sql);
    },
    incrementViewCount: function(id) {
        var sql = parser.getSql('incrementViewCount', {
            id: id
        });
        dao.execute(sql);
    }
};
