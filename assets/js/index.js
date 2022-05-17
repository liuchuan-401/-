$(function(){
    // 获取用户的基本信息渲染页面
    getUserInfo()

    // 点击退出事件、
    $('#btnLogout').on('click',function(){
        // 弹出提示框
        let layer=layui.layer
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 跳转回登录页
            location.href='/login.html'
            // 关闭提示框
            layer.close(index);
          });
    })

})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        type:"get",
        url:'/my/userinfo',
        success:(res)=>{
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

// 渲染头像函数
function renderAvatar(user){
   let name=user.nickname||user.username
   $('#welcome').html(`欢迎  ${name}`)
   if(user.user_pic!==null){
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
   }else{
    $('.layui-nav-img').hide()
    $('.text-avatar').html(name[0].toUpperCase()).show()
   }
}