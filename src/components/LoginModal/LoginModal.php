<?php
  // verifie si connecter et quel type de connection (externe => button profile / user => button profile et employee (site employee))
  if (!isset($_SESSION['user']) && !isset($_SESSION['externe'])){
    // echo "non connected";
    ?>
      <div class="conn">   
        <a href="#" class="nav-link connection-btn"> Connexion </a>
      </div>
    <?php
  }else if(!isset($_SESSION['user']) && isset($_SESSION['externe'])){ 
    // echo "connected user";
    ?>
      <div class="profil">   
        <div class="dropdown" id="dropdown">
          <button id="button" onclick="toggleDropdown()">
          <span><i class="fa-solid fa-user"></i></span>
          <?php echo $_SESSION['externe']['lastname'].'&ensp;'.$_SESSION['externe']['firstname']; ?>
          <span id="chevron" class="chevron"><i class="fa-solid fa-chevron-up"></i></span>
          </button>
          <div class="menu" id="menu">
            <button class="btn-profile">
              <span><i class="fa-solid fa-address-card"></i></span>
              Modifier Profil
            </button>
            <button class="btn-reservation">
              <span><i class="fa-solid fa-bed"></i></span>
              Réservations
            </button>
            <button class="btn-deconnexion">
              <span><i class="fa-solid fa-right-from-bracket"></i></span>
              Deconnexion
            </button>
          </div>
        </div>
      </div>
    <?php
  }else {
    // echo "connected externe user";
    ?>
      <div class="profil">   
        <div class="dropdown" id="dropdown">
          <button id="button" onclick="toggleDropdown()">
          <span><i class="fa-solid fa-user"></i></span>
          <?php echo $_SESSION['user']['lastname'].'&ensp;'.$_SESSION['user']['firstname']; ?>
          <span id="chevron" class="chevron"><i class="fa-solid fa-chevron-up"></i></span>
          </button>
          <div class="menu" id="menu">
            <button class="btn-employee">
              <span><i class="fa-solid fa-briefcase"></i></span>
              Employé
            </button>
            <button class="btn-deconnexion">
              <span><i class="fa-solid fa-right-from-bracket"></i></span>
              Deconnexion
            </button>
          </div>
        </div>
      </div>
    <?php
  }
  ?>


<div class="connexion-container no_conn" >
      <h1>Connexion</h1>
      <form action="" method="post">
        <input type="email" name="mail_c" id="mail" placeholder="Votre email">
        <input type="password" name="mdp_c" id="mdp" placeholder="Votre mot de passe">
        <div class="supl">
          <div class="resterCon">
            <input type="checkbox" name="remember" id="tjrConn">
            <label for="tjrConn">Se souvenir de moi </label>
          </div>
        </div>
        <p class="button" onclick="user_connect()">Se connecter</p>
      </form>
      <p class="no-account" >Pas encore de compte ?</p>
    </div>

    <div class="inscription-container no_conn" >
      <h1>Inscription</h1>
      <form action="" method="post">
        <div class="partie_1 partie" style="opacity: 1; display: flex;">
          <h4>Information personnel</h4>
          <div class="row">
            <select name="gender">
                <option value="Male">Mr</option>
                <option value="Female">Mme</option>
                <option value="Unknown">Ukn</option>
            </select>
            <input type="text" name="lastname_r" id="lastname" placeholder="Votre nom" required>
          </div>
          <input type="text" name="firstname_r" id="firstname" placeholder="Votre prenom" required>
          <input type="date" name="birthday_r" id="birthday" required>
        </div>
        <div class="partie_2 partie" style="opacity: 0; display: none;">
          <h4>Information contact</h4>
          <input type="tel" name="phone_r" id="phone" placeholder="0712345678" required>
          <input type="email" name="email_r" id="email" placeholder="exemple@mail.com" required>
          <input type="password" name="mdp_r" id="mdp" placeholder="Votre mot de passe" required>
        </div>
        <div class="partie_3 partie" style="opacity: 0; display: none;">
          <h4>Information adresse</h4>
          <div class="row">
            <input type="number" name="number_r" id="number" placeholder="Numéro" required>
            <input type="text" name="street_r" id="street" placeholder="Adresse" required>
          </div>
          <div class="row">
            <input type="number" name="cp_r" id="cp" placeholder="Code postal" required>
            <input type="text" name="city_r" id="city" placeholder="Votre ville" required>
          </div>
          <input type="text" name="country_r" id="country" placeholder="Votre pays" required>
        </div>
        <div class="navigation-ins">
          <span class="dotIns active" onclick="changeIns(0)"></span>
          <span class="dotIns" onclick="changeIns(1)"></span>
          <span class="dotIns" onclick="changeIns(2)"></span>
        </div>
        <p class="button" onclick="user_registration()">S'inscrire</p>
      </form>
      <p class="have-account">J'ai déjà un compte ?</p>
    </div>


