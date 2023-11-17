<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./src/styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
    <link rel="stylesheet" type="text/css" href="./src/components/d_Navbar/d_Navbar.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_Periods.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_Dashboard.css">
    <title>Relax | Management</title>
</head>

    <body>
        <?php require_once("./src/components/d_Navbar/d_Navbar.php"); ?>

        <div class="main-container-period">
            <div class="employee_management">
                <div class="employee-card"></div>
                <button class="btn-period" id="open-modal" onclick="Display_container('background')">Ajouter un créneau</button>
            </div>

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

        
        <div class="background" id="background">
            <div class="period-modal" id="period-modal">
                <div class="period-modal-navbar" id="period-modal-navbar">
                    <p class="modal-navbar-button" id="period">Créneau</p>
                    <p class="modal-navbar-button" onclick="Invert_containers('period-modal', 'meeting-modal')">Réunion</p>
                </div>

                <div class="period-modal-content" id="period-modal-content">
                    <div class="period-form" id="period-form">
                        <div class="form-elem" id="form-elem">
                            <p>Date de début</p>
                            <input class="form-input" type="datetime-local" name="date_start_period">
                        </div>

                        <div class="form-elem" id="form-elem">
                            <p>Date de fin</p>
                            <input class="form-input" type="datetime-local" name="date_end_period">
                        </div>

                        <script>
                            let date_start = document.querySelector('input[name=date_start_period]')
                            let date_end = document.querySelector('input[name=date_end_period]')
                        </script>
                    </div>
                </div>

                <div class="period-modal-buttonbar" id="period-modal-buttonbar">
                    <button class="btn-period" id="cancel" onclick="Hide_container('background')"> Annuler</button>
                    <button class="btn-period" id="add" onclick="Submit_period_form(date_start.value, date_end.value, '.employee-checkbox', 'ajouter')"> Ajouter</button>
                </div>
            </div>

            <div class="period-modal" id="meeting-modal">
                <div class="period-modal-navbar">
                    <p class="modal-navbar-button" onclick="Invert_containers('period-modal', 'meeting-modal')">Créneau</p>
                    <p class="modal-navbar-button" id="meeting">Réunion</p>
                </div>

                <div class="period-modal-content" id="meeting-modal-content">
                    <div class="period-form" id="meeting-form">
                        <div class="form-elem" id="meeting-form-elem">
                            <p>Date</p>
                            <input class="form-input" type="date" id="input-date">
                        </div>

                        <div class="form-elem" id="meeting-form-elem">
                            <p>Durée en minutes</p>
                            <input class="form-input" type="number" id="input-duration" value="0" min="0" max="180" step="5" onkeypress="return false;">
                        </div>
                    </div>

                    <div class="findings">
                        <span class="findings-warning">Il n'y a pas de créneau(x) disponible.</span>
                    </div>
                </div>

                <div class="period-modal-buttonbar" id="meeting-modal-buttonbar">
                    <button class="btn-period" id="cancel" onclick="Hide_container('background')"> Annuler</button>
                    <button class="find">Trouver</button>
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
    <script src="./src/scripts/d_Dashboard.js"></script>
    <script src="./src/scripts/d_Periods.js"></script>

</html>