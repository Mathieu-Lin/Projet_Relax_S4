let body = document.querySelector('body');
let background = create("div", body, text=null, "background", "background");

let current_date = new Date().toJSON().slice(0, 10);
let current_datetime = current_date + " 00:00:00";

let label_old_reservation = document.getElementById("label-old-reservation");
let label_approved_reservation = document.getElementById("label-approved-reservation");
let label_pending_reservation = document.getElementById("label-pending-reservation");
let label_denied_reservation = document.getElementById("label-denied-reservation");

//Vide un élément
function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

//Affiche les anciennes réservations (avant la date actuelle)
function displayOldReservations()
{
  let rooms_container = document.getElementById("rooms-container");
  clearBox("rooms-container");

  label_old_reservation.classList.add("active");
  label_approved_reservation.classList.remove("active");
  label_pending_reservation.classList.remove("active");
  label_denied_reservation.classList.remove("active");

  axios.get("./src/requests/Reservations.php", { params : {function : "displayOldReservations"} }).then(
      response => 
      {   
        for(let reservation of response.data)
        {
          let room_card = create("div", rooms_container, text=null, "room-card");

          let img_section = create("div", room_card, text=null, "room-card-img"); 
          let room_img = create("img", img_section, text=null, "room-img"); 
          room_img.setAttribute('src', './assets/'+reservation.floor + reservation.number+'.jpg');

          let desc_section = create("div", room_card, text=null, "room-card-desc"); 
          let room_card_title = create("div", desc_section, text=null, "room-card-title"); 
          
          let room_card_content = create("div", desc_section, text=null, "room-card-content"); 
          create("p", room_card_content, (reservation.time_start).slice(0, 10) + " au " + (reservation.time_end).slice(0, 10));
          create("p", room_card_content, reservation.nbr_adult + " adultes et " + reservation.nbr_child + " enfants");

          create("div", room_card_title, text=null, "status-dot", "dot-approved");
          create("p", room_card_title, "Chambre n°" + reservation.floor + reservation.number + " - " + reservation.price + "€");
        }
      }
  );
}

//Affiche les réservations à venir (date actuelle et supérieur)
function displayUpcomingReservations()
{
  let rooms_container = document.getElementById("rooms-container");
  clearBox("rooms-container");

  label_old_reservation.classList.remove("active");
  label_approved_reservation.classList.add("active");
  label_pending_reservation.classList.remove("active");
  label_denied_reservation.classList.remove("active");

  axios.get("./src/requests/Reservations.php", { params : {function : "displayUpcomingReservations"} }).then(
      response => 
      {     
        for(let reservation of response.data)
        {
          let room_card = create("div", rooms_container, text=null, "room-card");

          let img_section = create("div", room_card, text=null, "room-card-img"); 
          let room_img = create("img", img_section, text=null, "room-img"); 
          room_img.setAttribute('src', './assets/'+reservation.floor + reservation.number+'.jpg');

          let desc_section = create("div", room_card, text=null, "room-card-desc"); 
          let room_card_title = create("div", desc_section, text=null, "room-card-title"); 
          
          let room_card_content = create("div", desc_section, text=null, "room-card-content"); 
          create("p", room_card_content, (reservation.time_start).slice(0, 10) + " au " + (reservation.time_end).slice(0, 10));
          create("p", room_card_content, reservation.nbr_adult + " adultes et " + reservation.nbr_child + " enfants");

          if(reservation.status == "Approved")
          {
            create("div", room_card_title, text=null, "status-dot", "dot-approved");
            create("p", room_card_title, "Chambre n°" + reservation.floor + reservation.number + " - " + reservation.price + "€");
          }

          if(reservation.status == "Pending")
          {
            create("div", room_card_title, text=null, "status-dot", "dot-pending");
            create("p", room_card_title, "Chambre n°" + reservation.floor + reservation.number + " - " + reservation.price + "€");

            let room_card_buttonbar = create("div", desc_section, text=null, "room-card-buttonbar"); 

            let change_button = create("p", room_card_buttonbar, "Modifier", "reservation-button");     
            change_button.onclick = function() { Display_Modal(reservation[0], reservation.id_room, reservation.capacity);} 

            let cancel_button = create("p", room_card_buttonbar, "Annuler", "reservation-button");     
            cancel_button.onclick = function() { deleteReservation(reservation[0]);}  
          }   

          if(reservation.status == "Denied")
          {
            create("div", room_card_title, text=null, "status-dot", "dot-denied");
            create("p", room_card_title, "Chambre n°" + reservation.floor + reservation.number + " - " + reservation.price + "€");
          }
        }
      }
  );
}

