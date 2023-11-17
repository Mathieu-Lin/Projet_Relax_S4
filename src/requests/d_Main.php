<?php

require_once("../../lib/Database.php");


//Requête retourne liste des employés.
function getAllEmployees($bdd){
    $stm = $bdd->prepare("select * from employee");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Requête retourne employé.
function getEmployee($bdd, $id){
    $stm = $bdd->prepare("select * from employee WHERE id =:id");
    $stm->bindValue(":id", $id);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}


if($_GET["function"] == "getAllEmployees") {
    getAllEmployees($bdd);
}
else if($_GET["function"] == "getEmployee") {
    getEmployee($bdd, $_GET["id"]);
}


?>