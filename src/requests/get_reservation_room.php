<?php
    require_once("../../lib/Database.php");

    //préparation de la requète qui donne la liste des employés en fonction de leur service
    $stm = $bdd->prepare("SELECT * FROM `reservation` 
    WHERE `time_end` > :time_start AND `time_start` < :time_end AND id_room = :id;");
    $stm->bindValue(":id", $_GET["id"], PDO::PARAM_INT);
    $stm->bindValue(":time_start", $_GET["time_start"], PDO::PARAM_STR);
    $stm->bindValue(":time_end", $_GET["time_end"], PDO::PARAM_STR);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
?>
