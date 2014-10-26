// var dao = require('./dao');
// var parser = require('./sqlparser')('blog');
//dao.execute(parser.getSql('droptable'));
//dao.execute(parser.getSql('createtable'));

var dao = require('./dao');
var parser = require('./sqlparser')('sysconf');
var sysconfDao = require('./sysconf');

// dao.execute(parser.getSql('droptable'));
// dao.execute(parser.getSql('createtable'));

sysconfDao.insert('token', 'wangye04');
sysconfDao.get('token', function(sysconf) {
    console.log(sysconf);
});

sysconfDao.get('token1', function(sysconf) {
    console.log(sysconf);
});
