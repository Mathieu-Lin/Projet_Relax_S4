<?php

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Fonction session_start() crée une session ou restaure celle trouvée sur le serveur, via l'identifiant						//
// // de session passé dans une requête GET, POST ou par un cookie.																//
// // Fonction ob_start() permet d'utiliser les fonctions header.																	//
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ob_start();
  session_start();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mysqli ==> Base de donnée exclusivement Mysql | PDO ==> Tout type de base de donnée (PDO est plus simple que mysqli)			//						
// Connexion a la base de donnée																								//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $bdd = NULL; 
  
  try{
    $bdd = new PDO('mysql:host=localhost;port=3306;dbname=relax;charset=utf8','root','');		
    $bdd->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);								// Force les noms de colonnes en minuscule
    $bdd->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION); 					// Reporter les erreurs de PDO
  }
  catch(Exception $e){
    echo "une erreur est survenue : ". $e ;
    die();
  }