function displayPendingReservations()
{
  let rooms_container = document.getElementById("rooms-container");
  clearBox("rooms-container");

  label_old_reservation.classList.remove("active");
  label_approved_reservation.classList.remove("active");
  label_pending_reservation.classList.add("active");
  label_denied_reservation.classList.remove("active");

  axios.get("./src/requests/Reservations.php", { params : {function : "displayPendingReservations"} }).then(
    response => 
    {   
      for(let reservation of response.data)
      {
        let room_card = create("div", rooms_container, text=null, "room-card");

        let img_section = create("div", room_card, text=null, "room-card-img"); 
        let room_img = create("img", img_section, text=null, "room-img"); 
        room_img.setAttribute('src', './assets/'+reservation.floor + reservation.number+'.jpg');

        let desc_section = create("div", room_card, text=null, "room-card-desc"); 
        let room_card_title = create("div", desc_section, text=null, "room-card-title"); 

        create("div", room_card_title, text=null, "status-dot", "dot-pending");
        create("p", room_card_title, "Chambre n°" + reservation.floor + reservation.number + " - " + reservation.price + "€");
        
        let room_card_content = create("div", desc_section, text=null, "room-card-content"); 
        create("p", room_card_content, (reservation.time_start).slice(0, 10) + " au " + (reservation.time_end).slice(0, 10));
        create("p", room_card_content, reservation.nbr_adult + " adultes et " + reservation.nbr_child + " enfants");

        let room_card_buttonbar = create("div", desc_section, text=null, "room-card-buttonbar"); 

        let change_button = create("p", room_card_buttonbar, "Modifier", "reservation-button");     
        change_button.onclick = function() { Display_Modal(reservation[0], reservation.id_room, reservation.capacity);} 

        let cancel_button = create("p", room_card_buttonbar, "Annuler", "reservation-button");     
        cancel_button.onclick = function() { deleteReservation(reservation[0]);} 
      }
    }
  );
}

function displayDeniedReservations()
{
  let rooms_container = document.getElementById("rooms-container");
  clearBox("rooms-container");

  label_old_reservation.classList.remove("active");
  label_approved_reservation.classList.remove("active");
  label_pending_reservation.classList.remove("active");
  label_denied_reservation.classList.add("active");

  axios.get("./src/requests/Reservations.php", { params : {function : "displayDeniedReservations"} }).then(
    response => 
    {   
      for(let reservation of response.data)
      {
        let room_card = create("div", rooms_container, text=null, "room-card");

        let img_section = create("div", room_card, text=null, "room-card-img"); 
        let room_img = create("img", img_section, text=null, "room-img"); 
        room_img.setAttribute('src', './assets/'+reservation.floor + reservation.number+'.jpg');

        let desc_section = create("div", room_card, text=null, "room-card-desc"); 
        let room_card_title = create("div", desc_section, text=null, "room-card-title"); 
        
        let room_card_content = create("div", desc_section, text=null, "room-card-content"); 
        create("p", room_card_content, (reservation.time_start).slice(0, 10) + " au " + (reservation.time_end).slice(0, 10));
        create("p", room_card_content, reservation.nbr_adult + " adultes et " + reservation.nbr_child + " enfants");

        create("div", room_card_title, text=null, "status-dot", "dot-denied");
        create("p", room_card_title, "Chambre n°" + reservation.floor + reservation.number + " - " + reservation.price + "€");
      }
    }
  );
}

//Supprime la réservation
function deleteReservation(id)
{
  axios.get("./src/requests/Reservations.php", { params : {function : "deleteReservation", id : id} }).then(
    response => 
    {
      if(response.data == "")
      {
        createToast(1,"Confirmation","La réservation a été annulée");
        displayUpcomingReservations();
      }

      else
      {
        createToast(0,"Erreur","La réservation n'a pas pu être annulée");
      }
    }
  );
}

//Envoie la demande de modification
function submit_form(id_reservation, id_room, capacity, date_start, date_end, nb_adults, nb_children)
{
  let actual_capacity = parseInt(nb_adults) + parseInt(nb_children);

  console.log("id_reservation = " + id_reservation);
  console.log("id_room = " + id_room);
  console.log("capacity = " + capacity);
  console.log("date_start = " + date_start);
  console.log("date_end = " + date_end);
  console.log("nb_adults = " + nb_adults);
  console.log("nb_children = " + nb_children);

  if(id_reservation != "" && id_room != "" && capacity != "" && date_start != "" && date_end != "" && nb_adults != "" && nb_children != "")
  {
    if((date_start < date_end))
    {
      if(date_start > current_date)
      {
        if(actual_capacity <= capacity)
        {
          date_start = date_start + " 17:00:00";
          date_end = date_end + " 10:00:00";
          isRoomAvailable(id_reservation, id_room, capacity, date_start, date_end, nb_adults, nb_children);
        }

        else
        {
          createToast(0,"Erreur","La capacité de la chambre n'est pas suffisante");
        }
      }

      else
      {
        createToast(0,"Erreur","Vous ne pouvez pas réserver pour le jour même ou avant");
      }

    }

    else
    {
      createToast(0,"Erreur","Les dates renseignées sont incorrectes");
    }
  }

  else
  {
    createToast(0,"Erreur","Veuillez renseigner toutes les informations");
  }
}

