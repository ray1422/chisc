
<?php

    $city_name = '中和區';
    if(isset($_GET["city"])){
        $city_name = $_GET["city"];
        $temp = 25;
        $des = "未知";

    }

    $flag = false;
    $weather_raw;
    $weather_dir = "./weather_tmp";
    if(file_exists($weather_dir . "/last-update.txt") && file_exists($weather_dir . "/weather.xml")){
        $last_update = file_get_contents($weather_dir . "/last-update.txt");
        
        
        if(((int)$last_update + 3601 > time())){
            $flag = true;
        }
    }

    if(!$flag){
        
        $url = "https://opendata.cwb.gov.tw/opendataapi?dataid=F-D0047-069&authorizationkey=<YOUR_KEY>";
    
        $ch = curl_init();
        //curl_setopt可以設定curl參數
        //設定url
    
        curl_setopt($ch , CURLOPT_URL , $url);
        //設定AGENT
        curl_setopt($ch, CURLOPT_USERAGENT, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_HEADER, 0 );
        //執行，並將結果存回
    
        $weather_raw = curl_exec($ch);
        //關閉連線
    
        curl_close($ch);

        $f = fopen($weather_dir . "/weather.xml", "w");
        fwrite($f, $weather_raw);
        fclose($f);

        $f2 = fopen($weather_dir . "/last-update.txt", "w");
        fwrite($f2, time() . "");
        fclose($f2);
    
    }
    if($flag){
        $weather_raw = file_get_contents($weather_dir . "/weather.xml");
    }

    $weather = simplexml_load_string($weather_raw);

    $locations = ($weather_dir . "/weather.xml");

    foreach($weather->dataset->locations as $city){
        
        if($city->locationsName == '新北市'){
           
            foreach($city->location as $zone){

               

                if($zone->locationName == $city_name){
                    //(print_r($zone));
                    $elements = $zone->weatherElement;
                    foreach($elements as $element){
                        if($element->elementName == "AT"){
                            $temp = (string)$element->time[0]->elementValue->value;                            
                        }
                        elseif($element->elementName == "Wx"){
                            $des = (string)$element->time[0]->elementValue[0]->value;
                            
                        }
                    }
                    
                }
            }           
            
        }
        //print_r($city->location);
    }


 
    echo json_encode(array(
        "des" => $des,
        "temp" => $temp
    ));

    //echo $temp;
    //echo $des;

    //print_r($weather->dataset->locations);

    
?>
