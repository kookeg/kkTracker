<?php
define('SITE_PATH',  dirname(__FILE__).DIRECTORY_SEPARATOR . 'App');
include(SITE_PATH . '/config/config.php');
$imgBytes       = "47494638396101000100800000FFFFFF00000021F90401000000002C00000000010001000002024401003B";
$queue_arr      = array();              // 队列存储数组
$url            = getget("url");        // 当前url 
$permanent_id   = getget("perm_id");    // 先从QueryString获取permanent_id 如果不存在从Request.Cookies中获取 
if (empty($permanent_id)) {
    $permanent_id = getcookie("__permanent_id");
}
//处理登录用户
$_kookeg_com = getcookie('kookeg_tracker'); // cookie中的值
parse_str($_kookeg_com, $kookeg_com);
$kookeg_com_customerid =  isset($kookeg_com['customerid']) ? $kookeg_com['customerid'] : '';
$refer_url = getget("refer_url");
$to_url = getget("to_url");

//以下数组顺序不许更改
// 服务器IP
$queue_arr['machine']           = @$_SERVER['SERVER_ADDR']; 
// 控件有ID或NAME ID优先
$queue_arr['ctr_id']            = getget("o_id"); 
// 控件的父级关系
$queue_arr['region_ids']        = getget("region_ids"); 
// 当前url
$queue_arr['url']               = !empty($url) ? wash_url($url) :'';    
// refer url
$queue_arr['refer_url']         = !empty($refer_url) ? wash_url($refer_url) :'';   
// 点击时候的url
$queue_arr['to_url']            = !empty($to_url) ? wash_url($to_url) :'';   
// 页面标题
$queue_arr['title']             = getget("title",""); 
// 0,1,2,5
$queue_arr['type']              = getget("type", "0");
// 浏览器类型
$queue_arr['http_user_agent']   = @$_SERVER['HTTP_USER_AGENT']; 
// 当前时间
$queue_arr['time']              = date('Y-m-d H:i:s');    
// 访次
$queue_arr['visit_count']       = getget("visit_count");  
// 是否第一次pv
$queue_arr['is_first_pv']       = getget("is_first_pv");  
// 屏幕分辨率
$queue_arr['misc']              = getget("res");   
// 控件类型 如：链接=>A 按钮=>button
$queue_arr['ctr_type']          = getget("ctr_type");  
// 流量来源（不存入数据库） 
$queue_arr['ref']               = getget("out_refer","");
// 域
$queue_arr['domain']            = get_domain($url,'www');  
// permanent_id
$queue_arr['permanent_id']      = empty($permanent_id) ? "0" : $permanent_id;  
// 获取from
$queue_arr['ad_from']           = getcookie('order_follow_source');  
$queue_arr['email']             = isset($kookeg_com['email']) ? base64_decode($kookeg_com['email']) : getcookie('email'); // 获取email
//$queue_arr['cust_id']           = decode_cust_id($kookeg_com_customerid, $queue_arr['email']);        // 解析cust_id
$queue_arr['cust_id']           = getget('loginUid',0);        // 解析cust_id
// 获取IP
$queue_arr['ip']                = getget('ip') ? getget('ip') : getip(); 
// 页面加载时间
$queue_arr['trace_id']          = getget('trace_id'); 
// 页面为收集特别部署的代码
$queue_arr['special']           = getget('special', ''); 
// 为实时推荐特别计算的数据（不存入数据库）
$queue_arr['trace_id_new']      = genarate_unique_id(); 
// 点击信息
$queue_arr['click_info']        = convertParam(getget('cif', ''));
//redis不能接受json再json_encode的数据，所以先编码
$queue_arr['click_info']        = urlencode($queue_arr['click_info']); 
// 预留字段1,点击控件的父级的kk_name属性，规则和region_ids相同
$queue_arr['reservation1']      = convertParam(getget('rsv1', ''));  
// 预留字段2,点击控件的kk_name属性
$queue_arr['reservation2']      = convertParam(getget('rsv2', ''));
// 预留字段3,点击控件的父级的kk_area属性
$queue_arr['reservation3']      = convertParam(getget('rsv3', ''));       
// 预留字段4
$queue_arr['reservation4']      = getget('rsv4', ''); 
// 预留字段5
$queue_arr['reservation5']      = getget('rsv5', ''); 
// 预留字段6
$queue_arr['reservation6']      = getget('rsv6', '');  

insertMySQL($queue_arr);
//放入队列
$redis = new KKRedis(array('server' => REDIS_ROOT , 'port' => REDIS_PORT));
if ($redis) {
    $redis->select(REDIS_DB);
    $redis->push(REDIS_PERM_HOUR,sprintf("%s_%s",$queue_arr['permanent_id'],$queue_arr['time']),TRUE,FALSE);
    $redis->push(REDIS_PERM_5MIN,sprintf("%s_%s",$queue_arr['permanent_id'],$queue_arr['time']),TRUE,FALSE);
    $redis->push(REDIS_PERM_MIN,sprintf("%s_%s",$queue_arr['permanent_id'],$queue_arr['time']),TRUE,FALSE);
    $redis->close();
} else {
    KKLog::write_warninglog("数据插入异常:".KKRedis::KKEncode($queue_arr));
}
//回传img
header("content-type:image/gif");
echo hextobin($imgBytes);
?>
