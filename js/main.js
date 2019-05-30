
    $(document).ready(function(){
        var menuOpened = false;

        var  locked = false;
        
        
        
        
        
        if(useComputer()){
            $("#side-menu, #content").addClass("menu-opened");
            for(var i = 0; i < $("#side-menu>*").length; i++){                
                openMenu(i, 200);    
            }
            menuOpened = true;
        }






        function useComputer(){
            return window.outerWidth > 600;
        }

        function openMenu(i, delay) {                    
            setTimeout(function(){
                $($("#side-menu>*")[i]).addClass("menu-opened");
                
                
            }, (i * delay));
        }

        

        $("a#open-menu").click(function(){


            if(locked) return;
            

            locked = true;

           

            





            if(menuOpened){
                $(".side-menu-element").removeClass("menu-opened");
                $("#content").removeClass("menu-opened");
                setTimeout(function(){
                    $("#side-menu").removeClass("menu-opened");
                    menuOpened = false;
                    locked = false;
                }, 1000)
                                
                
            }
            else{
                $("#side-menu").addClass("menu-opened");                
                $("#content").addClass("menu-opened");

                for(var i = 0; i < $("#side-menu>*").length; i++){
                    openMenu(i, 200);    
                }
                setTimeout(function(){
                    
                }, 200 * $("#side-menu>*").length)

                
                setTimeout(function(){
                    
                    menuOpened = true;
                    locked = false;
                }, 1000)
                
                
            }

            
        })

        
        $("#content, .side-menu-element:not(#side-menu-clock-wrapper)").click(function(){
            
            if(locked) return;
            if(useComputer())return;
            
            if(menuOpened){
                locked = true;
                $(".side-menu-element").removeClass("menu-opened");
                $("#content").removeClass("menu-opened");
                setTimeout(function(){
                    $("#side-menu").removeClass("menu-opened");
                    menuOpened = false;
                    locked = false;
                }, 1000)
                
                
                

            }
        })


        var rem = getParameter("rem");
        Page.setWrapper($("#content"));
        if(rem){
            Page.loadPage(rem, false);
        }
        else{
            Page.loadPage("pages/home.html", false);
        }

        window.onpopstate = function(event) {
            //上一頁
            if(event.state && event.state.url){
                Page.loadPage((event.state.url));
            }
        };

        
        $("a:not(.side-menu-element a)").click(function() {
            var myHref = $(this).attr("data-href");
            if(myHref){
                Page.loadPage(myHref);
                event.preventDefault()
                $(this).addClass("listening");
            }
        });
        

        $(".side-menu-element").click(function() {
            
            var myHref = $(this).children("a").attr("data-href");
            if(myHref){
                Page.loadPage(myHref);
                event.preventDefault()
            }
        });
        








        

    

        function getParameter(parameterName, queryString=window.location.search) {
            queryString = queryString.replace("?","");

            var searchsRaw = queryString.split("&");
            
            

            for(var i = 0; i < searchsRaw.length; i++){
                var mySearch = searchsRaw[i].split("=");
               
                if(mySearch[0] == parameterName){
                    
                    if(mySearch.length < 1){
                        mySearch[1] = "";
                    }
                    return mySearch[1]; 
                }              
            }
            return null;
           
        }

    

    if(document.fullscreenElement || window.location.search.indexOf("app=1") != -1){
        $("#fullscreen").hide();
    }    

    $("#fullscreen").click(function(){
        var elem = document.documentElement;
        try{
            if (elem.requestFullscreen) {
            elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
            }
        }catch(e){
            alert("您的瀏覽器不支持全螢幕功能!")
        }

        $(this).delay(200).animate({opacity: 0},500);
    })
        

    })
    
    function updateLink(){
        $("#content a:not(.listening)").click(function() {
            
            var myHref = $(this).attr("data-href");
            if(myHref){
                Page.loadPage(myHref);
                event.preventDefault()
                $(this).addClass("listening");
            }
        });
    }
