<?php
/**
 * 日志类 
 **/ 

class KKLog{

    private static $filename = '%1$s_%2$s.log';

    public static function write_errorlog($error_msg){
        self::write($error_msg, "error");
    }

    public static function write_accesslog($access_msg){
        self::write($access_msg, "access");
    }

    public static function write_warninglog($warning_msg){
        self::write($warning_msg, "warning");
    }

    private static function get_logfile_path($type){
        return (defined('LOG_PATH') ? LOG_PATH : './') 
            . DIRECTORY_SEPARATOR
            . sprintf(self::$filename, date("Ymd"), $type);		
    }

    private static function write($message, $type) {
        $file_full_path = self::get_logfile_path($type);
        $logpath = dirname($file_full_path);
        if (!is_dir($logpath)) {
            mkdir($logpath, 0777);
        } 
        if($fd = @fopen($file_full_path, "a")) {
            $date = date( "Y-m-d H:i:s");
            $str =  $date ." ".$type." ".$message ."\r\n" ; 			
            fputs($fd, $str); 				
            fclose($fd); 
        }
    } 
}
?>
