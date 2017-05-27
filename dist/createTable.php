<?php
include 'config.php';
$servername = 'localhost';

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// sql to create GameData table
$sql = 'CREATE TABLE GameData
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  day INT NOT NULL,
  park VARCHAR(3) NOT NULL,
  gm INT NOT NULL,
  data VARCHAR(65500),
  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)';

// create ActiveParks table
/* $sql = 'CREATE TABLE ActiveParks
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    park VARCHAR(3),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )'; */

// create WeatherData table
/* $sql = 'CREATE TABLE WeatherData
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    park VARCHAR(3),
    data VARCHAR(65000),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )'; */

if ($conn->query($sql) === TRUE) {
  echo 'Table created successfully';
} else {
  echo 'Error creating table: ' . $conn->error;
}

$conn->close();
?>