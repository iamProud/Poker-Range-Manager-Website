<?php
    $pdo = new PDO('mysql:host=localhost;dbname=ranges', 'root', '');

    $action_id = json_decode( $_POST['actionID'] );
    $handsArray = json_decode( $_POST['handsArray'] );

    function update_range( $pdo, $action_id, $handsArray ){
        //delete all
        $sql_delete = "DELETE FROM hands WHERE action_id = :ID ";
        foreach($action_id AS $action){
          $stmt = $pdo->prepare($sql_delete);
          $stmt->bindParam(':ID', $action->action_id);
          $stmt->execute();
        }


        //insert new
        $sql_insert = "INSERT INTO `hands` (action_id, card, frequency) VALUES (:ID, :CARD, :FREQ) ";
        
        $stmt = $pdo->prepare($sql_insert);

        for($i = 0; $i < count($handsArray); $i++){
          if( is_null($handsArray[$i]) ){
            continue;
          }
          foreach($handsArray[$i] as $hand){
            foreach($action_id AS $action){
              if($action->color == $hand->color){
                $new_hand = array('ID' => $action->action_id, 'CARD' => $hand->card, 'FREQ' => $hand->frequency);
                $stmt->execute($new_hand);
              }
            }
          }

        }
    }

    update_range( $pdo, $action_id, $handsArray );

?>
