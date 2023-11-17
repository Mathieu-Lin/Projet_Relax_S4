<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./src/styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
    <link rel="stylesheet" type="text/css" href="./src/components/d_Navbar/d_Navbar.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_Ticket.css">
    <title>Relax | Ticket</title>
</head>

<body>
    <!-- navbar -->
    <?php require_once("./src/components/d_Navbar/d_Navbar.php") ?>
    <!-- block droit de la page -->
        <div class="corps">
            <div class="ticket-container container">
                <!-- navigation entre les différents types de ticket -->
                <div class="ticket-nav">
                    <li onclick="affichage('Tous')">Tous</li>
                    <li onclick="affichage('Completed')">Résolu</li>
                    <li onclick="affichage('In Progress')">En cours</li>
                    <li onclick="affichage('Pending')">Attente</li>
                    <li onclick="affichage('Canceled')">Annulé</li>
                    <li>Ajouter</li>
                </div>
                <div class="ticket-list">
                    <!-- ticket-block -->
                </div>
                <div class="form-container no-active">
                    <!-- formulaire d'ajout de ticket -->
                    <div class="add-form ticket-form no-active">
                        <form action="" method="post">
                            <h5 class="title">Ajouter un ticket</h5>
                            <div class="row">
                                <label for="desc">Description </label>
                                <textarea name="desc_a" id="desc" cols="30" rows="8" placeholder="Rentrer une description ..."></textarea>
                            </div>
                            <div class="row">
                                <label for="room_a">Lieu </label>
                                <select name="room_a" id="room_a">
                                    <!-- option -->
                                </select>
                            </div>
                            <div class="row">
                                <p class="add-ticket button" onclick="add_ticket_function()">Créer le ticket</p>
                            </div>
                        </form>
                    </div>
                    <!-- formulaire de modification de ticket -->
                    <div class="update-form ticket-form no-active">
                        <form action="" method="post">
                            <h5 class="title">Ajouter intervention</h5>
                            <div class="row">
                                <p class="desc_i"></p>
                            </div>
                            <div class="row">
                                <p class="room_i"></p>
                            </div>
                            <div class="row">
                                <label for="staus">Status </label>
                                <select class="status_i" name="status" id="staus">
                                    <!-- option status -->
                                </select>
                            </div>
                            <div class="row">
                                <label for="employee">Employé </label>
                                <select name="employee" id="employee_i">
                                    <!-- option employee -->
                                </select>
                            </div>
                            <div class="row">
                                <label for="days">Intervient le </label>
                                <input type="date" name="days" id="days">
                            </div>
                            <div class="row">
                                <label for="debut">De </label>
                                <input type="time" name="debut" id="debut">
                            </div>
                            <div class="row">
                                <label for="end">à</label>
                                <input type="time" name="end" id="end">
                            </div>
                            <div class="row">
                                <p id="update" class="update-ticket button" onclick="">Modifier le ticket</p>
                            </div>
                        </form>
                    </div>
                </div>
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
    <script src="./src/scripts/d_Ticket.js"></script>
</html>