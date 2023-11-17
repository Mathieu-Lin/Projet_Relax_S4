<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./src/styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
    <link rel="stylesheet" type="text/css" href="./src/components/d_Navbar/d_Navbar.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_Conge.css">
    <title>Relax | Conge</title>
</head>

<body>
    <?php
    require_once("./src/components/d_Navbar/d_Navbar.php")
    ?>

    <div class="conge-main-container">
        <div class="conge-container">
            <div class="conge-title-container"> Demande de congé </div>
            <div class="conge-navbar-container">
                <ul>
                    <li>
                        <a>Sélection</a>
                        <ul>
                            <li>
                                <a class="conge-navbar-container-all">Tous</a>
                            </li>
                            <li>
                                <a class="conge-navbar-container-pending">En attente</a>
                            </li>
                            <li>
                                <a class="conge-navbar-container-approved">Validée</a>
                            </li>
                            <li>
                                <a class="conge-navbar-container-denied">Refusée</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="conge-list-container"></div>
            <button class="conge-add"> Ajouter un congé</button>
        </div>
        <div class="conge-card">
            <div class="conge-title-card"> Details sur la demande de congé </div>
            <div class="conge-identity-card"></div>
            <div class="conge-information-card"></div>
        </div>
    </div>

    <div class="toast-container"></div>
</body>


<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>
<script type="text/javascript">
    const user_id = <?php echo $_SESSION["user"]["id"]; ?>;
</script>
<script src="./src/scripts/main.js"></script>
<script src="./src/scripts/d_Conge.js"></script>

</html>