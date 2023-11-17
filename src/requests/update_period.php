<?php

    //connexion à la BDD
    require_once("../../lib/Database.php");

    //préparation de la requète ajoute un créneau à un employé
    $stm = $bdd->prepare("update period set time_start = :time_start, time_end = :time_end WHERE id = :id");
    $stm->bindValue(":time_start", $_GET["time_start"]);
    $stm->bindValue(":time_end", $_GET["time_end"]);
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
?>