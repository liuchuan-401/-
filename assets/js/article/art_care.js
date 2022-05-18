$(function(){
    var layer=layui.layer
    var form=layui.form
    // 获取文章列表函数
    function getArtCaseLIst(){
        $.ajax({
            type:'GET',
            url:"/my/article/cates",
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    getArtCaseLIst()

    // 点击添加类别事件
    var indexAdd=null
    $('#btnAddCase').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px','250px'],
            title:"添加文章分类",
            content:$('#dialog-add').html()
        });
    })

    // 通过代理的形式，绑定添加类别表单提交事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            type:"POST",
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
               if(res.status!==0){
                   return layer.msg(res.message)
               }
               getArtCaseLIst()
               layer.msg(res.message)
               layer.close(indexAdd);
            }
        })
    })

    // 通过代理事件，绑定编辑文章类别的事件
    var indexEdit=null
    $('tbody').on('click','.btn-edit',function(){

        indexEdit=layer.open({
            type:1,
            area:['500px','250px'],
            title:"修改文章分类",
            content:$('#dialog-edit').html()
        })

        var id=$(this).attr('data-id')
        $.ajax({
            type:"get",
            url:"/my/article/cates/"+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                form.val('form-edit',res.data)
            }
        })
    })

    // 通过代理事件，为修改类别的弹出层绑定提交事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(indexEdit)
                getArtCaseLIst()
            }
        })
    })

    // 通过代理事件，绑定删除文章分类事件
    $('tbody').on('click','.btn-delete',function(){
        var id=$(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index);
                    getArtCaseLIst()
                }
            })
          });
    })

})