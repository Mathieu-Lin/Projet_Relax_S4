<?php

    Route::set('dashboard', function(){
        require_once("./src/pages/d_Dashboard.php");
    });

    Route::set('management', function(){
        require_once("./src/pages/d_Management.php");
    });

    Route::set('periods', function(){
        require_once("./src/pages/d_Periods.php");
    });

    Route::set('ticket', function(){
        require_once("./src/pages/d_Ticket.php");
    });

    Route::set('reservation', function(){
        require_once("./src/pages/d_Reservation.php");
    });

    Route::set('conge', function(){
        require_once("./src/pages/d_Conge.php");
    });

    Route::set('accueil', function(){
        require_once("./src/pages/Accueil.php");
    });

    Route::set('nos-chambres', function(){
        require_once("./src/pages/Rooms.php");
    });

    Route::set('profile', function(){
        require_once("./src/pages/Profile.php");
    });

    Route::set('reservations', function(){
        require_once("./src/pages/Reservations.php");
    });
    
    Route::set('contact', function(){
        require_once("./src/pages/Contact.php");
    });
    
    Route::set('fiche', function(){
        require_once("./src/pages/d_Fiche.php");
    });

?>