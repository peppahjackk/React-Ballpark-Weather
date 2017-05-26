<?php
  include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

$servername = 'localhost';

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Clear previous active parks
$clearSql = "truncate ActiveParks";
if ($conn->query($clearSql)===TRUE) {
  echo 'Cleared ActiveParks table successfully';
} else {
  echo 'Error: '.$clearSql.'<br>'. $conn->error;
}

$sql = "SELECT * from GameData";
$result = $conn->query($sql);

$activeParks = array();

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $currPark = json_decode($row['data'])->home_name_abbrev;
    if (in_array($currPark, $activeParks) === FALSE) {
      array_push($activeParks, $currPark);
    }
  }
} else {
  echo "0 results";
} 

foreach ($activeParks as $currentPark) {
  $sql = "INSERT INTO ActiveParks" .
  "(park)" .
  "VALUES ('$currentPark')";
  if ($conn->query($sql) === FALSE) {
    echo 'Error: ' . $sql . '<br>' . $conn->error;
  }
}

echo 'Condensed Parks';

?>