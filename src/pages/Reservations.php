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
      <link rel="stylesheet" type="text/css" href="./src/styles/Reservations.css">
      <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
      <title>Relax - Réservations</title>
  </head>

  <body>

    <?php require_once("./src/components/Navbar/Navbar.php"); ?>

    <!-- Form bar -->
    <div class="formbar">
      <div class="formbar-elem">
        <div class="formbar-elem-label" id="label-old-reservation" onclick="displayOldReservations()"> Réservations passées </div>
      </div>

      <div class="formbar-elem">
        <div class="formbar-elem-label" id="label-approved-reservation" onclick="displayUpcomingReservations()"> Réservations à venir </div>
      </div>

      <div class="formbar-elem">
        <div class="formbar-elem-label" id="label-pending-reservation" onclick="displayPendingReservations()"> Réservations en attente de confirmation </div>
      </div>

      <div class="formbar-elem">
        <div class="formbar-elem-label" id="label-denied-reservation" onclick="displayDeniedReservations()"> Réservations refusées </div>
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
  <script src="./src/scripts/Reservations.js"></script>
</html>