<script>
     let btn_conn = document.querySelector('.connection-btn');
  if(btn_conn != null) {
    btn_conn.addEventListener('click', (e)=>{
      document.querySelector('.connexion-container').classList.toggle('active_conn');
      document.querySelector('.connexion-container').classList.toggle('no_conn');
    })

    let btn_ins = document.querySelector(".no-account");
    btn_ins.addEventListener('click', (e)=>{ 
      document.querySelector('.inscription-container').classList.toggle('active_conn');
      document.querySelector('.inscription-container').classList.toggle('no_conn');
      document.querySelector('.connexion-container').classList.toggle('active_conn');
      document.querySelector('.connexion-container').classList.toggle('no_conn');
    })

    let btn_conn2 = document.querySelector(".have-account");
    btn_conn2.addEventListener('click', (e)=>{ 
      document.querySelector('.inscription-container').classList.toggle('active_conn');
      document.querySelector('.inscription-container').classList.toggle('no_conn');
      document.querySelector('.connexion-container').classList.toggle('active_conn');
      document.querySelector('.connexion-container').classList.toggle('no_conn');
    })
  }

  let button = document.querySelector('#button');
  if(button != null){
    let buttonRect = button.getBoundingClientRect();
    let chevron = document.querySelector('#chevron');
    let chevronRect = chevron.getBoundingClientRect();
    let menuRight = buttonRect.right - chevronRect.right;
    let menuTop = buttonRect.top - chevronRect.top;

    function toggleDropdown(){
      let dropdown = document.querySelector('#dropdown');
      let menu = document.querySelector('#menu');
      if(dropdown.classList.contains('open')){
        menu.style.top = menuTop+'px';
        menu.style.right = menuRight+'px';
      }else{
        menu.style.top = (button.clientHeight+14)+'px';
        menu.style.right = '0';
      }
      dropdown.classList.toggle('open');
    }

    let logoutBtn = document.querySelector('.btn-deconnexion');
    let employeeBtn = document.querySelector('.btn-employee');
    let profileBtn = document.querySelector('.btn-profile');
    let reservationBtn = document.querySelector('.btn-reservation');

    logoutBtn.addEventListener('click', () => {
        axios.get("./src/requests/Logout.php").then(function (response) {
            window.location.href = "./index.php?url=accueil";
        })
    })

    if(profileBtn != null) {
      profileBtn.addEventListener('click', () => {
       window.location.href = "./index.php?url=profile";
      })
    }


    if(employeeBtn != null) {
      employeeBtn.addEventListener('click', () => {
        window.location.href = "./index.php?url=dashboard";
      })
    }

    if(reservationBtn != null) {
      reservationBtn.addEventListener('click', () => {
        window.location.href = "./index.php?url=reservations";
      })
    }
  }



    /********************************************************************************************** */
    async function user_connect(){
        await axios.post('./src/requests/Login.php', { 
            email : document.querySelector('input[name=mail_c]').value,
            password : document.querySelector('input[name=mdp_c]').value,
            remember : document.querySelector('input[name=remember]').checked      
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data['type'] == false){
                if(response.data['commentaire'] != null){
                    createToast(0, "Erreur", response.data['commentaire'] );
                }
            }
            else{
              location.reload();
            }
        })
        .catch(function (error) {
            console.log(error);
    });
  }

/************************************************************************************************* */

  async function user_registration(){
        await axios.post('./src/requests/register_user.php', {     
            gender : document.querySelector('select[name=gender]').value,  
            lastname : document.querySelector('input[name=lastname_r]').value,
            firstname : document.querySelector('input[name=firstname_r]').value,
            birthday : document.querySelector('input[name=birthday_r]').value, 
            phone : document.querySelector('input[name=phone_r]').value,
            email : document.querySelector('input[name=email_r]').value,
            mdp : document.querySelector('input[name=mdp_r]').value,  
            number : document.querySelector('input[name=number_r]').value,
            street : document.querySelector('input[name=street_r]').value,
            cp : document.querySelector('input[name=cp_r]').value, 
            city : document.querySelector('input[name=city_r]').value,
            country : document.querySelector('input[name=country_r]').value     
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data['type'] == false){
                if(response.data['commentaire'] != null){
                  createToast(0, "Erreur", response.data['commentaire'] );
                }
            }
            else{
              createToast(1, "Incription", response.data['commentaire'] );
            }
        })
        .catch(function (error) {
            console.log(error);
    });
  }

  /************************************************************************************************* */

  var currentIns = 0;
  var ins = document.querySelectorAll('.partie');
  let dotIns = document.querySelectorAll('.dotIns');
  function changeIns(n) {
    for (var i = 0; i < ins.length; i++) {
      ins[i].style.opacity = 0;
      ins[currentIns].style.display = 'none';
      dotIns[i].className = dotIns[i].className.replace(' active', '');
    }

    currentIns = (currentIns + 1) % ins.length;

    if (n != undefined) {
      currentIns = n;
    }

    ins[currentIns].style.opacity = 1;
    ins[currentIns].style.display = 'flex';
    dotIns[currentIns].className += ' active';
  }

</script>