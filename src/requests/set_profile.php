<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 'On');

    require_once("../../lib/Database.php");

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $message = array();

    //Extraction des infos
    $id_update = $data['id'];
    $id_service = $data['service'];
    $id_address = $data['id_address'];
    $lastname = $data['name'];
    $firstname = $data['firstname'];
    $gender = $data['gender'];
    $email = $data['mail'];
    $login = $data['login'];
    $phone = $data['phone'];
    $birth_date = $data['birth_date'];
    $number = $data['number'];
    $street = $data['street'];
    $zip_code = $data['zip_code'];
    $city = $data['city'];
    $country = $data['country'];


    //verifier que tous les champs ont été remplis
    if(isset($lastname) && isset($firstname) && isset($gender) && isset($email) && isset($login) && isset($phone) && isset($birth_date) && isset($id_service) && isset($number) && isset($street) && isset($zip_code) && isset($city) && isset($country)){
    //requêtes de modification

        //Données personnelles
        $req1 = $bdd->query("UPDATE employee SET lastname = '$lastname', firstname = '$firstname', gender = '$gender', mail= '$email', login = '$login', phone = '$phone', birth_date = '$birth_date', id_service = '$id_service' WHERE id = '$id_update'");

        //Addresse
        $req3 = $bdd->query("UPDATE address SET number = '$number', street = '$street', zip_code = '$zip_code', city = '$city', country = '$country' WHERE id = '$id_address'");

        if($req1 || $req3){
            $message['type'] = true;
            $message['commentaire'] = "Le profil a bien été modifié.";
        }
        else {
            $message['type'] = false;
            $message['commentaire'] = "Employé non modifié";
        }
    }else {
        $message['type'] = false;
        $message['commentaire'] = "Veuillez remplir tous les champs !";
    }   
?>