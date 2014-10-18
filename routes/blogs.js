var express = require('express');
var marked = require('marked');
var router = express.Router();

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
    },
});
router.get("", function(req, res) {
    res.redirect('/blogs/list');
});
router.get("/", function(req, res) {
    res.redirect('/blogs/list');
});

router.get('/list', function(req, res) {
    res.render('list', {}, function(err, html) {
        res.send(html);
    });
});

router.get('/edit', function(req, res) {
    res.render('edit', function(err, html) {
        res.send(html);
    })
});

//提交blog
router.post('/save', function(req, res) {
    res.send('ok');
});

router.post('/preview', function(req, res) {
    var content = req.param('content');
    if (!content || content.length == 0) {
        res.send('(no data)');
        return;
    }
    marked(content, function(err, content) {
        if (err) {
            res.status(500).send(err);
        }
        res.send(content);
    });
});

module.exports = router;
