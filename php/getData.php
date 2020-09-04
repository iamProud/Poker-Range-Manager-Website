<?php
    $pdo = new PDO('mysql:host=localhost;dbname=ranges', 'root', '');
    $actionID = json_decode( $_POST['actionID'] );
    //$tablename = $_POST['rangeTitle'];
    class hand {
      public $card;
      public $frequency;
      public $color;
    }

    //function to get Range
    function get_range( $pdo, $actionID ){
      $array = array();
      foreach ($actionID as $action) {
        $stmt = $pdo->prepare("SELECT card, frequency FROM hands WHERE action_id = :action ;");
        $stmt->bindParam(':action', $action->action_id);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_CLASS, "hand");
        foreach ($result as $hand) {
          $hand->color = $action->color;
        }
        array_push($array, $result);
      }
      return $array;
    }

    $Range = get_range( $pdo, $actionID );

    echo json_encode($Range);

?>
