<div class="nav-container">

    <nav>
        <div class="logo">
            <span class="name">Relax</span>
            <span class="stars">★ ★ ★ ★</span>
        </div>

        <div class="links">
            <a href="./index.php?url=dashboard" class="nav-link dashboard"><i class="fa-solid fa-table-columns"></i></i> Dashboard</a>
            <a href="./index.php?url=management" class="nav-link management"><i class="fa-solid fa-list-check"></i> Management</a>
            <a href="./index.php?url=periods" class="nav-link creneaux"><i class="fa-regular fa-calendar-plus"></i> Créneaux</a>
            <a href="./index.php?url=reservation" class="nav-link reservation"><i class="fa-solid fa-bed"></i> Reservation</a>
            <a href="./index.php?url=ticket" class="nav-link ticket"><i class="fa-solid fa-ticket"></i> Ticket</a>
            <a href="./index.php?url=conge" class="nav-link conge"><i class="fa-solid fa-mug-hot"></i> Conge</a>
            <a href="./index.php?url=accueil" class="nav-link accueil"><i class="fa-solid fa-house"></i>Accueil</a>
        </div>   

        <div class="account">
            
            <button href="" class="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <?php echo $_SESSION['user']['firstname']; ?>
            </button>
        </div>

        <div class="burger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>
</div>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
    (async() => {
        await axios.get("./src/requests/is_authorized.php")
        .then(function (response) {
            if(response.data == '1'){
                console.log("Welcome admin.")
            }
            else{
                let route = document.querySelector(".creneaux");
                route.remove()
            }
        })
    })()

    let logoutBtn = document.querySelector('.logout');
    logoutBtn.addEventListener('click', () => {
        axios.get("./src/requests/Logout.php").then(function (response) {
            window.location.href = "./index.php?url=accueil";
        })
    })

    let burger = document.querySelector(".burger");
    let links = document.querySelector(".links");
    let account = document.querySelector(".account");

    burger.addEventListener("click", () => {
        burger.classList.toggle("activated");
        links.classList.toggle("activated");
        account.classList.toggle("activated");
    })

</script>