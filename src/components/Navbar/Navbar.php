<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');


//Si connexion sauvegardée dans les cookies se connecte automatiquement.
include("./src/requests/CookieConn.php");
?>


<div class="nav">
  <div class="logo">
    <span class="name">Relax</span>
    <span class="stars">★ ★ ★ ★</span>
  </div>

  <div class="links">
    <a href="./index.php?url=accueil" class="nav-link ">Accueil</a>
    <a href="./index.php?url=nos-chambres" class="nav-link ">Nos chambres</a>
    <a href="./index.php?url=contact" class="nav-link ">Accès - Contact</a>
  </div>

  <?php require_once("./src/components/LoginModal/LoginModal.php"); ?>

  <div class="burger">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
  </div>
</div>

<script>
    let burger = document.querySelector(".burger");
    let links = document.querySelector(".links");

    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        links.classList.toggle("active");
    })
</script>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
