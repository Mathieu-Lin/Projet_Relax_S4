<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="./src/styles/reset.css">
        <link rel="stylesheet" type="text/css" href="./src/styles/global.css">
        <link rel="stylesheet" type="text/css" href="./src/components/d_Navbar/d_Navbar.css">
        <link rel="stylesheet" type="text/css" href="./src/styles/d_Management.css">
        <title>Relax | Management</title>
    </head>

    <body>
        <?php require_once("./src/components/d_Navbar/d_Navbar.php") ?>

        <div class="toast-container"></div>
    </body>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://kit.fontawesome.com/008612b1fd.js" crossorigin="anonymous"></script>
    <script type="text/javascript">
        const user_id = <?php echo $_SESSION["user"]["id"]; ?>;
    </script>
    <script src="./src/scripts/main.js"></script>
    <script src="./src/scripts/d_Management.js"></script>
</html>