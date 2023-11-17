<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");

//Requête retournant toutes les periods d'une liste d'employés.
function getPeriodsForEmployees($bdd, $id, $time_start, $time_end){
    $stm = $bdd->prepare("SELECT * FROM `period` 
    WHERE `time_end` > :time_start AND `time_start` < :time_end AND id_employee IN (" . $id . ");");
    $stm->bindValue(":time_start", $time_start, PDO::PARAM_STR);
    $stm->bindValue(":time_end", $time_end, PDO::PARAM_STR);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}


//Requête retournant toutes les interventions d'une liste d'employés.
function getInterventionsForEmployees($bdd, $id, $time_start, $time_end){
    $stm = $bdd->prepare("SELECT i.*, e.lastname, e.firstname, e.id_service, s.name, t.description, t.creation_date, t.last_modif, e2.firstname AS firstname_modif, e2.lastname AS lastname_modif, r.floor, r.number FROM `intervention` i
	JOIN `employee` e ON e.id = i.id_employee 
    JOIN `service` s ON s.id = e.id_service
    JOIN `ticket` t ON t.id = i.id_ticket
   	JOIN `employee` e2 ON e2.id = t.id_last_modif
    JOIN `room`r ON r.id = t.id_room
    WHERE `time_end` > :time_start AND `time_start` < :time_end AND id_employee IN (" . $id . ");");
    $stm->bindValue(":time_start", $time_start, PDO::PARAM_STR);
    $stm->bindValue(":time_end", $time_end, PDO::PARAM_STR);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

if($_GET["function"] == "getPeriodsForEmployees") {
    getPeriodsForEmployees($bdd, $_GET["id"], $_GET["time_start"], $_GET["time_end"]);
}
else if($_GET["function"] == "getInterventionsForEmployees"){
    getInterventionsForEmployees($bdd, $_GET["id"], $_GET["time_start"], $_GET["time_end"]);
}

?>