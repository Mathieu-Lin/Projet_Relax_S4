<?php
    require_once("../../lib/Database.php");

    //préparation de la requète qui donne une adresse en fonction de son id
    $stm = $bdd->prepare("select * from address where id=:id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;

?>