$(function(){
    // 点击‘去注册账号’的事件
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 点击‘去登录’的事件
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 设置layui中form的正则表达式
    let form=layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
          // 通过形参拿到的是确认密码框中的内容
          // 还需要拿到密码框中的内容
          // 然后进行一次等于的判断
          // 如果判断失败,则return一个提示消息即可
          var pwd = $('.reg-box [name=password]').val()
          if (pwd !== value) {
            return '两次密码不一致！'
          }
        }
      })


      // 注册事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        // 提取数据
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
          }
          // 发送post请求注册
          $.post('/api/reguser', data, function(res) {
          console.log(res);  
          if (res.status !== 0) {
              return layer.msg(res.message)
            }
         layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
          })
    })


    // 登录事件
    $('#login-box').submit(function(e){
      e.preventDefault()
      $.ajax({
        type:'POST',
        url:'/api/login',
        data:$('#login-box').serialize(),
        success:function(res){
          console.log(res);
          if(res.status!==0){return layer.msg(res.message)} 
          layer.msg('登录成功！')
          // 将登录成功得到的字符串保存到本地存储中
          localStorage.setItem('token',res.token)
          location.href='/index.html'
        }
      })
    })

})