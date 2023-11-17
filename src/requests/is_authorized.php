<?php
    require_once("../../lib/Database.php");

    $stm = $bdd->prepare("SELECT `id_service` FROM `employee` 
    WHERE id = {$_SESSION["user"]["id"]};");
    $stm->execute();
    
    $result = $stm->fetchAll();
    if($result[0]['id_service'] == 1){
        echo 1;
    }
    else{
        echo 0;
    }
?>