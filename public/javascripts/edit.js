(function($) {
    //关闭提示消息
    $.fn.closeTopmsg = function() {
        $(this).hide();
        $(this).find('span.info').text('');
        $(this).removeClass('error').removeClass('warn');
    };
    //打开提示消息
    $.fn.showTopmsg = function(type, info) {
        $(this).find('span.info').text(info);
        $(this).removeClass('error').removeClass('warn');
        if (type != 'success') {
            $(this).addClass(type);
        }
        $(this).show();
        var $t = $(this);
        setTimeout(function() {
            $t.hide()
        }, 3000);
    };

})($);
$(function() {
    var $editor = $('.editor');
    var $previewer = $('.previewer');
    var $title = $('.title input');
    var $topmsg = $('.topmsg');
    var placeholder = function() {
        $previewer.text($previewer.attr('data-placeholder'));
    };
    //自动预览
    $('body').keyup(function(event) {
        var value = $editor[0].outerText;
        if (!value || value.lenght == 0) {
            placeholder();
            return;
        }
        $.post('/blog/preview', {
            content: value
        }).fail(function(err) {
            $topmsg.showTopmsg('error', err);
        }).done(function(data) {
            $previewer.empty().html(data);
            $('code').addClass('hljs');
            $editor.height($previewer.height());
            $topmsg.showTopmsg('success', '预览成功！');
        });
    });
    //输入聚焦
    $('.info input,.editor').focus(function(event) {
        $(this).parent().addClass('focus');
    }).blur(function(event) {
        $(this).parent().removeClass('focus');
    });
    $title.focus();
    placeholder();
    //发布内容
    $('button.publish').click(function() {
        $.post('/blog/save', {
            title: $('input[name="title"]').val().trim(),
            tags: $('input[name="tags"]').val().trim(),
            author: $('input[name="author"]').val().trim(),
            content: $editor[0].outerText
        }).fail(function(err) {
            $topmsg.showTopmsg('error', err);
        }).done(function(data) {
            window.location.href = "/blog";
        });
    });
    //返回
    $('button.goback').click(function(event) {
        window.location.href = "/blog";
    });
    //
    $topmsg.find('span.close').click(function(event) {
        $topmsg.closeTopmsg();
    });
});
