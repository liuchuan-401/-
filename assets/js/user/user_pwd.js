$(function(){
    var form=layui.form
    var layer=layui.layer


    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value===$('[name="oldPwd"]').val()){
                return '新旧密码不能相同！'
            }
        },
        rePwd:function(value){
            if(value!==$('[name="newPwd"]').val()){
                return '两次新密码不一致！'
            }
        }
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:function(res){
                if (res.status!==0){
                    console.log(res);
                    return layer.msg('重置密码失败！')
                }
                layer.msg('重置密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})