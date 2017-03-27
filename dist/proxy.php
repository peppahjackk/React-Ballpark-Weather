<?php 

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

// GPS Coordinates of 23 non-roofed MLB stadiums as of 2017
$ballparks = [
  'atl' => '33.89,84.468',
  'bal' => '39.283964,-76.621618',
  'bos' => '42.346619,-71.096961',
  'chc' => '41.947856,-87.655887',
  'chw' => '41.829908,-87.633540',
  'cin' => '39.097935,-84.508158',
  'cle' => '41.496192,-81.685238',
  'col' => '39.755891,-104.994198',
  'det' => '42.339227,-83.049506',
  'kc' => '39.051098,-94.481115',
  'laa' => '33.799925,-117.883194',
  'lad' => '34.072724,-118.240646',
  'min' => '44.981713,-93.277347',
  'nym' => '40.756337,-73.846043',
  'nya' => '40.829327,-73.927735',
  'oak' => '37.751605,-122.200523',
  'phi' => '39.905547,-75.166589',
  'pit' => '40.447307,-80.006841',
  'sd' => '32.707710,-117.157097',
  'sf' => '37.778473,-122.389595',
  'stl' => '38.622317,-90.193891',
  'tex' => '32.751147,-97.082454',
  'was' => '38.873010,-77.007457',
];

$ballparksQuery = [];
$_POST = json_decode(file_get_contents('php://input'), true);
// Builds array of requested stadiums' coordinates
$ballparksRequested = json_decode($_POST["parkRequest"]);
foreach ($ballparksRequested as $currentPark => $location) {
  array_push($ballparksQuery, $ballparks[$location]);
};

// Gathers and prints weather data for requested stadiums
$curl = curl_init();
foreach ($ballparksQuery as $currentPark) {
  curl_setopt($curl, CURLOPT_URL, "https://api.darksky.net/forecast/04497081d270b956aac2ccc286d0b245/" . $currentPark);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  echo $result;
}

curl_close($curl) 

?>