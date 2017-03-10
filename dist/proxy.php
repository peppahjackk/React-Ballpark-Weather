<?php 

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, "https://api.darksky.net/forecast/04497081d270b956aac2ccc286d0b245/40.829327,-73.927735");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($curl);
echo $result;
curl_close($curl)

/* $result = 6-3; */


?>