<?php
    require_once("../../lib/Database.php");

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $message = array();

    //Extraction des infos
    $lastname = $data['name'];
    $firstname = $data['firstname'];
    $gender = $data['gender'];
    $password = $data['mdp'];
    $email = $data['mail'];
    $login = $data['login'];
    $phone = $data['phone'];
    $birth_date = $data['birth_date'];
    $service = $data['service'];
    $number = $data['number'];
    $street = $data['street'];
    $zip_code = $data['zip_code'];
    $city = $data['city'];
    $country = $data['country'];


    //Vérifier que tous les champs ont été remplis
    if(isset($lastname) && isset($firstname) && isset($gender) && isset($email) && isset($login) && isset($phone) && isset($birth_date) && isset($service) && isset($number) && isset($password) && isset($street) && isset($zip_code) && isset($city) && isset($country)){
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){

            $insererAddress = $bdd->prepare("INSERT INTO address (`number`,`street`,`zip_code`,`city`,`country`) VALUES (?,?,?,?,?)");
            $insererAddress->execute(array($number,$street,$zip_code,$city,$country));

            $sql = $bdd->query("SELECT * from address WHERE `number`='$number' AND `street`='$street' AND `zip_code`='$zip_code' AND `city`='$city' AND `country`='$country'");

            if($sql->RowCount() > 0){
                $result = $sql->fetch();
                $id_address = $result['id'];

                $insererEmployee = $bdd->prepare('INSERT INTO employee (lastname,firstname,gender,mail,login,password,phone,birth_date,id_service,id_address) VALUES(?,?,?,?,?,?,?,?,?,?)');
                $insererEmployee->execute(array($lastname,$firstname,$gender,$email,$login,$password,$phone,$birth_date,$service,$id_address));

                $message['type'] = true;
                $message['commentaire'] = "l'employé a été ajouté.";
                header("Location:Management.php");
            }
        }
        else{
            $message['type'] = false;
            $message['commentaire'] = "Email pas conforme.";
        }
    }else{
        $message['type'] = false;
        $message['commentaire'] = "Veuillez remplir tous les champs";
    }
?>