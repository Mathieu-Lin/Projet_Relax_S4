<?php 
/******************************************************************************************** */
// error_reporting(E_ALL);
// ini_set('display_errors', 'On');
/******************************************************************************************** */
require_once("../../lib/Database.php");
$data = json_decode(file_get_contents("php://input"), TRUE);
$res = array();
/******************************************************************************************** */
// recupe info 
    $desc = $data['desc'];
    $room = $data['room'];

    $id_creator = $_SESSION['user']['id'];
    date_default_timezone_set('Europe/Paris');
    $creation_date = date('Y-m-d H:i:s');
/******************************************************************************************** */
// verification bon lancement requete
    if($bdd->query("INSERT INTO `ticket`(`description`, `status`, `id_room`, `id_creator`, `creation_date`, `last_modif`, `id_last_modif`) VALUES ('$desc', 'Pending', '$room', '$id_creator', '$creation_date', '$creation_date', '$id_creator')")) {
        $res['type'] = true;
        $res['commentaire'] = 'Ticket bien ajouté';
    }else{
        $res['type'] = false;
        $res['commentaire'] = 'Erreur ajout ticket';
    }
/******************************************************************************************** */
    echo json_encode($res);

?>