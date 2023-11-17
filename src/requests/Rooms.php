<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");

function getAvailableRooms($bdd, $time_start, $time_end, $capacity){
    //préparation de la requète qui renvoit toutes les chambres disponibles
    $stm = $bdd->prepare
    (
        "SELECT * FROM `room` ro
        WHERE ro.capacity >= :capacity AND ro.id NOT IN (SELECT DISTINCT re.id_room FROM reservation re WHERE (time_start <= :time_start AND time_end >= :time_start) OR (time_start <= :time_end AND time_end >= :time_end) OR ((time_start >= :time_start) AND (time_end <= :time_end)))"
    );

    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":capacity", $capacity);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function addReservation($bdd, $time_start,  $time_end,  $nbr_adult,  $nbr_child,  $id_room){
    //préparation de la requète qui renvoit toutes les chambres disponibles
    $stm = $bdd->prepare("insert into reservation (`time_start`, `time_end`, `nbr_adult`, `nbr_child`, `id_room`, `status`, `id_account`) VALUES (:time_start, :time_end, :nbr_adult, :nbr_child, :id_room, 'Pending', :id)");

    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":nbr_adult", $nbr_adult);
    $stm->bindValue(":nbr_child", $nbr_child);
    $stm->bindValue(":id_room", $id_room);
    $stm->bindValue(":id", $_SESSION['externe']['id']);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}


if($_GET["function"] == "getAvailableRooms") {
    getAvailableRooms($bdd, $_GET["time_start"],  $_GET["time_end"],  $_GET["capacity"]);
}
else if($_GET["function"] == "addReservation") {
    addReservation($bdd,  $_GET["time_start"],  $_GET["time_end"],  $_GET["nbr_adult"],  $_GET["nbr_child"],  $_GET["id_room"]);
}


?>