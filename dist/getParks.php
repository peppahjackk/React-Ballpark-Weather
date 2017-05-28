<?php
include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

$_POST = json_decode(file_get_contents('php://input'), true);
$currentDay = $_POST["currentDay"];

$daysGames = array();
$currentGame = (object)[];
// Create db connection
$servername = 'localhost';
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}
// just grab all rows at once you dunce. set the $currentGame->day->park etc
// Get game data
$sql = "SELECT * from GameData";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    if (!isset($currentGame->$row['day'])) {
      $currentGame->$row['day'] = (object)[];
    }
    $key = $row['park'].$row['gm'];
    $currentGame->$row['day']->$key = (object)[];
    $currentGame->$row['day']->$key->park = $row['park'];
    $currentGame->$row['day']->$key->gm = $row['gm'];
    $currentGame->$row['day']->$key->data = json_decode($row['data']);
  }
} else {
  echo "0 results";
}
               
echo json_encode($currentGame);

$conn->close();
?>