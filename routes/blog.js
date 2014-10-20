var express = require('express');
var marked = require('marked');
var dao = require('../db/blog');
var strftime = require('strftime');
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
    res.redirect('/blog/list');
});
router.get("/", function(req, res) {
    res.redirect('/blog/list');
});

function sendResultOrError(httpResponse, err, html) {
    if (err) {
        console.log(err);
        httpResponse.status(500).send(err);
        return false;
    }
    httpResponse.send(html);
    return true;
}

function processBlog(blog) {
    //处理时间
    blog.displayCreated = strftime('%Y-%m-%d', blog.created);
    //处理tag
    if (blog.tags && blog.tags.length > 0) {
        blog.displayTags = blog.tags.split(',');
    }
    return blog;
}
router.get('/detail', function(req, res) {
    var id = req.param('id');
    dao.find(id, function(blog) {
        res.render('blog/detail', processBlog(blog), function(err, html) {
            if (sendResultOrError(res, err, html)) {
                dao.incrementViewCount(id);
            }
        });
    });
})

router.get('/list', function(req, res) {
    dao.list(0, function(rows) {
        for (var i in rows) {
            rows[i] = processBlog(rows[i]);
        }
        res.render('blog/list', {
            bloglist: rows
        }, function(err, html) {
            sendResultOrError(res, err, html);
        });
    });
});

router.get('/edit', function(req, res) {
    res.render('blog/edit', function(err, html) {
        sendResultOrError(res, err, html);
    });
});

//提交blog
router.post('/save', function(req, res) {
    var blog = {
        content: req.param('content'),
        title: req.param('title'),
        author: req.param('author'),
        tags: req.param('tags'),
    };
    if (!blog.content || blog.content.length == 0 ||
        !blog.title || blog.title.length == 0 ||
        !blog.author || blog.author.length == 0) {
        res.status(400).send('(no data)');
        return;
    }
    marked(blog.content, function(err, content) {
        blog.displayContent = content;
        dao.save(blog, function(rows) {
            res.send('ok');
        });
    });
});

router.post('/preview', function(req, res) {
    var content = req.param('content');
    if (!content || content.length == 0) {
        res.send('(no data)');
        return;
    }
    marked(content, function(err, content) {
        sendResultOrError(res, err, content);
    });
});

module.exports = router;
