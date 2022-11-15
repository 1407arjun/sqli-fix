<?php
$servername = "localhost:8889";
$username = "root"; 
$password = "root"; 
$dbname = "cyber"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);
}



?>

