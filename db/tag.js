var mysql = require('mysql');
var fs = require('fs');
var dao = require('./dao');
var sqls = {
    create: "create table blog(
    id int primary key,
    title varchar(1024) not null,
    content text not null,
    author varchar(64) not null,
    created datetime not null,

) engine = innodb
default charset utf8 ",

}
dao.query('SELECT 1 + 1 AS solution', function(rows) {
    console.log(rows);
});
