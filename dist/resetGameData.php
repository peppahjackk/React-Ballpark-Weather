<?php
include 'config.php';

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

// Create db connection
$servername = 'localhost';
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

$sql = "TRUNCATE GameData";
if ($conn->query($sql) === FALSE) {
  echo 'Error: ' . $sql . '<br>' . $conn->error;
} else {
  echo 'Successfully truncated table';
}

include('setParks.php');
?>