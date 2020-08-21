$(function () {
    // 调用getUserInfo()获取用户基本信息
    getUserInfo()
    $('#btnOut').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.layer.close(index)
        })
    })
})
// 获取用户信息(封装到入口函数的外面)
// 原因:后面其他的的页面要调用
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
    // 渲染用户头像
    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
}