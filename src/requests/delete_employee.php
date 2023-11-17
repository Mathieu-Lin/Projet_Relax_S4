<?php
    require_once("../../lib/Database.php");

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $message = array();

    //Récupération des id
    $id_address = $data['id_address'];
    $id = $data['id'];

    //requête de suppression
    $req1 = $bdd->prepare("DELETE FROM `employee` WHERE id = '$id'");
    $req2 = $bdd->query("DELETE FROM `period` WHERE id_employee = '$id'");
    $req3 = $bdd->prepare("DELETE FROM `address` WHERE id = '$id_address'");
    $req4 = $bdd->query("DELETE FROM `holiday` WHERE id_last_modif = '$id' OR id_employee='$id'");
    $req6 = $bdd->query("DELETE FROM `intervention` WHERE id_ticket = '$id' OR id_employee='$id'");

    if($req2 && $req4 && $req6){
        if($req1->execute()){
            if($req3->execute()){
                $message['type'] = true;
                $message['commentaire'] = "Employé supprimé";
            }
        }
    }
    else {
        $message['type'] = false;
        $message['commentaire'] = "Employé pas supprimé";
    }
?>