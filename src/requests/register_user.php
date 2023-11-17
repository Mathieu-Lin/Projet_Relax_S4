<?php
 error_reporting(E_ALL); ini_set('display_errors', 'On');
    require_once("../../lib/Database.php");

    $data = json_decode(file_get_contents("php://input"), TRUE);


    $gender = $data['gender'];
    $lastname = ucfirst(strtolower($data['lastname']));
    $firstname = ucfirst(strtolower($data['firstname']));
    $birthday = $data['birthday'];
    $phone = $data['phone'];
    $email = $data['email'];
    $mdp = $data['mdp'];
    $number = $data['number'];
    $street = $data['street'];
    $cp = $data['cp'];
    $city = ucfirst(strtolower($data['city']));
    $country =  ucfirst(strtolower($data['country']));


    $stm_account_exist = $bdd->prepare("SELECT * FROM `account` WHERE mail='$email'");
    $stm_account_exist->execute();
    $count = $stm_account_exist->rowCount();

    
    if($count == 1){
        $stm_account_exist_fetch = $stm_account_exist->fetch(PDO::FETCH_ASSOC);
        $id_adresse = $stm_account_exist_fetch['id_address'];
        if($id_adresse == NULL){
            // ajout adresse
            $stm_adress = $bdd->query("INSERT INTO `address` (`number`, `street`, `zip_code`, `city`, `country`) VALUES ('$number', '$street', '$cp', '$city', '$country')");
            $id_adresse_val = $bdd->lastInsertId();
            // complet user
            $stm_account = $bdd->query("UPDATE `account` SET `password`='$mdp', `birth_date`='$birthday', `id_address`='$id_adresse_val' WHERE `mail`='$email'");
            $res['type'] = true;
            $res['commentaire'] = 'Compté créé avec succès.';
        }else{
            $res['type'] = false;
            $res['commentaire'] = 'Vous avez déjà un compte utilistaeur !';
        }
    }else{
        $stm_employee_exist = $bdd->prepare("SELECT * FROM `employee` WHERE mail='$email'");
        $stm_employee_exist->execute();
        $count_employee = $stm_employee_exist->rowCount();
        if($count_employee == 1){
            $res['type'] = false;
            $res['commentaire'] = 'Vous avez déjà un compte employé !';
        }else{
            // ajout adresse
            $stm_adress = $bdd->query("INSERT INTO `address` (`number`, `street`, `zip_code`, `city`, `country`) VALUES ('$number', '$street', '$cp', '$city', '$country')");
            $id_adresse_val = $bdd->lastInsertId();
            // complet user
            $date_creation = date('Y-m-d H:i:s');
            $stm_account = $bdd->query("INSERT INTO `account` (`lastname`, `firstname`, `gender`, `mail`, `password`, `phone`, `birth_date`, `creation_date`, `id_address`) VALUES ('$lastname', '$firstname', '$gender', '$email', '$mdp', '$phone', '$birthday', '$date_creation', '$id_adresse_val')");
            $res['type'] = true;
        }
    }

    echo json_encode($res);
?>