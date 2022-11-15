<?php
    include "database.php";
    $result = null;
    $method = "0";
    $name = "";

    //' or 1=1--  && 20XXX0000' or '1'='1
    if (isset($_GET['regno'])) {
        $regno = $_GET["regno"];
        $method = $_GET["method"];

        if ($method === "1") {
            $name = "Prepared Statements";
            $stmt = $conn->prepare("SELECT * FROM users WHERE regno=?");
            $stmt->bind_param("s", $regno);
            $stmt->execute();
            $result = $stmt->get_result();
        } else if ($method == "2") {
            $name = "Whitelist Validation";
            if (strchr($regno, "'")) {
                $result = null;
            } else {
                $sql = "SELECT * FROM users WHERE regno = '$regno'";
                $result = $conn->query($sql);
            }
        } else {
            $name = "No protection";
            $sql = "SELECT * FROM users WHERE regno = '$regno'";
            $result = $conn->query($sql);
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL Injection Attack</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body class="p-4" style="background: #1a202c">
    <h1 class="text-center text-white mb-2">Search Results</h1>
    <h4 class="text-center text-white mb-4">(<?php echo $name; ?>)</h4>
    <table class="table table-dark table-striped table-hover" style="padding: 4rem;">
        <thead>
            <tr>
            <th scope="col">Reg.No.</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">School</th>
            <th scope="col">Age</th>
            </tr>
        </thead>
        <tbody>
            <?php
                if (!is_null($result) && $result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
            ?>
                <tr>
                <th scope="row"><?php echo $row['regno']; ?></th>
                <td><?php echo $row['firstname']; ?></td>
                <td><?php echo $row['lastname']; ?></td>
                <td><?php echo $row['school']; ?></td>
                <td><?php echo $row['age']; ?></td>
                </tr>
            <?php 
                    }

                }
            ?> 
        </tbody>
    </table>
</body>
</html>