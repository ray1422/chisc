
$.magicWindow = function(box, content, defaultWrapperAnimation = true){
    if(box.hasClass("opened"))return;

    box.html(content);
    box.css("opacity", 0);

    box.show().addClass('opened')
    box.animate({
        opacity: 1
    }, 30)
    if(defaultWrapperAnimation){
        $("#wrapper").addClass("gray");
        $("#content").addClass("blur");
    }
}

$.magicWindowClose = function(box, defaultWrapperAnimation = true){
    
    if(!box.hasClass("opened"))return;
    if(defaultWrapperAnimation){
        
        box.animate({
            opacity: 0
        }, 10, "linear")
        setTimeout(function(){
            $("#wrapper").removeClass("gray");
            $("#content").removeClass("blur");
        },310)
        setTimeout(function(){
            box.hide().html('').removeClass("opened");
        }, 1000)
        
        
    }

}