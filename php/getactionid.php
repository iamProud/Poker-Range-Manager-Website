<?php
  //server info
  $servername = "localhost";
  $username = "root";
  $password = "";

  //get variables from ajax
  $user_id = $_POST['userID'];
  $range_name = $_POST['rangeName'];
  $stacksize = $_POST['stacksize'];
  $action = $_POST['action'];

  try {
    $pdo = new PDO("mysql:host=$servername;dbname=ranges", $username, $password);
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    get_user_id($pdo, $user_id, $range_name, $stacksize, $action);
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }

  //$pdo = new PDO('mysql:host=localhost;dbname=ranges', 'root', '');


  //$Range = get_user_id($pdo, $user_id, $range_name, $stacksize, $action);
  //echo json_encode($Range);


  function get_user_id($pdo, $user_id, $range_name, $stacksize, $action){
    $stmt = $pdo->prepare("SELECT action_id, color FROM range_action WHERE user_id = :user_id  AND range_name = :range_name AND stacksize = :stacksize AND action = :action;");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':range_name', $range_name);
    $stmt->bindParam(':stacksize', $stacksize);
    $stmt->bindParam(':action', $action);
    $stmt->execute();

    $count = $stmt->rowCount();
    if($count != 0){
      $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }else{
      /*
      $sql_insert = "INSERT INTO `range_action` (user_id, range_name, color, stacksize, action) VALUES (:ID, :RANGENAME, :COLOR, :STACKSIZE, :ACTION) ";
      $stmt = $pdo->prepare($sql_insert);
      $stmt->bindParam(':ID', $user_id);
      $stmt->bindParam(':range_name', $range_name);
      $stmt->bindParam(':COLOR', $color);
      $stmt->bindParam(':stacksize', $stacksize);
      $stmt->bindParam(':action', $action);
      $stmt->execute();
      */
    }

    echo json_encode($result);
  }
?>
