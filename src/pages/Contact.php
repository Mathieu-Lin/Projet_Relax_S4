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
      <link rel="stylesheet" type="text/css" href="./src/styles/Contact.css">
      <title>Relax - Nos chambres</title>
  </head>

  <body>
    <?php require_once("./src/components/Navbar/Navbar.php"); ?>
    
    <!-- Conteneur principal -->
    <div class="main-container-contact">
      <div class="map-section">
        <h3 class="contact-title">Comment venir ?</h3>
        <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d353951.27788266307!2d5.539840306046956!3d46.12596216621476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ca6c96dc710cf%3A0xec044264ae2bc730!2sRelax%20Hotel!5e0!3m2!1sfr!2sfr!4v1684674820736!5m2!1sfr!2sfr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div class="transport-section">
        <div class="transport-section-elem">
          <h3 class="transport-title"> En voiture</h3>
          <p class="transport-text"> 
            Rejoignez l'autoroute la plus proche depuis votre emplacement. <br>
            Suivez les panneaux indiquant Bourg-en-Bresse. <br>
            Prenez la sortie appropriée en direction de Maillat. <br>
            Suivez les indications jusqu'à atteindre l'hôtel Relax.
          </p>
        </div>

        <div class="transport-section-elem">
          <h3 class="transport-title"> En bus</h3>
          <p class="transport-text"> 
            Rendez-vous à la gare routière la plus proche de votre emplacement. <br>
            Achetez un billet pour Maillat ou une autre commune proche. <br>
            Une fois arrivé à Maillat, descendez du bus et consultez votre GPS pour vous rendre à l'hôtel Relax de Maillat. <br>
            Suivez les indications jusqu'à atteindre l'hôtel Relax.
          </p>
        </div>

        <div class="transport-section-elem">
          <h3 class="transport-title"> En train</h3>
          <p class="transport-text"> 
            Rendez-vous à la gare la plus proche de votre emplacement. <br>
            Prenez un train en direction de Maillat. <br>
            Une fois arrivé à Maillat, descendez du bus et consultez votre GPS pour vous rendre à l'hôtel Relax de Maillat. <br>
            Suivez les indications jusqu'à atteindre l'hôtel Relax.
          </p>
        </div>
      </div>
    </div> 

    <div class="toast-container"></div>
    <?php require_once("./src/components/Footer/Footer.php"); ?>

  </body>

  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>
  <script src="./src/scripts/main.js"></script>
</html>
