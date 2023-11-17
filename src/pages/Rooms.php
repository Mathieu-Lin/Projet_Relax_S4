<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
      <link rel="stylesheet" type="text/css" href="./src/components/Navbar/Navbar.css">
      <link rel="stylesheet" type="text/css" href="./src/components/LoginModal/LoginModal.css">
      <link rel="stylesheet" type="text/css" href="./src/components/Footer/Footer.css">
      <link rel="stylesheet" type="text/css" href="./src/styles/Rooms.css">
      <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
      <title>Relax - Nos chambres</title>
  </head>

  <body>
    <?php require_once("./src/components/Navbar/Navbar.php"); ?>

    <!-- Form bar -->
    <div class="formbar">
      <div class="formbar-elem">
        <div class="formbar-elem-label"> Début </div>
        <input class="formbar-elem-input" type="date" name="date_start" onChange="displayRooms(this.value, input_date_end.value, input_nb_adults.value, input_nb_children.value);">
      </div>


      <div class="formbar-elem">
        <div class="formbar-elem-label"> Fin </div>
        <input class="formbar-elem-input" type="date" name="date_end" onChange="displayRooms(input_date_start.value, this.value, input_nb_adults.value, input_nb_children.value);">
      </div>

      <div class="formbar-elem">
        <div class="formbar-elem-label"> Adultes </div>
        <input class="formbar-elem-input" type="number" name="nb_adults" value="1" min="1" max="4" onKeyDown="return false" onChange="displayRooms(input_date_start.value, input_date_end.value, this.value, input_nb_children.value);">
      </div>

      <div class="formbar-elem">
        <div class="formbar-elem-label"> Enfants </div>
        <input class="formbar-elem-input" type="number" name="nb_children" value="0" min="0" max="4" onKeyDown="return false" onChange="displayRooms(input_date_start.value, input_date_end.value, input_nb_adults.value, this.value);">
      </div>
    </div>
    
    <!-- Conteneur principal -->
    <div class="main-container">
      <div class="rooms-container" id="rooms-container">
      </div>
    </div> 

    <div class="toast-container"></div>
    <?php require_once("./src/components/Footer/Footer.php"); ?>

  </body>




  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>

  <script src="./src/scripts/main.js"></script>
  <script src="./src/scripts/Rooms.js"></script>
</html>
