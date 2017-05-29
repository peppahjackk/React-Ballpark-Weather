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

// Clear previous game data
/* $clearSql = "truncate GameData";
if ($conn->query($clearSql)===TRUE) {
  echo 'Cleared GameData table successfully <br>';
} else {
  echo 'Error: '.$clearSql.'<br>'. $conn->error;
} */

// Get the next 8 days of game data
for ($i = 1; $i <= 8; $i++) {
  $curr = $i - 1;
  $y = date('Y',strtotime('+'.$curr.' day'));
  $m = date('m',strtotime('+'.$curr.' day'));
  $d = date('d',strtotime('+'.$curr.' day'));
  
  // Get data for current day
  curl_setopt($curl, CURLOPT_URL, 'http://gd2.mlb.com/components/game/mlb/year_'.$y.'/month_'.$m.'/day_'.$d.'/grid.json');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  
  // Convert data to object and strip extraneous information
  $result = json_decode($result);
  $result = $result->data->games->game;
  
  // Insert each game into DB for current day
  foreach ($result as $currentGame) {
    $currentGameStr = json_encode($currentGame);
    $sql = "REPLACE INTO GameData " .
    "(gid, day, park, gm, data, status) " .
    "VALUES ( '$currentGame->calendar_event_id', '$i', '$currentGame->home_name_abbrev', '$currentGame->game_nbr', '$currentGameStr', '$currentGame->status' )";
    if ($conn->query($sql) === FALSE) {
      echo 'Error: ' . $sql . '<br>' . $conn->error;
    }
  }
}
curl_close($curl);
echo 'Obtained game data and set to table';

// Executes script to build active parks for next 8 days
include('condenseParks.php');

$conn->close();
?>