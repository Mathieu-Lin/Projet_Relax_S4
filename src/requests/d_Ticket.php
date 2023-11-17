<?php 
//On introduit l'objet PDO
require_once("../../lib/Database.php");
error_reporting(E_ALL);
ini_set('display_errors', 'On');
function getTicket($bdd, $type){
    // si le get = tous on recuperer toutes les données (de ceux en cours et en attente)
    if ($type == "Tous") {
        $stm = $bdd->prepare("SELECT * FROM `ticket` t  
        JOIN `employee` ec ON (t.id_creator = ec.id) 
        JOIN `employee` em ON (t.id_last_modif = em.id) 
        JOIN `room` r ON (t.id_room = r.id)
        WHERE t.status = 'In Progress' OR t.status = 'Pending'
        ORDER BY t.last_modif DESC");
    }else{ // si le get != tous on recuperer toutes les données correspondant 
        $status = $type;
        $stm = $bdd->prepare("SELECT * FROM `ticket` t  
        JOIN `employee` ec ON (t.id_creator = ec.id) 
        JOIN `employee` em ON (t.id_last_modif = em.id) 
        JOIN `room` r ON (t.id_room = r.id)
        WHERE t.status = '$status'
        ORDER BY t.last_modif DESC");
    }

    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function getRooms($bdd){
    $stm = $bdd->prepare("SELECT * FROM room");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function cancelTicket($bdd, $id_ticket){
    $id_modif = $_SESSION['user']['id'];
    date_default_timezone_set('Europe/Paris');
    $modif_date = date('Y-m-d H:i:s');

    $stm = $bdd->prepare("UPDATE `ticket` SET status ='Canceled', last_modif = '$modif_date', id_last_modif='$id_modif' WHERE id=:id");
    $stm->bindValue(":id", $id_ticket);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function getIntervention($bdd, $id_ticket){
    $stm = $bdd->prepare("SELECT * FROM `intervention` i JOIN `employee` e ON (i.id_employee = e.id) JOIN `ticket` t ON (i.id_ticket = t.id) WHERE i.id_ticket = '$id_ticket'");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

function getEmployee($bdd){
    $stm = $bdd->prepare("SELECT * FROM employee");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}


function updateTicket($bdd, $id_ticket, $status, $employee, $days, $heure_d, $heure_f){
    $id_modif = $_SESSION['user']['id'];
    date_default_timezone_set('Europe/Paris');
    $modif_date = date('Y-m-d H:i:s');
    $stm = $bdd->prepare("UPDATE `ticket` SET status ='$status', last_modif = '$modif_date', id_last_modif='$id_modif' WHERE id=:id");
    $stm->bindValue(":id", $id_ticket);
    $stm->execute();

    /*************************************************************************************** */
    if($status == 'In Progress'){
        $datetime_d = $days . ' ' . $heure_d . ':00';
        $datetimeObj_d = new DateTime($datetime_d);
        $time_s = $datetimeObj_d->format('Y-m-d H:i:s');

        $datetime_f = $days . ' ' . $heure_f . ':00';
        $datetimeObj_f = new DateTime($datetime_f);
        $time_f = $datetimeObj_f->format('Y-m-d H:i:s');

        $stm_inter = $bdd->prepare("INSERT INTO `intervention` ( `id_ticket`, `id_employee`, `time_start`, `time_end`) VALUES ('$id_ticket', '$employee','$time_s','$time_f')");
        $stm_inter->execute();
    }
    /**************************************************************************************** */

    $result = json_encode($stm_inter->fetchAll());
    echo $result;
}

if($_GET["function"] == "getTicket") {
    getTicket($bdd, $_GET['type']);
}
else if($_GET["function"] == "getRooms") {
    getRooms($bdd);
}
else if($_GET["function"] == "cancelTicket") {
    cancelTicket($bdd, $_GET['id_ticket']);
}
else if($_GET["function"] == "getEmployee") {
    getEmployee($bdd);
}
else if($_GET["function"] == "updateTicket") {
    updateTicket($bdd, $_GET['id_ticket'], $_GET['status'], $_GET['employee'], $_GET['days'], $_GET['heure_d'], $_GET['heure_f']);
}
else if($_GET["function"] == "getIntervention") {
    getIntervention($bdd, $_GET['id_ticket']);
}

?> 