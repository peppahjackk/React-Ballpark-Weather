<?php
include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

$currentGame = (object)[];
// Create db connection
$servername = 'localhost';
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Get game data
$sql = "SELECT * from GameData ORDER BY gid";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    if (!isset($currentGame->$row['date'])) {
      $currentGame->$row['date'] = (object)[];
    }
    $key = $row['park'].$row['gm'];
    $currentGame->$row['date']->$key = (object)[];
    $currentGame->$row['date']->$key->park = $row['park'];
    $currentGame->$row['date']->$key->gm = $row['gm'];
    $currentGame->$row['date']->$key->data = json_decode($row['data']);
    $currentGame->$row['date']->$key->ts = $row['ts'];
  }
} else {
  echo "0 results";
}
               
echo json_encode($currentGame);

$conn->close();
?>