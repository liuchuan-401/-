$(function(){
    // 获取表单并设置输入框的规则
    var form=layui.form
    var layer=layui.layer

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1-6之间'
            }
        }
    })

    // 调用获取用户信息的函数
    initUserInfo()
    // 设置获取用户信息的函数
    function initUserInfo(){
    $.ajax({
        type:"get",
        url:"/my/userinfo",
        success:function(res){
            if (res.status!==0){
                return layer.meg('用户信息获取失败！')
            }
            console.log(res);
            // 调用form.val()方法为表单快速赋值
            form.val('formUserInfo',res.data)
        }
    })
    }

    // 设置重置事件
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    // 设置更新用户信息功能
    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:"POST",
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新信息失败！')
                }
                layer.msg('更新信息成功！')
                // 调用父页面中的函数，更新头像信息
                window.parent.getUserInfo()
            }
        })
    })
})
