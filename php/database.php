<?php
$servername = "localhost:8889";
$username = "root"; 
$password = "root"; 
$dbname = "cyber"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);
}

$email = $_GET["email"];
$sql = "SELECT * FROM orders WHERE email = '$email' ORDER BY date DESC";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL Injection Attack</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="row">
          <div class="col-50">
            <h3>Order History</h3>
            <label><?php  echo $result->num_rows; ?> order(s)</label>
            <?php
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
            ?>
                <!-- template -->
                <hr>
                <label><span><strong>Name: </strong></span><?php echo $row['name']; ?></label>
                <label><span><strong>Date: </strong></span><?php echo $row['date']; ?></label>
                <label><span><strong>Order: </strong></span><?php echo $row['products']; ?></label>
            <?php 
                    }

                }
            ?> 
          </div>
        </div>
    </div>
</body>
</html>