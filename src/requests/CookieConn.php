<?php
require_once("./lib/Database.php");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On vérifie que la variable session est n'existe pas 																			//						
// On vérifie que les variables cookie user et password existe et ne sont pas nulles											//
// Si toutes ces conditions sont validés on peut connecter dirèctement la personne à l'aide des cookie 							//	
// Cela permet aux utilisateurs de ne pas forcement se reconnecter à chaque fois 												//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (!isset($_SESSION['externe']) AND !isset($_SESSION['user']) AND isset($_COOKIE['email']) AND isset($_COOKIE['password']) AND !empty($_COOKIE['email']) AND !empty($_COOKIE['password'])) {
	$mail = $_COOKIE['email'];	// on dit que la variable $email est égale a la variable cookie -> user
	$mot_de_passe = $_COOKIE['password'];	// on dit que la variable $mdp est égale a la variable cookie -> password
	// On peut après executer la même fonction que la connexion normal afin de se connecter automatiquement
	
    if($_COOKIE['type'] == 'employee') {
        $select_user = $bdd->query("SELECT id FROM employee WHERE mail='$mail'");
        if($select_user->fetchColumn()){
            // On récup les infos dans la db
            // On vérifie si il a été accepter et qu'il a fini son inscription
            $select_user = $bdd->query("SELECT * FROM employee WHERE mail='$mail'");
            $result_user = $select_user->fetch(PDO::FETCH_OBJ);
            if ($mot_de_passe == $result_user->password){
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
                $res['commentaire'] = 'user';
            }else{
                $res['type'] = false;
                $res['commentaire'] = 'Le mot de passe ne correpond pas au login 2';
            }
        }
    }else if($_COOKIE['type'] == 'externe') {
        $select = $bdd->query("SELECT id FROM account WHERE mail='$mail'");
        if($select->fetchColumn()){
            // On récup les infos dans la db
            // On vérifie si il a été accepter et qu'il a fini son inscription
            $select = $bdd->query("SELECT * FROM account WHERE mail='$mail'");
            $result = $select->fetch(PDO::FETCH_OBJ);
            if ($mot_de_passe == $result->password){
                // On créer des variables session qui contiendrons les différentes valeurs dans la db
                $_SESSION['externe']['id'] = $result->id;
                $_SESSION['externe']['lastname'] = $result->lastname;
                $_SESSION['externe']['firstname'] = $result->firstname;
                $_SESSION['externe']['gender'] = $result->gender;
                $_SESSION['externe']['mail'] = $result->mail;
                $_SESSION['externe']['phone'] = $result->phone;
                $_SESSION['externe']['birth_date'] = $result->birth_date;
    
                $res['type'] = true;
                $res['commentaire'] = 'externe';
            }else{
                $res['type'] = false;
                $res['commentaire'] = 'Le mot de passe ne correpond pas au login 1';
            }
        }
    }else{
        $res['type'] = false;
        $res['commentaire'] = 'Aucune personne dans la base de donnée à ce login';
    }	
}
?>