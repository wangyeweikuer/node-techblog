##droptable
drop table IF exists sysconf;

##createtable
CREATE TABLE IF not exists sysconf( 
    id int PRIMARY KEY auto_increment,
    sckey varchar(255) not null,
    scvalue varchar(255) not null,
    unique key (sckey)
) engine = innodb DEFAULT charset utf8;

##get
SELECT scvalue from sysconf where sckey = ${sckey}

##insert
insert into sysconf (sckey,scvalue) values(${sckey},${scvalue});
