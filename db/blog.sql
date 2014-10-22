##droptable
drop table IF exists blog;

##createtable
CREATE TABLE IF not exists blog( 
    id int PRIMARY KEY auto_increment,
    title varchar(1024) NOT NULL,
    content text NOT NULL comment 'markdown text',
    displayContent text NOT NULL comment 'renderered html',
    author varchar(64) NOT NULL,
    created datetime NOT NULL,
    modified datetime NOT NULL,
    tags varchar(255) NOT NULL,
    score int DEFAULT 0,
    scorecount int DEFAULT 0,
    viewcount int DEFAULT 0
) engine = innodb DEFAULT charset utf8;

##list
SELECT * from blog order by created desc limit ${start},${limit};

##insert
insert into blog (title,content,displayContent,author,tags,created,modified) 
values (${title},${content},${displayContent},${author},${tags},now(),now());

##update
update blog set title = ${title},content = ${content},displayContent = ${displayContent},
    author = ${author},tags = ${tags},modified = now() where id = {id}

##find
SELECT * from blog where id = ${id}

##incrementViewCount
update blog set viewcount = viewcount + 1 where id = ${id}

##remove
delete from blog where id = ${id}