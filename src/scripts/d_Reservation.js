
let btnInfo = document.querySelector('.room-nav > li:nth-child(1)');
let btnResa = document.querySelector('.room-nav > li:nth-child(2)');
let btnDemands = document.querySelector('.room-nav > li:nth-child(3)');

let blockResa = document.querySelector('.resa-form');
let blockInfo = document.querySelector('.resa-info');
let blockDemands = document.querySelector('.resa-demands');

btnInfo.addEventListener('click', function() {
    blockInfo.classList.remove('no-active');
    blockInfo.classList.add('active');

    blockResa.classList.add('no-active');
    blockResa.classList.remove('active');

    blockDemands.classList.add('no-active');
    blockDemands.classList.remove('active');
})

btnResa.addEventListener('click', function() {
    blockInfo.classList.add('no-active');
    blockInfo.classList.remove('active');

    blockResa.classList.remove('no-active');
    blockResa.classList.add('active');

    blockDemands.classList.add('no-active');
    blockDemands.classList.remove('active');
})

btnDemands.addEventListener('click', function() {
    blockInfo.classList.add('no-active');
    blockInfo.classList.remove('active');

    blockResa.classList.add('no-active');
    blockResa.classList.remove('active');

    blockDemands.classList.remove('no-active');
    blockDemands.classList.add('active');
})

let demands_container = create("div", blockDemands, text=null, "demands-container", "demands-container");

let id = document.querySelector(".resa-info").dataset.id;
axios.get("./src/requests/d_Reservation.php", { params: {function :"getRoom", id: id} })
    .then(function(response) {
        if (response.data != "") {
            (response.data).forEach(period => {
                document.querySelector('.info-room').innerHTML = 'Chambre numéro ' + response.data[0]['number'] + ' | étage numéro ' + response.data[0]['floor'] + ' | capacité de ' + response.data[0]['capacity'] + ' personnes'
            });
        }
    })

let list_contenant = document.querySelector('.room-container');

axios.get("./src/requests/d_Reservation.php", { params: {function :"getRooms"} })
    .then(function(response) {
        if (response.data != "") {
            create('h6', list_contenant, 'Chambres')
            for (let chambre of response.data) {
                let li = create('li', list_contenant)
                let a = create('a', li, 'Chambre ' + chambre['number'])
                a.href = '?url=reservation&room=' + chambre['id'];
            }
        }
    })

async function reservationRoom(id) {
    await axios.get("./src/requests/set_reservation_room.php", {
            params: {
                id: id,
                date_debut: document.querySelector('input[name=debut]').value,
                date_end: document.querySelector('input[name=end]').value,
                nb_adult: document.querySelector('input[name=nb_adult]').value,
                nb_child: document.querySelector('input[name=nb_child]').value,
                gender: document.querySelector('select[name=gender]').value,
                name: document.querySelector('input[name=name]').value,
                prenom: document.querySelector('input[name=prenom]').value,
                mail: document.querySelector('input[name=mail]').value,
                phone: document.querySelector('input[name=phone]').value

            }
        })

        .then(function(response) {
            if (response.data['type'] == false) {
                if (response.data['commentaire'] != null) {
                    createToast(0, "Erreur", response.data['commentaire']);
                }
            } else {
                var ok = confirm(response.data['commentaire']);
                if (ok) {
                    location.reload();
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function Display_demands()
{
    axios.get("./src/requests/d_Reservation.php", { params: {function :"getPendingReservations"} }).then(
        function(response) {
            clearBox("demands-container");
            if(response.data != "") 
            {
                for (let reservation of response.data) 
                {
                    let card = create("div", demands_container, text=null, "reservation-card");
                    create("div", card, "Chambre N°" + reservation.floor + reservation.number, "reservation-card-title");
                    create("div", card, "Du" + reservation.time_start + " au " + reservation.time_end, "reservation-card-content");
                    let buttonvar = create("div", card, text=null, "reservation-card-buttonbar");
    
                    let approve_btn = create("button", buttonvar, "Accepter", "demand-btn", "approve-btn");
                    approve_btn.onclick = function() { Approve_demand(reservation[0]);}
    
                    let deny_btn = create("button", buttonvar, "Refuser", "demand-btn", "deny-btn");
                    deny_btn.onclick = function() { Deny_demand(reservation[0]);}
                }
            }
    
            else
            {
                create("h3", demands_container, "Il n'y a aucune réservation à traiter");
            }
        }
    );
}

function Approve_demand(id_reservation)
{
    axios.get("./src/requests/d_Reservation.php", { params : {function : "Approve_demand", id_reservation : id_reservation} }).then(
        response => 
        {
            if(response.data == "")
            {
                createToast(1,"Confirmation","La réservation a été acceptée");
                Display_demands();
            }

            else
            {
                createToast(0,"Erreur","La réservation n'a pas pu être acceptée");
            }
        }
    );
}

function Deny_demand(id_reservation)
{
    axios.get("./src/requests/d_Reservation.php", { params : {function : "Deny_demand", id_reservation : id_reservation} }).then(
        response => 
        {
            if(response.data == "")
            {
                createToast(0,"Erreur","La réservation a été refusée");
                Display_demands();
            }

            else
            {
                createToast(0,"Erreur","La réservation n'a pas pu être refusée");
            }
        }
    );
}

Display_demands();