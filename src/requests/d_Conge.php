<?php

require_once("../../lib/Database.php");


//Requête retourne liste des congé avec le nom et le prénom des employés par id avec ordre décroissant par la date dernière mise à jour
function getAllHolidaysFromEmployee($bdd, $id_employee)
{
    $stm = $bdd->prepare("SELECT h.*, e.firstname, e.lastname FROM `holiday` h
    JOIN `employee` e ON h.id_employee = e.id
    WHERE h.id_employee =:id_employee
    ORDER BY h.`last_modif` DESC");
    $stm->bindValue(":id_employee", $id_employee);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Requête retourne liste des congé dont en fonction de son status avec le nom et le prénom des employés par id avec ordre décroissant par la date dernière mise à jour
function getAllHolidaysFromEmployeeStatus($bdd, $id_employee, $status)
{
    $stm = $bdd->prepare("SELECT h.*, e.firstname, e.lastname FROM `holiday` h
    JOIN `employee` e ON h.id_employee = e.id
    WHERE h.id_employee =:id_employee AND h.status =:status
    ORDER BY h.`last_modif` DESC");
    $stm->bindValue(":id_employee", $id_employee);
    $stm->bindValue(":status", $status);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

// Requête retourne liste des congé avec le nom et le prénom de TOUS employés.
function getAllHolidays($bdd)
{
    $stm = $bdd->prepare("SELECT h.*, e.firstname, e.lastname FROM `holiday` h
    JOIN `employee` e ON h.id_employee = e.id 
    ORDER BY h.`last_modif` DESC");
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

// Requête retourne liste des congé avec le nom et le prénom de TOUS employés en fonction de status.
function getAllHolidaysFromStatus($bdd, $status)
{
    $stm = $bdd->prepare("SELECT h.*, e.firstname, e.lastname FROM `holiday` h
    JOIN `employee` e ON h.id_employee = e.id 
    WHERE h.status =:status 
    ORDER BY h.`last_modif` DESC");
    $stm->bindValue(":status", $status);
    $stm->execute();

    $result = json_encode($stm->fetchAll());
    echo $result;
}

//Requête retourner l'employée avec son nom du service et son adresse
function getEmployeeFromId($bdd, $id_employee)
{
    $stm = $bdd->prepare("SELECT e.*, s.name, a.number, a.street, a.zip_code, a.city, a.country FROM `employee` AS e
    JOIN `service` AS s ON s.id = e.id_service 
    JOIN `address` AS a ON a.id = e.id_address
    WHERE e.id =:id_employee");
    $stm->bindValue(":id_employee", $id_employee);
    $stm->execute();

    $result = json_encode($stm->fetch());
    echo $result;
}

//Requête répond la demande du congé soit par approved ou par denied
function updateHolidayByAnswer($bdd, $id_valid, $reason, $id_conge, $verif, $id_employee)
{
    // mise à jour congé
    $date = new DateTime();
    $ok = $date->format('Y-m-d H:i:s');
    $sql = "UPDATE `holiday`  SET `id_admin` =:id_valid, `answer` =:reason, `status` =:verif, `last_modif`  = '$ok',`id_last_modif` =:id_last_modif WHERE `id` =:id ";
    $res = $bdd->prepare($sql);
    $res->bindValue(":id_valid", $id_valid);
    $res->bindValue(":reason", $reason);
    $res->bindValue(":id", $id_conge);
    $res->bindValue(":verif", $verif);
    $res->bindValue(":id_last_modif", $id_employee);
    $res->execute();

    // Selection un congé par id
    $stm = $bdd->prepare("SELECT * FROM `holiday`
        WHERE id =:id");
    $stm->bindValue(":id", $id_conge);
    $stm->execute();
    $conge = json_encode($stm->fetch());
    $conge = json_decode($conge, true);

    if ($verif == "Approved") {

        // Inserction dans l'emploi du temps
        $sql = "INSERT INTO period (`type`,`time_start`,`time_end`,`id_employee`) VALUES ('Holiday',:time_start,:time_end,:id_employee)";
        $res2 = $bdd->prepare($sql);
        $res2->bindValue(":time_start", $conge['time_start']);
        $res2->bindValue(":time_end", $conge['time_end']);
        $res2->bindValue(":id_employee", $conge['id_employee']);
        $res2->execute();
    }
    $conge = json_encode($conge, true);
    echo $conge;
}

//Requête modifie la demande du congé en attente
function updateHolidayByModif($bdd, $time_start, $time_end, $id_conge, $justification, $id_employee)
{
    $date = new DateTime();
    $ok = $date->format('Y-m-d H:i:s');
    $sql = "UPDATE `holiday`  SET `time_start` =:time_start, `time_end` =:time_end, `message` =:justif, `last_modif`  = '$ok', `id_last_modif` =:id_last_modif WHERE `id` =:id ";
    $res = $bdd->prepare($sql);
    $res->bindValue(":time_start", $time_start);
    $res->bindValue(":time_end", $time_end);
    $res->bindValue(":id", $id_conge);
    $res->bindValue(":justif",  $justification);
    $res->bindValue(":id_last_modif", $id_employee);
    $res->execute();

    // Selection un congé par id
    $stm = $bdd->prepare("SELECT * FROM `holiday` WHERE id =:id");
    $stm->bindValue(":id", $id_conge);
    $stm->execute();
    $conge = json_encode($stm->fetch());
    echo $conge;
}

// Requête ajoute la demande du congé
function addConge($bdd,  $time_start, $time_end, $message, $id_employee)
{
    //Initialisation des variables
    $date = new DateTime();
    $ok = $date->format('Y-m-d H:i:s');
    //Execution sql 
    $res = $bdd->prepare("insert into holiday (`message`, `time_start`, `time_end`,`creation_date`,`last_modif`, `id_employee`,`status`) VALUES (:justif, :time_start, :time_end,'$ok','$ok', :id_employe,'Pending')");
    $res->bindValue(":justif", $message);
    $res->bindValue(":time_start", $time_start);
    $res->bindValue(":time_end", $time_end);
    $res->bindValue(":id_employe", $id_employee);
    $res->execute();
    echo "ok";
}

if ($_GET["function"] == "getAllHolidaysFromEmployee") {
    getAllHolidaysFromEmployee($bdd, $_GET["id_employee"]);
} else if ($_GET["function"] == "getEmployeeFromId") {
    getEmployeeFromId($bdd, $_GET["id_employee"]);
} else if ($_GET["function"] == "updateHolidayByAnswer") {
    updateHolidayByAnswer($bdd, $_GET["id_valid"], $_GET["reason"], $_GET["id_conge"], $_GET["verif"], $_GET['id_employee']);
} else if ($_GET["function"] == "updateHolidayByModif") {
    updateHolidayByModif($bdd, $_GET['time_start'], $_GET['time_end'], $_GET['id_conge'], $_GET['justification'], $_GET['id_employee']);
} else if ($_GET["function"] == "addConge") {
    addConge($bdd, $_GET['time_start'], $_GET['time_end'], $_GET['justification'], $_GET['id_employee']);
} else if ($_GET["function"] == "getAllHolidays") {
    getAllHolidays($bdd);
} else if ($_GET["function"] == "getAllHolidaysFromEmployeeStatus") {
    getAllHolidaysFromEmployeeStatus($bdd, $_GET["id_employee"], $_GET["status"]);
} else if ($_GET["function"] == "getAllHolidaysFromStatus") {
    getAllHolidaysFromStatus($bdd, $_GET["status"]);
}
