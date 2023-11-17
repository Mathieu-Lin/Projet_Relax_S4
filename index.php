<?php
  require_once "./lib/Database.php";

  spl_autoload_register( function($class_name) {
      if (file_exists('lib/'.$class_name.'.php')) {
        require_once('lib/'.$class_name.'.php');
      }
  });

  if(!isset($_GET["url"])){
    require_once('./src/pages/Accueil.php');
  }
  else{
    require_once('./routes.php');
  }
?>