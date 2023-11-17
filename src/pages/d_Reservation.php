<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./src/styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
    <link rel="stylesheet" type="text/css" href="./src/components/d_Navbar/d_Navbar.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_Reservation.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_ReservationPlanning.css">
    <title>Relax | Réservation</title>
</head>

    <body>
        <?php require_once("./src/components/d_Navbar/d_Navbar.php") ?>
        <div class="reservation-container">
                <div class="room-container container">
                </div>
                <div class="resa-container container">
                    <div class="room-nav">
                        <li>Information</li>
                        <li>Réservation</li>
                        <li>Demandes</li>
                    </div>
                    <div class="resa-form resa no-active">
                        <form method="post">
                            <h5 class="title">Information réservation</h5>
                            <div class="row">
                                <label for="debut">Du :</label>
                                <input id="debut" type="datetime-local" name="debut" required>
                                &ensp; | &ensp;
                                <label for="end">Au :</label>
                                <input id="end" type="datetime-local" name="end" required>
                            </div>
                            <div class="row">
                                <label for="nb_adult">Nombre d'adulte :</label>
                                <input id="nb_adult" type="number" name="nb_adult" required>
                            </div>
                            <div class="row">
                                <label for="nb_child">Nombre d'enfant :</label>
                                <input id="nb_child" type="number" name="nb_child" required>
                            </div>
                            <br>
                            <h5 class="title">Information Client</h5>
                            <div class="row">
                                <select name="gender">
                                    <option value="Male">Mr</option>
                                    <option value="Female">Mme</option>
                                    <option value="Unknown">Ukn</option>
                                </select>
                                &ensp;
                                <label for="name">Nom :</label>
                                <input id="name" type="text" name="name" placeholder="Nom ..." required>
                                &ensp; &ensp;
                                <label for="prenom">Prénom :</label>
                                <input id="prenom" type="text" name="prenom" placeholder="Prénom ..." required>
                            </div>
                            <div class="row">
                                <label for="phone">Numéro de téléphone</label>
                                <input id="phone" type="phone" name="phone" required>
                                <label for="mail">Email</label>
                                <input id="mail" type="mail" name="mail" required>
                            </div>
                            <p class="add-reservation button" onclick="reservationRoom(<?php if(isset($_GET['room'])){echo $_GET['room'];}else{echo '1';} ?>)">Reserver la chambre</p>
                        </form>
                    </div>

                    <div class="resa-demands resa no-active">
                    </div>

                    <div class="resa-info resa active" data-id="<?php if(isset($_GET['room'])){echo $_GET['room'];}else{echo '1';} ?>">
                        <h5 class="title">Information Chambre</h5>
                        <p class="info-room" ></p>

                    <h5 class="title">Planning Chambre</h5>
                    <div class="timetable-container">
                        <div class="timetable-head">
                            <div class="tt-col-head"></div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                            <div class="tt-col-head week-day">
                                <span class="day"></span>
                                <span class="date"></span>
                            </div>
                        </div>
                        <div class="timetable-body">
                            <div class="tt-col hour-label-container"></div>
                            <div class="tt-col day-container"></div>
                            <div class="tt-col day-container"></div>
                            <div class="tt-col day-container"></div>
                            <div class="tt-col day-container"></div>
                            <div class="tt-col day-container"></div>
                            <div class="tt-col day-container"></div>
                            <div class="tt-col day-container"></div>
                        </div> 
                        <div class="timetable-footer">
                            <button class="l_arr">&larr;</button>
                            <button class="t_btn">Aujourd'hui</button>
                            <button class="r_arr">&rarr;</button>
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
    <script src="./src/scripts/d_Reservation.js"></script>
    <script src="./src/scripts/d_ReservationPlanning.js"></script>
</html>