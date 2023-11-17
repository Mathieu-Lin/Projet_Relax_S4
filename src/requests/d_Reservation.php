<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");

function getRoom($bdd, $id){
    $stm = $bdd->prepare("select * from room where id=:id");
    $stm->bindValue(":id", $id);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Retourne une period.
function getRooms($bdd){
    $stm = $bdd->prepare("select * from room");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Retourne une period.
function getPeriodsForRoom($bdd, $time_start, $time_end, $id_room){
    $stm = $bdd->prepare("SELECT r.*, a.firstname, a.lastname, ro.floor, ro.number, ro.capacity FROM `reservation` r
	JOIN `account` a ON a.id = r.id_account
    JOIN `room` ro ON ro.id = r.id_room
    WHERE r.time_end > :time_start AND r.time_start < :time_end AND id_room = :id_room AND status = 'Approved'");
    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":id_room", $id_room);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Retourne une period.
function getInterventionsForRoom($bdd, $time_start, $time_end, $id_room){
    $stm = $bdd->prepare("SELECT i.*, e.lastname, e.firstname, e.id_service, s.name, t.description, t.creation_date, t.last_modif, e2.firstname AS firstname_modif, e2.lastname AS lastname_modif, r.floor, r.number FROM `intervention` i
	JOIN `employee` e ON e.id = i.id_employee 
    JOIN `service` s ON s.id = e.id_service
    JOIN `ticket` t ON t.id = i.id_ticket
   	JOIN `employee` e2 ON e2.id = t.id_last_modif
    JOIN `room`r ON r.id = t.id_room
    WHERE `time_end` > :time_start AND `time_start` < :time_end AND t.id_room = :id_room");

    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":id_room", $id_room);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function getPendingReservations($bdd){
    $stm = $bdd->prepare("SELECT * FROM reservation re JOIN room ro ON re.id_room = ro.id WHERE re.status = 'Pending'");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function Approve_demand($bdd, $id_reservation)
{
    $stm = $bdd->prepare("UPDATE reservation re SET re.status = 'Approved' WHERE id = :id_reservation");
    $stm->bindValue(":id_reservation", $id_reservation);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function Deny_demand($bdd, $id_reservation)
{
    $stm = $bdd->prepare("UPDATE reservation re SET re.status = 'Denied' WHERE id = :id_reservation");
    $stm->bindValue(":id_reservation", $id_reservation);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

if($_GET["function"] == "getRoom") {
    getRoom($bdd, $_GET["id"]);
}
else if($_GET["function"] == "getRooms") {
    getRooms($bdd);
}
else if($_GET["function"] == "getPendingReservations") {
    getPendingReservations($bdd);
}
else if($_GET["function"] == "Approve_demand") {
    Approve_demand($bdd, $_GET["id_reservation"]);
}
else if($_GET["function"] == "Deny_demand") {
    Deny_demand($bdd, $_GET["id_reservation"]);
}
else if($_GET["function"] == "getInterventionsForRoom") {
    getInterventionsForRoom($bdd, $_GET["time_start"], $_GET["time_end"], $_GET["id_room"]);
}
else if($_GET["function"] == "getPeriodsForRoom") {
    getPeriodsForRoom($bdd, $_GET["time_start"], $_GET["time_end"], $_GET["id_room"]);
}



?>