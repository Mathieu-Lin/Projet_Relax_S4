affichage('Tous');

let ticket_list = document.querySelector('.ticket-list');
function affichage(type_reache){
    // recuperation des informations en fonction du type de recherche
    axios.get("./src/requests/d_Ticket.php", { params: {function : "getTicket", type: type_reache} })
    .then(function (response) {
        reboot_list();
        if(response.data != ''){
            for(let ticket of response.data){
                // pour recuperer la date de dernière modification et de creation 
                let creat = new Date(ticket['creation_date']);
                let modif = new Date(ticket['last_modif']);
                let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                let formatter = new Intl.DateTimeFormat('fr-FR', options);

                let creat_date = formatter.format(creat);
                let modif_date = formatter.format(modif);


                let creat_heures = creat.getHours().toString().padStart(2, '0');
                let creat_minutes = creat.getMinutes().toString().padStart(2, '0');
                let creat_time = `${creat_heures}:${creat_minutes}`;

                let modif_heures = modif.getHours().toString().padStart(2, '0');
                let modif_minutes = modif.getMinutes().toString().padStart(2, '0');
                let modif_time = `${modif_heures}:${modif_minutes}`;
                create_ticket_block(ticket[0], ticket['description'], ticket['number'], ticket['floor'], creat_date, creat_time, ticket[9], ticket[10], modif_date, modif_time, ticket[20], ticket[21], ticket['status'])
            }
        }else{
            // etats de la recherche (class change fonction états)
            let status = ""
            if(type_reache == "Completed"){
                status = "terminé";
            }else if(type_reache == "In Progress"){
                status = "cours";
            }else if(type_reache == "Pending"){
                status = "attente";
            }else if(type_reache == "Canceled"){
                status = "annulé";
            }
            let noTicket = create('p', ticket_list, 'Pas de ticket en '+ status);
            noTicket.style.textAlign = "center";
        }
    })
}

/*************************************************************************************************************** */
// function reboot_list() ==> permet de remtre le container vide
/*************************************************************************************************************** */
function reboot_list(){
    while (ticket_list.firstChild) {
        ticket_list.removeChild(ticket_list.firstChild);
    }
}

/*************************************************************************************************************** */
// function create_ticket_block() ==> permet de cree un seul ticket
/*************************************************************************************************************** */
// id_ticket = int id du ticket
// desc = chaine de caractère description du ticket
// info_num = int numero de chambre du ticket
// info_etage = int numero etage du ticket
// creat_date = date de creation du ticket
// creat_time = heure du création du ticket 
// creat_nom = chaine de caractère nom du createur
// creat_prenom = chaine de caractère prenom du createur 
// creat_date = date dernier modif du ticket
// creat_time = heure dernier modif du ticket 
// creat_nom = chaine de caractère nom personne dernier modif 
// creat_prenom = chaine de caractère prenom personne dernier modif 
// type = chaine de caractère étas du ticket
/*************************************************************************************************************** */
function create_ticket_block(id_ticket, desc, info_num, info_etage, creat_date, creat_time, creat_nom, creat_prenom, modif_date, modif_time, modif_nom, modif_prenom, type) {
    // les anneaux du ticket
    let ticket_block = create("div", ticket_list, null, "ticket-block");
    let scotch_block = create("div", ticket_block, null, "scotch");
    
    // bouton de modification
    let update_icon = create("p", ticket_block, null, "update-icon");
    update_icon.addEventListener('click', () => { 
        let add_ticket = document.querySelector('.ticket-nav > li:last-child');
        let form = document.querySelector('.form-container');

        if(form.classList.contains('active')){add_ticket.innerText = "Ajouter";}else{add_ticket.innerText = "Fermer";}
        bloc_update(id_ticket, desc, info_num, info_etage);
    });
    let fontawesome_icon_modif = create("i", update_icon, null, "fa-solid");
    fontawesome_icon_modif.classList.add('fa-pen-to-square');
    

    // bouton de annuler
    let annule_icon = create("p", ticket_block, null, "annule-icon");
    annule_icon.addEventListener('click', () => { 
        annule_ticket(id_ticket)
    });
    let fontawesome_icon = create("i", annule_icon, null, "fa-solid");
    fontawesome_icon.classList.add('fa-trash');
    if(type == 'Canceled' || type == 'Completed'){
        annule_icon.style.display = 'none';
        update_icon.style.display = 'none';
    }
    // information
    create("h4", ticket_block, desc, "desc");
    create("p", ticket_block, "Chambre n°"+info_num+" étage "+info_etage, "info");
    create("p", ticket_block, "Créé le "+creat_date+" à "+creat_time+" par "+creat_nom+" "+creat_prenom, "creat");
    create("p", ticket_block, "Dernière modification le "+modif_date+" à "+modif_time+" par "+modif_nom+" "+modif_prenom, "modif");
    let bas = create("div", ticket_block, null, "bas_ticket");

    // etats du ticket (class change fonction états)
    // etats du ticket (class change fonction états)
    if(type == "Completed"){
        let status = create("p", bas, "Terminé", "status");
        status.classList.add(type);
    }else if(type == "In Progress"){
        let status = create("p", bas, "En cours", "status");
        status.classList.add("InProgress");
    }else if(type == "Pending"){
        let status = create("p", bas, "En attente", "status");
        status.classList.add(type);
    }else if(type == "Canceled"){
        let status = create("p", bas, "Annulé", "status");
        status.classList.add(type);
    }

}

