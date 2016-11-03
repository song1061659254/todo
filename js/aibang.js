$(function(){
    var add=$(".add");
    var input=$("#header input");
    var ul=$("#main");

    //更改状态
    var pos;
    ul.on("touchstart","li",function(e){
        pos=e.originalEvent.changedTouches[0].clientX;
    });
    ul.on("touchend","li",function(e){
        var n=e.originalEvent.changedTouches[0].clientX;
        if(n-pos>=50){
            todos[$(this).index()].state=1;
            $(this).addClass("done");
            localStorage.todos=JSON.stringify(todos);
        }
        if(n-pos<=-50){
            todos[$(this).index()].state=0;
            $(this).removeClass("done");
            localStorage.todos=JSON.stringify(todos);
        }
    });

    //新增
    var todos=[];
    if(localStorage.todos){
        todos=JSON.parse(localStorage.todos);

        for(var i=0;i<todos.length;i++){
            var c=(todos[i].state)?"done":"";
            $("<li class=" +c+"><div class='zhong'><i class='iconfont'>&#xe63a;</i></div><div class='content'>"+todos[i].name+"</div></li>").appendTo(ul);
        }
    }
    
    add.on("touchend",function(){
        var v=$.trim(input.val());
        if(!v){
            return;
        }
        var todo={
            name:v,
            state:0
        }
        todos.push(todo);
        localStorage.todos=JSON.stringify(todos);
        $("<li><div class='zhong'><i class='iconfont'>&#xe63a;</i></div><div class='content'>"+v+"</div></li>").appendTo(ul);
        input.val("");
    })

// 清除已完成
    var clean=$("#clear .clean");
    clean.on("touchend",function(){
        ul.find(".done").each(function(i){
            $(this).delay(i*80).queue(function(){
                $(this).addClass("run").dequeue();
            }).delay(800).queue(function(){
                $(this).remove().dequeue();
            })
        })
        var newarr=[];
        for(var i=0;i<todos.length;i++){
            if(todos[i].state===0){
                newarr.push(todos[i]);
            }
        }
    })
// 清空
     var quan=$("#clear .quan");
     quan.on("touchend",function(){
        ul.find("li").remove();
     })
    
    // foot
    var foot=$("#foot");

    foot.on("click","div",function(){
        var index=$(this).index();
        // console.log(index)
        foot.find("div").removeClass("active");
        foot.find("div").eq(index).addClass("active");
    })


})