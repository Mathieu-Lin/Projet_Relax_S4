<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
      <link rel="stylesheet" type="text/css" href="./src/components/Navbar/Navbar-accueil.css">
      <link rel="stylesheet" type="text/css" href="./src/components/Footer/Footer.css">
      <link rel="stylesheet" type="text/css" href="./src/components/LoginModal/LoginModal.css">
      <link rel="stylesheet" type="text/css" href="./src/components/Footer/Footer.css">
      <link rel="stylesheet" type="text/css" href="./src/styles/Accueil.css">
      <title>Relax - Accueil</title>
  </head>

  <body>
    <?php require_once("./src/components/Navbar/Navbar.php"); ?>

    <div class="relax_fond">
      <span class="name">RELAX</span>
      <span class="stars">★ ★ ★ ★</span>
    </div>
    
    <div class="progress_bar"></div>

    <div class="slider">
    <img id="img-1" src="https://www.hotel-mulhouse.com/sites/hotel-mulhouse.com/files/news/image/chambre-d-hotel.jpg" alt="Image 1" style="opacity: 1;"/>
    <img id="img-2" src="https://www.hotelpasdecalais.com/chambres/luxe-double--grand-lit/3w8a2277-hotel-du-pas-de-calais-photo-ch-bielsa-01-bd.jpg" alt="Image 2" style="opacity: 0;"/>
    <img id="img-3" src="https://www.alibabuy.com/photos/library/1500/11556.jpg" alt="Image 3" style="opacity: 0;"/>
    <img id="img-4" src="https://www.ahstatic.com/photos/a575_roa2c_00_p_1024x768.jpg" alt="Image 4" style="opacity: 0;"/>
    
  </div>

  <div class="navigation-button">
    <span class="dot active" onclick="changeSlide(0)"></span>
    <span class="dot" onclick="changeSlide(1)"></span>
    <span class="dot" onclick="changeSlide(2)"></span>
    <span class="dot" onclick="changeSlide(3)"></span>
  </div>

  <div class="corps">
    <h1 class="titre">Hôtel Relax : Une Oasis de Tranquillité au Cœur de la Ville</h1>
    <p class="paraInfo">
      Bienvenue à notre hôtel, un véritable havre de paix au cœur de la ville. Doté d'une atmosphère chaleureuse et conviviale, notre établissement offre une expérience unique pour les voyageurs en quête de confort et de tranquillité.
      Avec ses quelques chambres, notre hôtel favorise une ambiance intime et personnalisée.
    </p>

    <p class="paraInfo">
      Chaque chambre a été soigneusement conçue pour offrir un espace de repos confortable et élégant, avec des équipements modernes et une décoration raffinée.
    </p>

    <p class="paraInfo">
      Notre personnel attentionné est toujours disponible pour répondre à vos besoins et vous assurer un séjour agréable. Que vous soyez ici pour affaires ou pour le plaisir, nous nous efforçons de rendre votre expérience inoubliable en mettant l'accent sur le service de qualité.
    </p>
    
    <div class="photoBlock">
      <div class="slider_mini">
        <img id="img-1" src="https://www.hotel-mulhouse.com/sites/hotel-mulhouse.com/files/news/image/chambre-d-hotel.jpg" alt="Image 1" style="opacity: 1;"/>
        <img id="img-2" src="https://www.hotelpasdecalais.com/chambres/luxe-double--grand-lit/3w8a2277-hotel-du-pas-de-calais-photo-ch-bielsa-01-bd.jpg" alt="Image 2" style="opacity: 0;"/>
        <img id="img-3" src="https://www.alibabuy.com/photos/library/1500/11556.jpg" alt="Image 3" style="opacity: 0;"/>
        <img id="img-4" src="https://www.ahstatic.com/photos/a575_roa2c_00_p_1024x768.jpg" alt="Image 4" style="opacity: 0;"/>
        
      </div>
      <div class="navigation-button_mini">
        <span class="dot active" onclick="changeSlideMini(0)"></span>
        <span class="dot" onclick="changeSlideMini(1)"></span>
        <span class="dot" onclick="changeSlideMini(2)"></span>
        <span class="dot" onclick="changeSlideMini(3)"></span>
      </div>
    </div>
    
    <p class="paraInfo">
      Profitez également de notre espace commun où vous pourrez vous détendre, lire un livre ou socialiser avec d'autres voyageurs. Un petit-déjeuner continental est servi tous les matins, vous permettant de commencer votre journée du bon pied.
    </p>

    <p class="paraInfo">
      Situé à proximité des attractions principales de la ville, des restaurants et des boutiques, notre hôtel est idéalement placé pour découvrir toutes les merveilles que cette destination peut vous offrir.
    </p>

    <p class="paraInfo">
      Réservez dès maintenant et laissez notre hôtel accueillant être le point de départ idéal pour votre prochain séjour.
    </p>
  </div>

  <div class="toast-container"></div>
  <?php require_once("./src/components/Footer/Footer.php"); ?>

  </body>

  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>
  <script src="./src/scripts/main.js"></script>
  <script src="./src/scripts/Acceuil.js"></script>
  <?php 
    if(isset($_SESSION["message"])){
      echo $_SESSION["message"];
      unset($_SESSION["message"]);
    }
  ?>
</html>
