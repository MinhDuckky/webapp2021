<?php

$db = new DB;
$pdo = $db->connect();

class DB{
	private $server;
	private $username;
	private $password;
	private $db;
	
	public function connect() {
		$this->server = "localhost";
		$this->username = "root";
		$this->password = "";
		$this->db = "mri_data";

		try{
			$dsn = "mysql:host=".$this->server.";dbname=".$this->db;
			$pdo = new PDO($dsn, $this->username, $this->password);
			return $pdo;
		}catch(PDOException $e){
			$error_message = $e->getMessage();
			echo $error_message;
			exit();
		}

	}
}

?>