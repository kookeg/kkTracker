<?php
define("LIB_PATH", SITE_PATH . "/lib/");
define('LOG_PATH', SITE_PATH . 'log');
define("COOKIE_CRYPTO_KEY", "smartlei.com10121");
define("DOMAIN", "smartlei.com");

// redis config
define('REDIS_ROOT', '127.0.0.1');
define('REDIS_PORT', '6379');
define('REDIS_DB', '15');
define('REDIS_PERM_HOUR', 'perm_id_hour');
define('REDIS_PERM_5MIN', 'perm_id_5min');
define('REDIS_PERM_MIN', 'perm_id_min');

include_once( SITE_PATH  . '/common/functions.php' );

function autoload($className)
{
	$classFile = str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';
	if (file_exists(LIB_PATH . '/' . $classFile)) {
		$file = LIB_PATH . '/' . $classFile;
	}
	if (isset($file) && $file !== '') {
		include $file;
	} else {
		KKLog::write_errorlog($className . ' not found ');
	}
}
spl_autoload_register("autoload");
