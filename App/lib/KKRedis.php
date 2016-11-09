<?php
/**
 * redis 
 **/ 

class KKRedis { 

    private $redis; //redis对象  

    /** 
     * 初始化Redis 
     * @param array $config 
     **/ 

    public function __construct($config=array()) {
        $redis_q = empty($config) ? array('server'=>'127.0.0.1','port'=>'6379') : $config;
        $this->redis = new Redis();
        try {
            $rc = $this->redis->connect($redis_q['server'], $redis_q['port']);
            if (!$rc) {
                $rc = $this->redis->connect($redis_q['server'], $redis_q['port']);
                if (!$rc) {
                    throw new Exception('redis connect failed host:'.$redis_q['server'].' port:'.$redis_q['port']);
                }
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            preg_match("/Can't connect to/", $error) ? KKLog::write_warninglog($error) :  KKLog::write_errorlog($error);
            unset($this->redis);
            return false;
        }
        return $this->redis;
    }

    /** 
     * 选择数据库 
     * @param string $db 数据库下标
     **/  

    public function select($db) {  
        $this->redis->select($db);  
    } 

    /** 
     * 设置值 
     * @param string $key KEY名称 
     * @param string|array $value 获取得到的数据 
     * @param int $timeOut 时间 
     **/  

    public function set($key, $value, $timeOut = 0) {  
        $value = json_encode($value, TRUE);  
        $retRes = $this->redis->set($key, $value);  
        if ($timeOut > 0) $this->redis->setTimeout($key, $timeOut);  
        return $retRes;  
    }  

    /** 
     * 通过KEY获取数据 
     * @param string $key KEY名称 
     **/  

    public function get($key) {  
        $result = $this->redis->get($key);  
        return json_decode($result, TRUE);  
    }  

    /** 
     * 删除一条数据 
     * @param string $key KEY名称 
     **/  

    public function delete($key) {  
        return $this->redis->delete($key);  
    }  

    /** 
     * 清空数据 
     **/  

    public function flushAll() {  
        return $this->redis->flushAll();  
    }  

    /** 
     * 数据入队列 
     * @param string $key KEY名称 
     * @param string|array $value 获取得到的数据 
     * @param bool $right 是否从右边开始入 
     **/  

    public function push($key, $value ,$right = true,$encode = true) {
        if($encode){
            $value = self::KKEncode($value);
        }
        return $right ? $this->redis->rPush($key, $value) : $this->redis->lPush($key, $value);
    }

    public static function KKEncode($value) {
        if (is_array($value)) {
            foreach ($value as $_k => $_v) {
                $value[$_k] = urlencode($_v);
            }
        } else $value = urlencode($value);
        return json_encode($value);
    }

    /** 
     * 数据出队列 
     * @param string $key KEY名称 
     * @param bool $left 是否从左边开始出数据 
     **/  

    public function pop($key , $left = true) {  
        $val = $left ? $this->redis->lPop($key) : $this->redis->rPop($key);  
        return  self::KKDecode($val,true);  
    }

    public static function KKDecode($value) {
        if (is_array($value)) {
            foreach ($value as $_k => $_v) {
                $value[$_k] = urldecode($_v);
            }
        } else $value = urldecode($value);
        return json_decode($value ,true);
    }

    /** 
     * 数据自增 
     * @param string $key KEY名称 
     */  
    public function increment($key) {  
        return $this->redis->incr($key);  
    }  

    /** 
     * 数据自减 
     * @param string $key KEY名称 
     */  
    public function decrement($key) {  
        return $this->redis->decr($key);  
    }  

    /** 
     * key是否存在，存在返回ture 
     * @param string $key KEY名称 
     */  
    public function exists($key) {  
        return $this->redis->exists($key);  
    }

    public function close(){
        return $this->redis->close();
    }  

    /** 
     * 返回redis对象 
     * redis有非常多的操作方法，我们只封装了一部分 
     * 拿着这个对象就可以直接调用redis自身方法 
     **/  

    public function redisobj() {
        return $this->redis;  
    }
}
