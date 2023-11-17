<?php
    require_once("../../lib/Database.php");

    $data = json_decode(file_get_contents("php://input"), TRUE);
    
    $stm = $bdd->prepare("SELECT * FROM employee e JOIN service s ON e.id_service = s.id JOIN address a ON e.id_address = a.id WHERE e.id=:id");
    $stm->bindValue(":id", $data["id"]);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
?>