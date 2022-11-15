<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "INSERT INTO '$wpdb->guest' (firstname, lastname) VALUES ('John', 'Doe')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$name = $_POST['name'];
$conn->query("SELECT * FROM '$wpdb->myTable' WHERE name like '$name'");

$age = $_POST['age'];
$sessionId = $_SESSION['id'];
$conn->query("UPDATE '$wpdb->myTable' SET age = $age, isLogin = TRUE WHERE id = '$sessionId'");

$conn->close();
?>
