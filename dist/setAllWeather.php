<?php
include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

// GPS Coordinates of 23 non-roofed MLB stadiums as of 2017
$ballparks = [
  'ATL' => '33.89,-84.468',
  'BAL' => '39.283964,-76.621618',
  'BOS' => '42.346619,-71.096961',
  'CHC' => '41.947856,-87.655887',
  'CWS' => '41.829908,-87.633540',
  'CIN' => '39.097935,-84.508158',
  'CLE' => '41.496192,-81.685238',
  'COL' => '39.755891,-104.994198',
  'DET' => '42.339227,-83.049506',
  'KC' => '39.051098,-94.481115',
  'LAA' => '33.799925,-117.883194',
  'LAD' => '34.072724,-118.240646',
  'MIN' => '44.981713,-93.277347',
  'NYM' => '40.756337,-73.846043',
  'NYY' => '40.829327,-73.927735',
  'OAK' => '37.751605,-122.200523',
  'PHI' => '39.905547,-75.166589',
  'PIT' => '40.447307,-80.006841',
  'SD' => '32.707710,-117.157097',
  'SF' => '37.778473,-122.389595',
  'STL' => '38.622317,-90.193891',
  'TEX' => '32.751147,-97.082454',
  'WSH' => '38.873010,-77.007457',
];

// Create connection
$servername = 'localhost';
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Gathers and prints weather data for requested stadiums
$curl = curl_init();

foreach ($ballparks as $currentPark => $location) {
  curl_setopt($curl, CURLOPT_URL, "https://api.darksky.net/forecast/". $secret_key . $location . "?exclude=alerts");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  
  $sql = "REPLACE INTO WeatherData ".
    "(park, data) " .
    "VALUES ( '$currentPark', '$result' )";
  if ($conn->query($sql) === FALSE) {
    echo 'Error: ' . $sql . '<br>' . $conn->error;
  }
}; 

echo 'All WeatherData updated';

$conn->close();
curl_close($curl);
?>