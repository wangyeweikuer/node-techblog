// var dao = require('./dao');
//dao.query('select now()',function(rows,fields){
//   console.log(rows);
//});
var blog = require('./blog');
// blog.save({
//     title: 'title',
//     content: '```javascript\nvar x = 1;```',
//     author: 'wangye',
//     tags: 'javascript,nodejs'
// });
blog.find(1, function(rows) {
    console.log(rows);
});
