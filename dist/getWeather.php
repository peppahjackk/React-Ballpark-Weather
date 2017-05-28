<?php
include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

$weatherData = (object)[];
// Create db connection
$servername = 'localhost';
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Get game data
$sql = "SELECT * from WeatherData";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $weatherData->$row['park'] = (object)[];
    if (gettype(json_decode($row['data'])) === 'object') {
      $weatherData->$row['park']->data = json_decode($row['data']);
    } else {
      $weatherData->$row['park']->data = $row['data'];
    }
    $weatherData->$row['park']->ts = $row['ts'];
  }
} else {
  echo "0 results";
}

echo json_encode($weatherData);
    
$conn->close();
?>