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
      <link rel="stylesheet" type="text/css" href="./src/styles/Profile.css">
      <title>Relax - Nos chambres</title>
  </head>

  <body>
    <?php require_once("./src/components/Navbar/Navbar.php"); ?>
    <?php require_once("./src/components/LoginModal/LoginModal.php"); ?>
    
    <!-- Conteneur principal -->
    <div class="main-container">
      <div class="user-info-container">

        <div class="user-info-card" id="user-info-card">
            <div class="card-title"> Informations personnelles </div>

            <div class="card-content">
              <div class="card-content-elem">
                <p class="card-content-elem-label">Nom</p>
                <input class="card-content-elem-input" type="text" name="lastname">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Prénom</p>
                <input class="card-content-elem-input" type="text" name="firstname">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Date de naissance</p>
                <input class="card-content-elem-input" type="date" name="birthdate">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Téléphone</p>
                <input class="card-content-elem-input" type="text" name="phone-number">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Mail</p>
                <input class="card-content-elem-input" type="text" name="mail">
              </div>

              <button class="btn-change-info" id="btn-info"> Appliquer les modifications</button>
            </div>
          </div>

          <div class="user-info-card" id="adress-card">
            <div class="card-title"> Changer d'adresse </div>

            <div class="card-content">
              <div class="card-content-elem">
                <p class="card-content-elem-label">Numéro</p>
                <input class="card-content-elem-input" type="number" min="0" name="number">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Rue</p>
                <input class="card-content-elem-input" type="text" name="street">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Code postal</p>
                <input class="card-content-elem-input" type="number" name="zip-code">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Ville</p>
                <input class="card-content-elem-input" type="text" name="city">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Pays</p>
                <input class="card-content-elem-input" type="text" name="country">
              </div>

              <button class="btn-change-info" id="btn-address"> Appliquer les modifications</button>
            </div>
          </div>

      </div>

      <div class="password-container">
        <div class="user-info-card" id="password-card">
          <div class="card-title"> Changer de mot de passe </div>
          <div class="card-content">
            <div class="card-form">
              <div class="card-content-elem">
                <p class="card-content-elem-label">Mot de passe actuel</p>
                <input class="card-content-elem-input" type="password" name="current-pwd">
              </div>

              <div class="card-content-elem">
                <p class="card-content-elem-label">Nouveau mot de passe</p>
                <input class="card-content-elem-input" type="password" name="new-pwd">
              </div>
            </div>

            <button class="btn-change-info" id="btn-password"> Appliquer les modifications</button>
          </div>
        </div>
      </div>
    </div> 

    <div class="toast-container"></div>
  </body>


  <?php require_once("./src/components/Footer/Footer.php"); ?>


  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>
  <script src="./src/scripts/main.js"></script>
  <script src="./src/scripts/Profile.js"></script>

</html>
