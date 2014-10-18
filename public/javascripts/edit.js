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
        $.post('/blogs/preview', {
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
    $('.title input,.editor').focus(function(event) {
        if ($(this).hasClass('editor')) {
            $(this).addClass('focus');
        } else {
            $(this).parent().addClass('focus');
        }
    }).blur(function(event) {
        if ($(this).hasClass('editor')) {
            $(this).removeClass('focus');
        } else {
            $(this).parent().removeClass('focus');
        }
    });
    $title.focus();
    placeholder();
    //发布内容
    $('button.publish').click(function() {
        var value = $editor[0].outerText;
        if (!value || value.lenght == 0) {
            $topmsg.showTopmsg('error', '发布内容为空！');
            return;
        }
        $.post('/blogs/save', {
            content: value
        }).fail(function(err) {
            $topmsg.showTopmsg('error', err);
        }).done(function(data) {
            window.location.href = "/blogs/list";
        });
    });
    //返回
    $('button.goback').click(function(event) {
        window.location.href = "/blogs/list";
    });
    //
    $topmsg.find('span.close').click(function(event) {
        $topmsg.closeTopmsg();
    });
});
