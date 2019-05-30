$(document).ready(function(){

    var cityLocked = true;

    function updateWeather(city){
        if(!city || city == ''){
            city = Cookies.get('city') ? Cookies.get('city') : "中和區";
        }
        else {
            Cookies.set('city',city, { expires: 48763});
        }
        
        $("#weather-clock-city").text(city);

        $.getJSON("get_weather.php?city=" + city,null,function(data){
            console.log(data);
    
            var now = new Date();
            var hours = now.getHours();
    
            var icon;
    
            if(data.des.indexOf("晴") != -1) {
                icon = "" +((hours >= 5 && hours < 18) ? "sun.png" : "moon.png");
    
            }
            else if(data.des.indexOf("雷") != -1){
                icon = "lightning.png";
            }
            else if(data.des.indexOf("雨") != -1){
                icon = "rain.png";
            }
            else { // 陰天
                icon = "cloud.png";
            }
    
            $("#weather-clock-temp").text(data.temp + "℃");
            $("#weather-clock-weather").css("backgroundImage", "url('css/image/" + icon + "')").attr("title", data.des);
            $("#weather-clock *").attr("title", data.des);
            $("#weather-clock *").attr("alt", data.des);
        
        });
    }
    updateWeather();

    $("*:not(#weather-select-city input.city)").click(function(event){
        if(cityLocked) return;
        cityLocked = true;
        $.magicWindowClose($("#floating-window"));
        event.preventDefault();
        event.stopPropagation();


 
    }) 

    $("#weather-clock").click(function(){
        cityLocked = true;

        var citys = new Array();
        var i = 0;

        citys[i++] = "萬里區";
        citys[i++] = "金山區";
        citys[i++] = "板橋區";
        citys[i++] = "汐止區";
        citys[i++] = "深坑區";
        citys[i++] = "石碇區";
        citys[i++] = "瑞芳區";
        citys[i++] = "平溪區";
        citys[i++] = "雙溪區";
        citys[i++] = "貢寮區";
        citys[i++] = "新店區";
        citys[i++] = "坪林區";
        citys[i++] = "烏來區";
        citys[i++] = "永和區";
        citys[i++] = "中和區";
        citys[i++] = "土城區";
        citys[i++] = "三峽區";
        citys[i++] = "樹林區";
        citys[i++] = "鶯歌區";
        citys[i++] = "三重區";
        citys[i++] = "新莊區";
        citys[i++] = "泰山區";
        citys[i++] = "林口區";
        citys[i++] = "蘆洲區";
        citys[i++] = "五股區";
        citys[i++] = "八里區";
        citys[i++] = "淡水區";
        citys[i++] = "三芝區";
        citys[i++] = "石門區";
        //Ray 辛苦了

        var htmls = '<div id="weather-select-city">';
        htmls += '<h2 style="margin:0;">請選擇你的區域</h2>';
        htmls += '<h6 style="margin:0;color:green">目前僅支持新北市地區</h6><br>';
        for(var i = 0; i < citys.length; i++){
            htmls += '<input type="button" class="city inline-button" value="' + citys[i] + '" />';
        }
        htmls += '</div>';
        htmls += '<div id="weather-select-cancel"><button type="button" class="city inline-button cancel">取消</button></div>';

        setTimeout(function(){
            cityLocked = false;
        }, 10)

        $.magicWindow($("#floating-window"), htmls);

        $("#weather-select-city input.city").click(function(){
            var city = $(this).val();
           
            updateWeather(city)
            $.magicWindowClose($("#floating-window"));

        })
       
    })

    //update Time
    setInterval(function(){
        var now = new Date();
        var hour = now.getHours();
        var min = now.getMinutes();

        hour = hour < 10 ? ("0" + hour) : hour;
        min = min < 10 ? ("0" + min) : min;
        

        $("#weather-clock .hour").text(hour);
        $("#weather-clock .minute").text(min);

    }, 200)






})