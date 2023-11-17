let input_date_start = document.querySelector('input[name=date_start]');
let input_date_end = document.querySelector('input[name=date_end]');
let input_nb_adults = document.querySelector('input[name=nb_adults]');
let input_nb_children = document.querySelector('input[name=nb_children]');

let current_date = new Date().toJSON().slice(0, 10);

//Vide un élément
function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

//Affiche les chambres compatibles
function displayRooms(date_start, date_end, nb_adults, nb_childen)
{
  let capacity = parseInt(nb_adults) + parseInt(nb_childen);

  if(date_start != "")
  {
    date_start = date_start + " 17:00:00";
  }
  
  if(date_end != "")
  {
    date_end = date_end + " 10:00:00";
  }

  let rooms_container = document.getElementById("rooms-container");
  clearBox("rooms-container");

  axios.get("./src/requests/Rooms.php", { params : {function : "getAvailableRooms", time_start : date_start, time_end : date_end, capacity : capacity} }).then(
      response => 
      {     
        for(let room of response.data)
        {
          let room_card = create("div", rooms_container, text=null, "room-card");

          let img_section = create("div", room_card, text=null, "room-card-img"); 
          let room_img = create("img", img_section, text=null, "room-img"); 
          room_img.setAttribute('src', './assets/'+room.floor + room.number+'.jpg');

          let desc_section = create("div", room_card, text=null, "room-card-desc"); 

          let desc_infos = create("div", desc_section, text=null, "desc-infos"); 
          create("h3", desc_infos, "Chambre N°" + room.floor + room.number);       
          create("p", desc_infos, "Capacité max : " + room.capacity + " personnes"); 

          let desc_reservation = create("div", desc_section, text=null, "desc-reservation"); 
          create("p", desc_reservation, room.price + "€/Nuit", "reservation-price"); 
          let reservation_button = create("p", desc_reservation, "Réserver", "reservation-button");     
          reservation_button.onclick = function() { addReservation(room.id, input_date_start.value, input_date_end.value, input_nb_adults.value, input_nb_children.value);}          
        }
      }
  );
}

//Ajoute la réservation
function addReservation(id_room, date_start, date_end, nb_adults, nb_childen, id_account)
{
  if(date_start == "" || date_end == "")
  {
    createToast(0,"Erreur","Veuillez renseigner toutes les informations"); //A REMPLACER PAR UN POP-UP
  }

  else
  {
    if((date_start >= date_end))
    {
      createToast(0,"Erreur","Les dates renseignées sont incorrectes"); //A REMPLACER PAR UN POP-UP
    }

    else
    {
      if(date_start > current_date)
      {
        date_start = date_start + " 17:00:00";
        date_end = date_end + " 10:00:00";

        axios.get("./src/requests/Rooms.php", { params : {function : "addReservation", time_start : date_start, time_end : date_end, nbr_adult : nb_adults, nbr_child : nb_childen, id_room : id_room, id_account : id_account}}).then(
          response => 
          {     
            if(response.data == "")
            {
              createToast(1,"Confirmation","La réservation a été prise en compte"); //A REMPLACER PAR UN POP-UP
              displayRooms(input_date_start.value, input_date_end.value, input_nb_adults.value, input_nb_children.value);
            }

            else
            {
              createToast(0,"Erreur","La réservation n'a pas pu aboutir"); //A REMPLACER PAR UN POP-UP
            }
          }
        );
      }

      else
      {
        createToast(0,"Erreur","Vous ne pouvez pas réserver pour le jour même ou avant"); //A REMPLACER PAR UN POP-UP
      }
      
    }
  }
}


//crée les div cards des chambres au chargement de la page
displayRooms(input_date_start.value, input_date_end.value, input_nb_adults.value, input_nb_children.value);  