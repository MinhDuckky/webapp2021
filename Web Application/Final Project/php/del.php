<?php

include_once 'db.php';

$db = new DB;
$pdo = $db->connect();

if(isset($_POST["ID"])) {
    $sql = "DELETE FROM participants
    WHERE ID = '".$_POST["ID"]."'";
    $stmt = $pdo->query($sql);
    header("Location:/Web Application/Final Project/service.html");
}

?>