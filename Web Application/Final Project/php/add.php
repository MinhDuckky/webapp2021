<?php

include_once 'db.php';

$target_dir = "/XAMPP/htdocs/Web Application/Final Project/MRI Data/MRI Images/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["file"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["file"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}


$db = new DB;
$pdo = $db->connect();

if(isset($_POST["ID"]) || isset($_POST["age"]) || isset($_POST["gender"]) 
|| isset($_POST["group"]) || isset($_POST["IQ"]) || isset($_POST["ICD-10"])
|| isset($_POST["Date"]) || isset($_POST["Annotator"])){
    $temp = explode("-", $_POST["Date"]);
    $temp2 = array_reverse($temp);
    $date = join("/", $temp2);


    echo $_FILES["file"]["name"];


    $string = "'".$_POST["ID"]."','".$_POST["age"]."','".$_POST["gender"]."','"
    .$_POST["group"]."','".$_POST["IQ"]."','".$_POST["ICD-10"]."','".
    $date."','/Web Application/Final Project/MRI Data/MRI Images/".$_FILES["file"]["name"]."','".$_POST["Annotator"]."'";

    echo $string;
    $sql = "INSERT INTO participants
    VALUES (".$string.")";
    $stmt = $pdo->query($sql);
    header("Location:/Web Application/Final Project/service.html");
    
}