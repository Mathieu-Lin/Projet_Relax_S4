<?php 

class Route {
    public static $validRoutes = array();

    public static function set($route, $function) {
      self::$validRoutes[] = $route;

      if ($_GET['url'] == $route) {
        if(isset($_SESSION['user']['id']) || isset($_SESSION['externe']['id'])){
          $function -> __invoke();
        }
        else{
          $_SESSION['message'] = "<script> createToast(0, 'Non autorisé', 'Connectez-vous pour accéder à cette page.') </script>";
          header("Location: ./");
        }
      }
    }
}

?>