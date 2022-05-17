/* 每次使用Ajax的时候，都会先调用这个函数
在这个函数中，我们可以拿到Ajax的配置对象 */
$.ajaxPrefilter(function(option){
   /* 在发起Ajax的时候，首先拼接前面的url地址
   在用户设置参数的时候，只需要输入端口后面的参数 */
   option.url='http://www.liulongbin.top:3007'+option.url
  
  
   //统一为有权限的接口设置header请求头
   if (option.url.indexOf('/my/')!==-1){
       option.headers={Authorization:localStorage.getItem('token')||''}
   }


//    统一为全局挂在complete函数
option.complete=function(res){
    if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        localStorage.removeItem('token')
        location.href='/login.html'
    }
}

})