//Vérifie que la chambre est toujours disponible pour les critères souhaité
function isRoomAvailable(id_reservation, id_room, capacity, date_start, date_end, nb_adults, nb_children)
{
  axios.get("./src/requests/Reservations.php", { params : {function : "isRoomAvailable", id_room : id_room, id_reservation : id_reservation, time_start : date_start, time_end : date_end} }).then(
    response => 
    {
        if(response.data == "")
        {
            updateReservation(date_start, date_end, nb_adults, nb_children, id_reservation)
        }

        else
        {
            createToast(0,"Erreur","La chambre n'est pas disponible");
        }
    }
  );
}

//Modifie la réservation
function updateReservation(date_start, date_end, nb_adults, nb_children, id_reservation)
{
  axios.get("./src/requests/Reservations.php", { params : {function : "updateReservation", time_start : date_start, time_end : date_end, nb_adults : nb_adults, nb_children : nb_children, id : id_reservation} }).then(
    response => 
    {
      if(response.data == "")
      {
          createToast(1,"Confirmation","La modification a été prise en compte");
          Hide_Modal();
          displayUpcomingReservations();
      }

      else
      {
          createToast(0,"Erreur","La modification n'a pas pu aboutir");
      }
    }
  );
}

//Affiche le modal de modification de réservation
function Display_Modal(id_reservation, id_room, capacity)
{
    document.getElementById("background").style.display = 'flex';
    let update_button = createModal(id_reservation, id_room, capacity);
}

//Cache le container du modal et supprime son contenu (le modal)
function Hide_Modal()
{
    document.getElementById("background").style.display = 'none';
    clearBox("background");
}

//Crée un modal de modification de réservation avec les informations de la réservation nécessaires à son fonctionnement
function createModal(id_reservation, id_room, capacity)
{
  //background
  let background = document.getElementById("background");

  //modal
  let reservation_modal = create("div", background, text=null, "reservation-modal");

  //navbar
  let reservation_modal_navbar = create("div", reservation_modal, text=null, "reservation-modal-navbar");
  create("p", reservation_modal_navbar, "Modifier la réservation");

  //contenu
  let reservation_modal_content = create("div", reservation_modal, text=null, "reservation-modal-content");

  //form
  let reservation_form = create("div", reservation_modal_content, text=null, "reservation-form");

  //elem 1
  let reservation_form_elem_date_start = create("div", reservation_form, text=null, "reservation-form-elem");
  create("p", reservation_form_elem_date_start, "Date de début");
  let input_date_start = create("input", reservation_form_elem_date_start, text=null, "form-input");
  input_date_start.setAttribute("type", "date")
  input_date_start.setAttribute("name", "date_start_reservation")

  //elem 2
  let reservation_form_elem_date_end = create("div", reservation_form, text=null, "reservation-form-elem");
  create("p", reservation_form_elem_date_end, "Date de fin");
  let input_date_end = create("input", reservation_form_elem_date_end, text=null, "form-input");
  input_date_end.setAttribute("type", "date")
  input_date_end.setAttribute("name", "date_end_reservation")

  //elem 3
  let reservation_form_elem_adult = create("div", reservation_form, text=null, "reservation-form-elem");
  create("p", reservation_form_elem_adult, "Adultes");
  let input_adult = create("input", reservation_form_elem_adult, text=null, "form-input");
  input_adult.setAttribute("type", "number")
  input_adult.setAttribute("value", "1")
  input_adult.setAttribute("min", "1")
  input_adult.setAttribute("max", "4")
  input_adult.setAttribute("onKeyDown", "return false")
  input_adult.setAttribute("name", "nb_adults")

  //elem 4
  let reservation_form_elem_children = create("div", reservation_form, text=null, "reservation-form-elem");
  create("p", reservation_form_elem_children, "Enfants");
  let input_children = create("input", reservation_form_elem_children, text=null, "form-input");
  input_children.setAttribute("type", "number")
  input_children.setAttribute("value", "0")
  input_children.setAttribute("min", "0")
  input_children.setAttribute("max", "4")
  input_children.setAttribute("onKeyDown", "return false")
  input_children.setAttribute("name", "nb_children")

  //buttonbar
  let buttonbar = create("div", reservation_modal, text=null, "reservation-modal-buttonbar");

  let cancel_button = create("button", buttonbar, "Annuler", "modal-button", "modal-cancel");
  cancel_button.onclick = function() { Hide_Modal();}  

  let update_button = create("button", buttonbar, "Modifier", "modal-button", "modal-add");
  update_button.onclick = function() { submit_form(id_reservation, id_room, capacity, input_date_start.value, input_date_end.value, input_adult.value, input_children.value);} 
}

//crée les div cards des chambres au chargement de la page
displayUpcomingReservations(); 
