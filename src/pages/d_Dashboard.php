<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./src/styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
    <link rel="stylesheet" type="text/css" href="./src/components/d_Navbar/d_Navbar.css">
    <link rel="stylesheet" type="text/css" href="./src/styles/d_Dashboard.css">
    <title>Relax | Dashboard</title>
</head>
<body>
    <?php
        require_once("./src/components/d_Navbar/d_Navbar.php")
    ?>

    <div class="main-container">    

        <div class="employee-card"></div>

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

    <div class="toast-container"></div> 
</body>


<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>
<script type="text/javascript">
    const user_id = <?php echo $_SESSION["user"]["id"]; ?>;
</script>
<script src="./src/scripts/main.js"></script>
<script src="./src/scripts/d_Dashboard.js"></script>
</html>