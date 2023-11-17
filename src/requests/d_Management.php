<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");

//Retourne tous les employés d'un service.
function getServices($bdd){
    $stm = $bdd->prepare("select * from service");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Retourne tous les employés d'un service.
function getEmployeesFromService($bdd, $id){
    $stm = $bdd->prepare("SELECT * FROM employee WHERE id_service=:id");
    $stm->bindValue(":id", $id);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Retourne l'intervention si l'id passé en paramètre est actuellement en intervention
function getEmployeeInterventionStatus($bdd, $id){
    $stm = $bdd->prepare("select * from intervention where time_start < CURRENT_TIMESTAMP AND time_end > CURRENT_TIMESTAMP and id_employee=:id");
    $stm->bindValue(":id", $id);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function getEmployeeWorkingStatus($bdd, $id){
    $stm = $bdd->prepare("select * from period where time_start < CURRENT_TIMESTAMP AND time_end > CURRENT_TIMESTAMP and id_employee=:id");
    $stm->bindValue(":id", $id);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}


if($_GET["function"] == "getServices") {
    getServices($bdd);
}
else if($_GET["function"] == "getEmployeesFromService") {
    getEmployeesFromService($bdd, $_GET["id"]);
}
else if($_GET["function"] == "getEmployeeInterventionStatus") {
    getEmployeeInterventionStatus($bdd, $_GET["id"]);
}
else if($_GET["function"] == "getEmployeeWorkingStatus") {
    getEmployeeWorkingStatus($bdd, $_GET["id"]);
}

?>