<?php
    require_once("../../lib/Database.php");
    
    function get_user($bdd)
    {
        if(isset($_SESSION['externe'])){
            $stm = $bdd->prepare("SELECT * FROM account ac JOIN address a ON ac.id_address = a.id WHERE ac.id=:id");
            $stm->bindValue(":id", $_SESSION['externe']['id']);
            $stm->execute();
    
            $result = json_encode($stm->fetchAll());
            echo $result;
        }
    }
    
    function update_profile($bdd, $lastname, $firstname, $birthdate, $phone, $mail){
        $stm = $bdd->prepare("UPDATE account SET lastname = :lastname, firstname = :firstname, birth_date = :birthdate, phone = :phone, mail = :mail WHERE id = :id");
    
        $stm->bindValue(":lastname", $lastname);
        $stm->bindValue(":firstname", $firstname);
        $stm->bindValue(":birthdate", $birthdate);
        $stm->bindValue(":phone", $phone);
        $stm->bindValue(":mail", $mail);
        $stm->bindValue(":id", $_SESSION['externe']['id']);
        $stm->execute();
    
        $result = json_encode($stm->fetchAll());

        $_SESSION['externe']['lastname'] = $lastname;
        $_SESSION['externe']['firstname'] = $firstname;
        $_SESSION['externe']['mail'] = $mail;
        $_SESSION['externe']['phone'] = $phone;
        $_SESSION['externe']['birth_date'] = $birthdate;

        echo $result;
    }

    function update_address($bdd, $number, $street, $zip_code, $city, $country, $id){
        $stm = $bdd->prepare("UPDATE address SET number = :number, street = :street, zip_code = :zip_code, city = :city, country = :country WHERE id = :id");
    
        $stm->bindValue(":number", $number);
        $stm->bindValue(":street", $street);
        $stm->bindValue(":zip_code", $zip_code);
        $stm->bindValue(":city", $city);
        $stm->bindValue(":country", $country);
        $stm->bindValue(":id", $id);
        $stm->execute();
    
        $result = json_encode($stm->fetchAll());

        $_SESSION['externe']['number'] = $number;
        $_SESSION['externe']['street'] = $street;
        $_SESSION['externe']['zip_code'] = $zip_code;
        $_SESSION['externe']['city'] = $city;
        $_SESSION['externe']['country'] = $country;

        echo $result;
    }

    function update_password($bdd, $pwd){
        $stm = $bdd->prepare("UPDATE account SET password = :pwd WHERE id = :id");
    
        $stm->bindValue(":pwd", $pwd);
        $stm->bindValue(":id", $_SESSION['externe']['id']);
        $stm->execute();
    
        $result = json_encode($stm->fetchAll());

        $_SESSION['externe']['password'] = $pwd;

        echo $result;
    }

    if($_GET["function"] == "get_user") {
        get_user($bdd);
    }

    if($_GET["function"] == "update_profile") {
        update_profile($bdd, $_GET["lastname"], $_GET["firstname"], $_GET["birthdate"], $_GET["phone"], $_GET["mail"]);
    }

    if($_GET["function"] == "update_address") {
        update_address($bdd, $_GET["number"], $_GET["street"], $_GET["zip_code"], $_GET["city"], $_GET["country"], $_GET["id"]);
    }

    if($_GET["function"] == "update_password") {
        update_password($bdd, $_GET["pwd"]);
    }
    
?>