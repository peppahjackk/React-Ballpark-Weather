<?php
include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

// Initialize curl
$curl = curl_init();

// Create db connection
$servername = 'localhost';
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

for ($i = 1; $i <= 8; $i++) {
  $y = date('Y',strtotime('+'.$i.' day'));
  $m = date('m',strtotime('+'.$i.' day'));
  $d = date('d',strtotime('+'.$i.' day'));
  
  curl_setopt($curl, CURLOPT_URL, 'http://gd2.mlb.com/components/game/mlb/year_'.$y.'/month_'.$m.'/day_'.$d.'/grid.json');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  
   $sql = "REPLACE INTO GameData " .
    "(id, data) " .
    "VALUES ( '$i', '$result' )";
  if ($conn->query($sql) === TRUE) {
    echo 'New record created successfully';
  } else {
    echo 'Error: ' . $sql . '<br>' . $conn->error;
  }
}
  
?>