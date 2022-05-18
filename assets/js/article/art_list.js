$(function(){
    var layer=layui.layer
    var form=layui.form
    var laypage=layui.laypage


    // 定义模板引擎的过滤器
    template.defaults.imports.dataFormat=function(date){
        const dt=new Date(date)

        var y=dt.getFullYear()
        var m=dt.getMonth()+1
        var d=dt.getDate()
        var hh=dt.getHours()
        var mm=dt.getMinutes()
        var ss=dt.getSeconds()

        padZero(m)
        padZero(d)
        padZero(hh)
        padZero(mm)
        padZero(ss)

        return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`

    }

    // 定义补零的函数
    function padZero(n){
       return n>9? n:'0'+n
    }

    // 创建一个对象,用于存储传递的参数
    var q={
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    initTable()
    initCate()

    // 获取文章数据的函数
    function initTable(){
        $.ajax({
            type:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                // 使用模板引擎渲染数据页面
                console.log(res);
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
                // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }


    // 初始化文章分类的方法
    function initCate(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                // 重新调用layui渲染页面
                form.render()
            }
        })
    }

    // 为筛选表单绑定提交事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        var cate_id=$('[name=cate_id]').val()
        var state=$('[name=state]').val()
        // 为获取文章数据函数中的参数q赋值
        q.cate_id=cate_id
        q.state= state
        // 根据最新的查询参数，重新调用获取页面的函数
        initTable()
    })

    // 定义分页渲染事件
    function renderPage(total){
        laypage.render({
            elem:'pageBox',
            count:total,
            limit:q.pagesize,
            limits:[2,3,5,10],
            curr:q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            // 分页发生切换的时候，触发iump回调函数
            jump:function(obj,first){
                // 可以通过first的值，来判断是通过那种方式触发的jump回调函数，如果是first的值为TRUE，则是通过第二种方式触发的
                q.pagenum=obj.curr
                // 将最新的条目数赋值给q对象，并再次调用初始化页面函数
                q.pagesize=obj.limit
                // 通过first属性解决jump死循环问题
                if(!first){
                    initTable()
                }
            }
        })
    }

    // 通过代理的形式为按钮绑定删除事件
    $('tbody').on('click','.btn-delete',function(){
        var len=$('.btn-delete').length
        var id=$(this).attr('data-id')
        layer.confirm('是否确定删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if(len===1){
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                }
            })
            layer.close(index);
          });
    })


})