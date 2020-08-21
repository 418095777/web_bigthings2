$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length >= 6) {
                return '昵称长度为1 ~ 6位之间!'
            }
        }
    })
    initUserInfo()
    // 2.初始化用户的基本信息
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新用户资料成功')
                window.parent.getUserInfo()
            }
        })
    })
})