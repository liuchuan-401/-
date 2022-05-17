/* 每次使用Ajax的时候，都会先调用这个函数
在这个函数中，我们可以拿到Ajax的配置对象 */
$.ajaxPrefilter(function(option){
   /* 在发起Ajax的时候，首先拼接前面的url地址
   在用户设置参数的时候，只需要输入端口后面的参数 */
    option.url='http://www.liulongbin.top:3007'+option.url
})