<?php
    error_reporting(E_ALL); ini_set('display_errors', 'On');
    require_once("../../lib/Database.php");

    $data = json_decode(file_get_contents("php://input"), TRUE);

    $mail = $data['email'];
    $mot_de_passe = $data['password'];
    $remember = $data['remember'];
    
    // On verifie que le compte existe
    $select = $bdd->query("SELECT id FROM account WHERE mail='$mail'");

    $select_user = $bdd->query("SELECT id FROM employee WHERE mail='$mail'");

    if($select_user->fetchColumn()){
        // On récup les infos dans la db
        // On vérifie si il a été accepter et qu'il a fini son inscription
        $select_user = $bdd->query("SELECT * FROM employee WHERE mail='$mail'");
        $result_user = $select_user->fetch(PDO::FETCH_OBJ);
        if ($mot_de_passe == $result_user->password){
            // On regard si l'utilisateur a choisi que l'on se souvienne de lui
            // Si oui on créer les différents cookies
            if($remember){
                setcookie('type','employee',time()+365*24*3600,'/','localhost');
                setcookie('email',$mail,time()+365*24*3600,'/','localhost');
                setcookie('password',$mot_de_passe,time()+365*24*3600,'/','localhost');
            }
            // On créer des variables session qui contiendrons les différentes valeurs dans la db
            $_SESSION['user']['id'] = $result_user->id;
            $_SESSION['user']['lastname'] = $result_user->lastname;
            $_SESSION['user']['firstname'] = $result_user->firstname;
            $_SESSION['user']['gender'] = $result_user->gender;
            $_SESSION['user']['mail'] = $result_user->mail;
            $_SESSION['user']['login'] = $result_user->login;
            $_SESSION['user']['phone'] = $result_user->phone;
            $_SESSION['user']['birth_date'] = $result_user->birth_date;

            $res['type'] = true;
            $res['commentaire'] = 'Vous êtes désormais connecté avec un compte employé !';
        }else{
            $res['type'] = false;
            $res['commentaire'] = 'Le mot de passe ne correpond pas au login';
        }
    
    }elseif($select->fetchColumn()){
        // On récup les infos dans la db
        // On vérifie si il a été accepter et qu'il a fini son inscription
        $select = $bdd->query("SELECT * FROM account WHERE mail='$mail'");
        $result = $select->fetch(PDO::FETCH_OBJ);
        if ($mot_de_passe == $result->password){
            // On regard si l'utilisateur a choisi que l'on se souvienne de lui
            // Si oui on créer les différents cookies
            if($remember){
                setcookie('type','externe',time()+365*24*3600,'/','localhost');
                setcookie('email',$mail,time()+365*24*3600,'/','localhost');
                setcookie('password',$mot_de_passe,time()+365*24*3600,'/','localhost');
            }
            // On créer des variables session qui contiendrons les différentes valeurs dans la db
            $_SESSION['externe']['id'] = $result->id;
            $_SESSION['externe']['lastname'] = $result->lastname;
            $_SESSION['externe']['firstname'] = $result->firstname;
            $_SESSION['externe']['gender'] = $result->gender;
            $_SESSION['externe']['mail'] = $result->mail;
            $_SESSION['externe']['phone'] = $result->phone;
            $_SESSION['externe']['birth_date'] = $result->birth_date;

            $res['type'] = true;
            $res['commentaire'] = 'Vous êtes désormais connecté.';
        }else{
            $res['type'] = false;
            $res['commentaire'] = 'Le mot de passe ne correpond pas au login';
        }

    }else{
        $res['type'] = false;
        $res['commentaire'] = "Ce compte n'existe pas.";
    }
    echo json_encode($res);
?>