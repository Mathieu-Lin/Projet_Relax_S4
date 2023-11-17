<?php
//////////////////////////////////////////////////////////////////////////
//																		//
// 	    			    Fonction deconnexion - Prive		    	    //
//																		//
//////////////////////////////////////////////////////////////////////////

// fonction qui permet de supprimer la session active
session_start(); 
session_unset();
session_destroy();

//////////////////////////////////////////////////////////////////////////
//																		//
// 	    		    Fonction supprime notif - Prive		    		    //
//																		//
//////////////////////////////////////////////////////////////////////////

setcookie('type','',time()-1000,'/','localhost'); // on supprime la variable user 
setcookie('email','',time()-1000,'/','localhost'); // on supprime la variable user 
setcookie('password','',time()-1000,'/','localhost'); // on supprime la variable password 

?>