// afficher/enlever le formulaire d'ajout d'un ticket
let add_ticket = document.querySelector('.ticket-nav > li:last-child');
add_ticket.addEventListener('click', () => {
    let form = document.querySelector('.form-container');
    
    if(form.classList.contains('active')){add_ticket.innerText = "Ajouter";}else{add_ticket.innerText = "Fermer";}

    document.querySelector('.form-container').classList.toggle('active');         
    document.querySelector('.form-container').classList.toggle('no-active');         
    document.querySelector('.add-form').classList.add('active');             
    document.querySelector('.update-form').classList.add('no-active');          
    document.querySelector('.add-form').classList.remove('no-active');             
    document.querySelector('.update-form').classList.remove('active');       
});

/*************************************************************************************************************** */
// function add_ticket_function() ==> permet d'ajouter un ticket (axios)
/*************************************************************************************************************** */
async function add_ticket_function(){
    await axios.post('./src/requests/add_ticket.php', { 
        desc : document.querySelector('textarea[name=desc_a]').value,
        room : document.querySelector('select[name=room_a]').value    
    })
    .then(function (response) {
        console.log(response.data);
        if(response.data['type'] == false){
            if(response.data['commentaire'] != null){    
                createToast(0, "Erreur", response.data['commentaire'] );
            }
        }
        else{
            var ok = confirm(response.data['commentaire']);
            if (ok) { 
                document.querySelector('.form-container').classList.remove('active');         
                document.querySelector('.form-container').classList.add('no-active');  
                affichage('Tous'); 
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

let select_room = document.querySelector('#room_a');
axios.get('./src/requests/d_Ticket.php', { params: {function :"getRooms"} })
.then(function (response) {
    for(let room of response.data){
        let option = create('option', select_room, 'Chambre n°'+room['number']);
        option.value = room['id'];
        
    }
})
.catch(function (error) {
    console.log(error);
});

function annule_ticket(id_ticket){
    axios.get('./src/requests/d_Ticket.php', { params: {function :"cancelTicket", id_ticket : id_ticket} })
    .then(function (response) {
        createToast(1, "Confirmation", 'Ticket bien annulé')
        location.reload();
    })
}


function bloc_update(id_ticket, desc, info_num, info_etage){
    document.querySelector('.form-container').classList.remove('no-active');   
    document.querySelector('.form-container').classList.add('active');            
    document.querySelector('.add-form').classList.remove('active');             
    document.querySelector('.update-form').classList.remove('no-active');          
    document.querySelector('.add-form').classList.add('no-active');             
    document.querySelector('.update-form').classList.add('active');
    
    document.querySelector('.desc_i').innerHTML = desc;
    document.querySelector('.room_i').innerHTML = "Chambre n°"+info_num+" étage "+info_etage;

    let status_intervention = document.querySelector('select[name=status]'); 
    let employee_intervention = document.querySelector('select[name=employee]'); 
    let days_intervention = document.querySelector('input[name=days]'); 
    let heure_d_intervention = document.querySelector('input[name=debut]'); 
    let heure_f_intervention = document.querySelector('input[name=end]'); 

    // remise a 0 des options status et employee (eviter les doublons en cas de clique sur différent ticket a la suite)
    while (employee_intervention.firstChild) {
        employee_intervention.removeChild(employee_intervention.firstChild);
    }
    while (status_intervention.firstChild) {
        status_intervention.removeChild(status_intervention.firstChild);
    }

    axios.get('./src/requests/d_Ticket.php', { params: {function :"getIntervention", id_ticket : id_ticket} })
        .then(function (response) {
            if (response.data != "") { // si le ticket est en cours (intervention)
                let intervention = response.data;
                let tab_status = ['Completed', 'In Progress'];
                let tab_status_fr = ['Résolu', 'En cours'];
                /********************************************************************************************** */
                // option pour le status avec selection
                for(let i = 0; i < 2; i++) {
                    let option = create('option', status_intervention, tab_status_fr[i]);
                    option.value = tab_status[i];
                    if(intervention[0]['status'] == tab_status[i]){
                        option.selected = true;
                    }
                }
                /********************************************************************************************** */
                // date et heure
                var datetime_s = convertSQLDateToJS(intervention[0]['time_start']);
                var datetime_f = convertSQLDateToJS(intervention[0]['time_end']);

                // Récupérez la date sous forme de chaîne au format AAAA-MM-JJ
                var date = datetime_s.toISOString().split("T")[0];
                // Récupérez l'heure sous forme de chaîne au format HH:MM
                var heure_s = datetime_s.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                var heure_f = datetime_f.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                days_intervention.value = date;
                heure_d_intervention.value = heure_s;
                heure_f_intervention.value = heure_f;
                /******************************************************************************************* */
                axios.get('./src/requests/d_Ticket.php', { params: {function :"getEmployee"} })
                .then(function (response) {
                    for(let employee of response.data){
                        let option = create('option', employee_intervention, employee['lastname']+' '+employee['firstname']);
                        option.value = employee['id'];
                        if(intervention[0][2] == employee['id']){
                            option.selected = true;
                        }
                        
                    }
                })

            }else{ // si le ticket est en attente
                let tab_status = ['In Progress', 'Pendding'];
                let tab_status_fr = ['En cours', 'Attente'];
                /********************************************************************************************** */
                // option pour le status avec selection
                for(let i = 0; i < 2; i++) {
                    let option = create('option', status_intervention, tab_status_fr[i]);
                    option.value = tab_status[i];
                    if('Pendding' == tab_status[i]){
                        option.selected = true;
                    }
                }
                /********************************************************************************************** */
                // date et heure
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // plus 1 car les mois commence a 0
                var year = (currentDate.getFullYear()).toString().padStart(2, "0"); //toString().padStart(2, "0") permet de transformer 5 en 05
                // Créez une chaîne de caractères représentant la date au format AAAA-MM-JJ
                var date = year + '-' + month + '-' + day;

                var hours = currentDate.getHours();
                var minutes = currentDate.getMinutes();
                // Créez une chaîne de caractères représentant l'heure au format HH:MM:SS
                var heure_s = hours + ':' + minutes;
                var heure_f = (hours+1) + ':' + minutes;
                console.log(date)
                days_intervention.value = date;
                heure_d_intervention.value = heure_s;
                heure_f_intervention.value = heure_f;
                /******************************************************************************************* */
                axios.get('./src/requests/d_Ticket.php', { params: {function :"getEmployee"} })
                .then(function (response) {
                    let option_disable = create('option', employee_intervention, 'Choisisez un employée');
                    option_disable.disabled = true;
                    option_disable.selected = true;
                    option_disable.value = 0;
                    for(let employee of response.data){
                        let option = create('option', employee_intervention, employee['lastname']+' '+employee['firstname']);
                        option.value = employee['id'];                        
                    }
                })
            }
        })
    document.querySelector('#update').onclick = function() {
            let status = document.querySelector('select[name=status]').value; 
            let employee = document.querySelector('select[name=employee]').value; 
            let days = document.querySelector('input[name=days]').value; 
            let heure_d = document.querySelector('input[name=debut]').value; 
            let heure_f = document.querySelector('input[name=end]').value; 

        axios.get('./src/requests/d_Ticket.php', { params: {function :"updateTicket", id_ticket : id_ticket, status : status, employee : employee, days : days, heure_d : heure_d, heure_f : heure_f} })
        .then(function (response) {
            console.log(response.data)
            location.reload();
        })
    }
}

