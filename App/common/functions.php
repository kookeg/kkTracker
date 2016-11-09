<?php

function insertMySQL($q){
    $mysqli = new mysqli('localhost', 'root', '', 'tracker', 3306);
    $mysqli->query("set names utf8");

    $to_escape = array('machine','ctr_id','region_ids','url','refer_url','to_url','title','http_user_agent',
        'misc','ctr_type','ref','domain','permanent_id','ad_from','email','ip','trace_id','special','trace_id_new','click_info','reservation1','reservation2','reservation3','reservation4','reservation5','reservation6');
    foreach($to_escape as $key){
        $q[$key] = $mysqli->real_escape_string($q[$key]);
    }

    $q['cust_id'] = (int)$q['cust_id'];
    $q['is_first_pv'] = (int)$q['is_first_pv'];

    $escaped_sql = sprintf("INSERT INTO `click` VALUES(null, '%s','%s','%s','%s','%s','%s','%s',%s,'%s','%s',%s,%s,
        '%s','%s','%s','%s','%s','%s','%s',%s,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')",
        $q['machine'],$q['ctr_id'],$q['region_ids'],$q['url'],$q['refer_url'],
        $q['to_url'],$q['title'],$q['type'],$q['http_user_agent'],$q['time'],
        $q['visit_count'],$q['is_first_pv'],$q['misc'],$q['ctr_type'],$q['ref'],
        $q['domain'],$q['permanent_id'],$q['ad_from'],$q['email'],$q['cust_id'],
        $q['ip'],$q['trace_id'],$q['special'],$q['trace_id_new'],$q['click_info'],
        $q['reservation1'],$q['reservation2'],$q['reservation3'],$q['reservation4'],
        $q['reservation5'],$q['reservation6']);
    $res  = $mysqli->query($escaped_sql);
    $mysqli->close();
}

function post($url,$data){
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $res = curl_exec($ch);
    curl_close($ch);

    $j = json_decode($res,true);
    return $j !== NULL && $j['status'] == 0;
}

function getget($key, $defaultValue="") {
    if (array_key_exists($key, $_GET) && !empty($_GET[$key])) {
        return str_replace(array("\n","\r","\t"),array("","",""),urldecode($_GET[$key]));
    } else {
        return $defaultValue;
    }
}

function getcookie($key, $defaultValue=""){
    if (array_key_exists($key, $_COOKIE)) {
        return $_COOKIE[$key];
        return str_replace(array("\n","\r","\t"),array("","",""),($_COOKIE[$key]));
    } else {
        return $defaultValue;
    }
}

function is_email($str){
    if(eregi("^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,4}$",$str)){
        return true;
    }
    return false;
}

function getip(){
    if (@$_SERVER['HTTP_CLIENT_IP'] && $_SERVER['HTTP_CLIENT_IP']!='unknown') {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (@$_SERVER['HTTP_X_FORWARDED_FOR'] && $_SERVER['HTTP_X_FORWARDED_FOR']!='unknown') {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function hextobin($str) {
    $bin = "";
    $len = strlen($str);
    if(!function_exists('hex2bin')) {
        $i = 0;
        do {
            $bin .= chr(hexdec($str{$i}.$str{($i + 1)}));
            $i += 2;
        } while ($i < $len);
    }else{
        $bin = hex2bin($str);
    }
    return $bin;
}

function is_utf8($str){
    $c=0; $b=0;
    $bits=0;
    $len=strlen($str);
    for($i=0; $i<$len; $i++){
        $c=ord($str[$i]);
        if($c > 128){
            if(($c >= 254)) return false;
            elseif($c >= 252) $bits=6;
            elseif($c >= 248) $bits=5;
            elseif($c >= 240) $bits=4;
            elseif($c >= 224) $bits=3;
            elseif($c >= 192) $bits=2;
            else return false;
            if(($i+$bits) > $len) return false;
            while($bits > 1){
                $i++;
                $b=ord($str[$i]);
                if($b < 128 || $b > 191) return false;
                $bits--;
            }
        }
    }
    return true;
}

function convertParam($params){
    $return = is_utf8($params) ? $params : iconv('gbk','utf-8',$params);
    return $return;
}

function wash_url($url){
    $arr = parse_url($url);

    $url_str = isset($arr['scheme']) ? $arr['scheme']."://" : '';
    if(isset($arr['host'])) {
        $url_str.=$arr['host'];
        $arr['host'] = is_utf8($arr['host']) ? $arr['host'] : iconv('gbk','utf-8',$arr['host']);
    }

    if(isset($arr['port'])) {
        $url_str.=":".$arr['port'];
    }

    $arr['path'] = !isset($arr['path']) ? '' : (is_utf8($arr['path']) ? $arr['path'] : iconv('gbk','utf-8',$arr['path']));

    $fragment_str = '';
    if(isset($arr['fragment'])){
        $fragment = explode('=',$arr['fragment'],2);
        $fragment_str="#".$fragment[0].(isset($fragment[1]) ? '='.wash_url($fragment[1]) : '');
    }

    if (!isset($arr['query']) || empty($arr['query'])) {
        if(isset($arr['path'])) $url_str.=$arr['path'].$fragment_str;
        return $url_str;
    }

    if(isset($arr['path'])) $url_str.=$arr['path']."?";

    $query_arr = array();
    $query = explode('&',$arr['query']);
    foreach ($query as $item){
        $args = explode("=",$item,2);
        if(isset($args[1]) && !empty($args[1])){
            $args[1] = urldecode($args[1]);
            $args[1] = is_utf8($args[1]) ? $args[1] : iconv('gbk','utf-8',$args[1]);
        }
        $query_arr[]=$args[0]."=".(isset($args[1]) ? $args[1] : "");
    }

    $url_str.=implode('&',$query_arr).$fragment_str;
    return $url_str;
}

/**
 * 解密出cust_id
 * @param unknown_type $cust_id_encoded
 * @param unknown_type $email
 */
function decode_cust_id($cust_id_crypt, $email){
    $cust_id_crypt = str_replace(' ','+',$cust_id_crypt);
    $strArray = iconv('gb2312', 'utf-8', COOKIE_CRYPTO_KEY.$email);
    $cust_id = KKCrypt::decrypt_text($cust_id_crypt, $strArray);
    return $cust_id;
}

/**
 * 从url中获取域
 *
 * @param string $url
 * @param string $default
 **/

function get_domain($url,$default='www') {
    $domain = "";
    $domain_pattern = "/^(http(s)?:\/\/)?(\w*)\.*(?=" . DOMAIN . "\.)/i";
    if (preg_match($domain_pattern,$url,$matches)){
        $domain = isset($matches[3]) ? $matches[3]: $default;
    }
    return empty($domain) ? $default : $domain;
}


/**
 * 时间13位：秒(10)+毫秒(3) 1354509844 619              
 * 随机数4位（1000-9999） 5555
 * 当前进程pid 不足5位补足  32768
 **/

function genarate_unique_id(){
    $track_id = '';
    $mtime = microtime(true);
    $mtime = explode('.', $mtime);
    if(!isset($mtime[1])){
        $mtime[1] = '000';      
    }
    $mtime[1] = substr($mtime[1], 0, 3);
    $mtime[1] = str_pad($mtime[1], 3, 0);
    $mtime = implode('', $mtime);
    $random = rand(1000, 9999);
    $pid = getmypid();
    $pid = str_pad($pid, 5, 0);
    $track_id = $mtime . $random . $pid;
    return $track_id;
}
