<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");

function displayOldReservations($bdd){
    $stm = $bdd->prepare ("SELECT * FROM reservation re JOIN room ro ON re.id_room = ro.id WHERE re.time_end < CURRENT_TIMESTAMP AND re.status = 'Approved' AND id_account = :id");
    $stm->bindValue(":id", $_SESSION['externe']['id']);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function displayUpcomingReservations($bdd){
    $stm = $bdd->prepare ("SELECT * FROM reservation re JOIN room ro ON re.id_room = ro.id WHERE re.time_end >= CURRENT_TIMESTAMP AND re.status = 'Approved' AND id_account = :id");
    $stm->bindValue(":id", $_SESSION['externe']['id']);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function displayPendingReservations($bdd){
    $stm = $bdd->prepare ("SELECT * FROM reservation re JOIN room ro ON re.id_room = ro.id WHERE re.time_end >= CURRENT_TIMESTAMP AND re.status = 'Pending' AND id_account = :id");
    $stm->bindValue(":id", $_SESSION['externe']['id']);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function displayDeniedReservations($bdd){
    $stm = $bdd->prepare ("SELECT * FROM reservation re JOIN room ro ON re.id_room = ro.id WHERE re.time_end >= CURRENT_TIMESTAMP AND re.status = 'Denied' AND id_account = :id");
    $stm->bindValue(":id", $_SESSION['externe']['id']);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function updateReservation($bdd, $time_start, $time_end, $nb_adults, $nb_children, $id){
    $stm = $bdd->prepare ("UPDATE reservation SET time_start = :time_start, time_end = :time_end, nbr_adult = :nb_adults, nbr_child = :nb_children WHERE id = :id");
    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->bindValue(":nb_adults", $nb_adults);
    $stm->bindValue(":nb_children", $nb_children);
    $stm->bindValue(":id", $id);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function deleteReservation($bdd, $id){
    $stm = $bdd->prepare ("DELETE FROM reservation WHERE id = :id");
    $stm->bindValue(":id", $id);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

function isRoomAvailable($bdd, $id_room, $id_reservation, $time_start, $time_end){
    $stm = $bdd->prepare ("SELECT id FROM reservation WHERE id_room = :id_room AND id != :id_reservation AND ((time_start <= :time_start AND time_end >= :time_start) OR (time_start <= :time_end AND time_end >= :time_end) OR ((time_start >= :time_start) AND (time_end <= :time_end)))");
    $stm->bindValue(":id_room", $id_room);
    $stm->bindValue(":id_reservation", $id_reservation);
    $stm->bindValue(":time_start", $time_start);
    $stm->bindValue(":time_end", $time_end);
    $stm->execute();
    
    $result = json_encode($stm->fetchAll());
    echo($result);
}

if($_GET["function"] == "displayOldReservations") {
    displayOldReservations($bdd);
}

else if($_GET["function"] == "displayUpcomingReservations") {
    displayUpcomingReservations($bdd);
}

else if($_GET["function"] == "displayPendingReservations") {
    displayPendingReservations($bdd);
}

else if($_GET["function"] == "displayDeniedReservations") {
    displayDeniedReservations($bdd);
}

else if($_GET["function"] == "isRoomAvailable") {
    isRoomAvailable($bdd, $_GET["id_room"], $_GET["id_reservation"], $_GET["time_start"], $_GET["time_end"]);
}

else if($_GET["function"] == "updateReservation") {
    updateReservation($bdd, $_GET["time_start"], $_GET["time_end"], $_GET["nb_adults"], $_GET["nb_children"], $_GET["id"]);
}

else if($_GET["function"] == "deleteReservation") {
    deleteReservation($bdd, $_GET["id"]);
}
?>

