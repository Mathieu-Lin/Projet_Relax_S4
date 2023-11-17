<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");

//Retourne une period.
function getPeriod($bdd, $id_period){
    $stm = $bdd->prepare("select * from `period` where id=:id_period");
    $stm->bindValue(":id_period", $id_period);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//préparation de la requète qui indique si il y a un conflit avec le créneau que l'on souhaite ajouter (créneau déjà défini ou congé)
function getPeriodOverlap($bdd, $time_start, $time_end, $id_employee){
      $stm = $bdd->prepare
      (
          "SELECT * FROM `period` p
          WHERE (p.id_employee = :id_employee) AND (((p.time_start < :time_start) AND (p.time_end > :time_start)) OR ((p.time_start < :time_end) AND (p.time_end > :time_end)) OR ((p.time_start = :time_start) AND (p.time_end = :time_end)) OR (p.id_employee IN (SELECT id_employee FROM `holiday` h WHERE h.status = 'Approved' AND ((h.time_start <= :time_start) AND (h.time_end >= :time_start)))))"
      );
  
      $stm->bindValue(":time_start", $time_start);
      $stm->bindValue(":time_end", $time_end);
      $stm->bindValue(":id_employee", $id_employee);
      $stm->execute();
      
      $result = json_encode($stm->fetchAll());
      echo($result);
}

//ajoute un créneau à un employé
function addPeriod($bdd, $time_start, $time_end, $id_employee){
    $stm = $bdd->prepare("insert into period (`type`, `time_start`, `time_end`, `id_employee`) VALUES ('Working', :time_start, :time_end, :id_employee)");

    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":id_employee", $id_employee);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//ajoute un créneau à un employé
function addPeriodMeeting($bdd, $time_start, $time_end, $id_employee){
    $stm = $bdd->prepare("insert into period (`type`, `time_start`, `time_end`, `id_employee`) VALUES ('Meeting', :time_start, :time_end, :id_employee)");

    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":id_employee", $id_employee);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Requête retournant toutes les interventions d'une liste d'employés.
function getInterventionsForEmployees($bdd, $id, $time_start, $time_end){
    $stm = $bdd->prepare("SELECT * FROM `intervention` i
    JOIN `ticket` t ON t.id = i.id_ticket
    WHERE `time_end` > :time_start AND `time_start` < :time_end AND id_employee IN (" . $id . ");");
    $stm->bindValue(":time_start", $time_start, PDO::PARAM_STR);
    $stm->bindValue(":time_end", $time_end, PDO::PARAM_STR);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Requête retournant toutes les periods d'une liste d'employés.
function getPeriodsForEmployees($bdd, $id, $time_start, $time_end){
    $stm = $bdd->prepare("SELECT * FROM `period` 
    WHERE type = 'Working' AND time_end > :time_start AND time_start < :time_end AND id_employee IN (" . $id . ");");
    $stm->bindValue(":time_start", $time_start, PDO::PARAM_STR);
    $stm->bindValue(":time_end", $time_end, PDO::PARAM_STR);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Requête retournant toutes les periods d'une liste d'employés.
function getMeetings($bdd, $id, $time_start, $time_end){
    $stm = $bdd->prepare("SELECT * FROM `period` 
    WHERE type = 'Meeting' AND time_end > :time_start AND time_start < :time_end AND id_employee IN (" . $id . ");");
    $stm->bindValue(":time_start", $time_start, PDO::PARAM_STR);
    $stm->bindValue(":time_end", $time_end, PDO::PARAM_STR);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}


if($_GET["function"] == "getPeriod") {
    getPeriod($bdd, $_GET["id_period"]);
}
else if($_GET["function"] == "getPeriodOverlap") {
    getPeriodOverlap($bdd, $_GET["time_start"], $_GET["time_end"], $_GET["id_employee"]);
}
else if($_GET["function"] == "addPeriod") {
    addPeriod($bdd, $_GET["time_start"], $_GET["time_end"], $_GET["id_employee"]);
}
else if($_GET["function"] == "addPeriodMeeting") {
    addPeriodMeeting($bdd, $_GET["time_start"], $_GET["time_end"], $_GET["id_employee"]);
}
else if($_GET["function"] == "getInterventionsForEmployees"){
    getInterventionsForEmployees($bdd, $_GET["id"], $_GET["time_start"], $_GET["time_end"]);
}
else if($_GET["function"] == "getPeriodsForEmployees") {
    getPeriodsForEmployees($bdd, $_GET["id"], $_GET["time_start"], $_GET["time_end"]);
}
else if($_GET["function"] == "getMeetings") {
    getMeetings($bdd, $_GET["id"], $_GET["time_start"], $_GET["time_end"]);
}


?>