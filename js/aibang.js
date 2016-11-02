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
//      ul.empty()
        for(var i=0;i<todos.length;i++){
            var c=(todos[i].state)?"done":"";
            $("<li class='" +c+"'><div class='zhong'><i class='iconfont'>&#xe63a;</i></div><div class='content'>"+todos[i].name+"</div>").appendTo(ul);
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
        $("<li><div class='zhong'><i class='iconfont'>&#xe63a;</i></div><div class='content'>"+v+"</div>").appendTo(ul);
        input.val("");
    })

    
})