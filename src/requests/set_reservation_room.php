<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

    require_once("../../lib/Database.php");
    // $_GET = json_decode(file_get_contents("php://input"), TRUE);

    $res = array();

    $lastname = $_GET['name'];
    $firstname = $_GET['prenom'];
    $gender = $_GET['gender'];
    $mail = $_GET['mail'];
    $phone = $_GET['phone'];

    
    $debut  = $_GET['date_debut'];
    $end = $_GET['date_end'];
    $nb_adult = $_GET['nb_adult'];
    $nb_child = $_GET['nb_child']; 
    $id_room = $_GET['id']; 

/*
    $lastname = 'GRANDY';

    $firstname = 'Kylian';
    $gender = 'Male';
    $mail = 'kylian.grandy@gmail.com';
    $phone = 782824600;

    
    $debut  = '2023-04-28T11:11';
    $end = '2023-04-26T12:12';
    $nb_adult = 1;
    $nb_child = 1;
    $id_room = 1; */

    
    // Création d'un objet DateTime à partir de la chaîne de caractères
    $nouvelle_date_debut = new DateTime($debut);
    $nouvelle_date_fin = new DateTime($end);

    $date_final_debut = $nouvelle_date_debut->format('Y-m-d H:i:s');
    $date_final_fin = $nouvelle_date_fin->format('Y-m-d H:i:s');


    $stm_account_exist = $bdd->prepare("SELECT * FROM `account` WHERE mail='$mail'");
    $stm_account_exist->execute();
    $count = $stm_account_exist->rowCount();

    
    if($count == 1){
        $stm_account_exist_fetch = $stm_account_exist->fetch(PDO::FETCH_ASSOC);
        $id_account = $stm_account_exist_fetch['id'];
    }else{
        $stm_account = $bdd->prepare("INSERT INTO `account` (`lastname`, `firstname`, `gender`, `mail`, `phone`) VALUES ('$lastname', '$firstname', '$gender', '$mail', '$phone') ");
        if($stm_account->execute()){
            $id_account = $bdd->lastInsertId();
            $res['type'] = true;
        }else{
            $res['type'] = false;
            $res['commentaire'] = 'Réservation erreur account';
        }
    }

    $possibleAjout = true;

    $stm_room_info = $bdd->prepare("SELECT * FROM `room` room JOIN `reservation` resa ON (room.id = resa.id_room) WHERE room.id='$id_room'");
    $stm_room_info->execute();
    while($row = $stm_room_info->fetch(PDO::FETCH_ASSOC)){
        // var_dump($row);
        if(($row['time_start'] > $date_final_fin) || ($row['time_end'] < $date_final_debut)){
            $nb_personne = intval($nb_adult) + intval($nb_child);
            // echo $nb_personne;
            if($row['capacity'] >= $nb_personne){
                // nothing
            }else{
                $res['type'] = true;
                $res['commentaire'] = 'Nombre de personne trop éleve';
                $possibleAjout = false;
            }
        }else{
            $res['type'] = true;
            $res['commentaire'] = 'Déja reserver dans cette periode';
            $possibleAjout = false;
        }
    }
    if($possibleAjout == true){
        $stm_resa = $bdd->prepare("INSERT INTO `reservation` (`time_start`, `time_end`, `nbr_adult`, `nbr_child`, `id_room`, `id_account`) VALUES ('$date_final_debut', '$date_final_fin', '$nb_adult', '$nb_child', '$id_room', '$id_account') ");
        if($stm_resa->execute()){
            $res['type'] = true;
            $res['commentaire'] = 'Réservation bien ajouter';
        }else{
            $res['type'] = false;
            $res['commentaire'] = 'Réservation erreur reservation';
        }
    }
    
    echo json_encode($res);

?>
