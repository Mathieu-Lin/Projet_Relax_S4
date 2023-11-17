/////////////////////////////
//////// Page Congé /////////
////////////////////////////

// Road conge fonctionnel 

//////// Les fonctions requêtes import /////////
// liste
async function getDataFromEmployee(id_employee) {
    res = []

    await axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployee", id_employee: id_employee } }).then(
        response => {
            res = response.data
        }
    );

    return res
}

async function getEmployeeFromId(id_employee) {
    res = [];

    await axios.get("./src/requests/d_Conge.php", { params: { function: "getEmployeeFromId", id_employee: id_employee } }).then(
        response => {
            res = response.data;
        }
    );
    return res;
}


//////// Les fonctions paging /////////


// Traitement de la partie détails sur la demande de congé  
async function setDisplayedConge(conge,road_conge) {


    // Selections des divs 
    let conge_identity_card = document.querySelector(".conge-identity-card");
    let conge_info_card = document.querySelector(".conge-information-card");

    // carte d'identité de la personne qui a fait la demande de congé
    let identity_card = await getEmployeeFromId(conge['id_employee']);

    // carte d'identité de la personne qui connecte
    let identity_connect = await getEmployeeFromId(user_id);

    // carte d'identité de la personne qui répond à la demande de congé
    let identity_answer = await getEmployeeFromId(conge['id_admin']);

    // Mise à jour au sein de la partie details
    if (identity_card != []) {
        while (conge_identity_card.firstChild) {
            conge_identity_card.removeChild(conge_identity_card.firstChild);
        }
        while (conge_info_card.firstChild) {
            conge_info_card.removeChild(conge_info_card.firstChild);
        }

        ////////////////////////////////
        // Partie identité///////////////
        ///////////////////////////////// 

        // Titre
        create('div', conge_identity_card, "Identité", "conge-information-card-title");

        // nom
        let lastname_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        lastname_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', lastname_div, " Nom :", "conge-information-card-writting-title");
        create('span', lastname_div, identity_card['lastname'], "conge-information-card-writting");

        // prénom 
        let firstname_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        firstname_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', firstname_div, "Prénom :", "conge-information-card-writting-title");
        create('span', firstname_div, identity_card['firstname'], "conge-information-card-writting");

        // Date de naissance
        let birth_date_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        birth_date_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', birth_date_div, "Date de naissance :", "conge-information-card-writting-title");
        create('span', birth_date_div, convertSQLDateToJS(identity_card['birth_date']).toLocaleDateString("fr-FR"), "conge-information-card-writting");

        // Genre 
        let gender_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        gender_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', gender_div, "Genre :", "conge-information-card-writting-title");
        if (identity_card['gender'] == 'Male') {
            create('span', gender_div, " Masculin", "conge-information-card-writting");
        } else {
            create('span', gender_div, " Féminin", "conge-information-card-writting");
        }

        // Adresse 
        let address_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        address_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', address_div, "Adresse :", "conge-information-card-writting-title");
        create('span', address_div, identity_card['number'].toString() + ",", "conge-information-card-writting");
        create('span', address_div, identity_card['street'] + ".", "conge-information-card-writting");
        create('span', address_div, identity_card['zip_code'].toString() + ",", "conge-information-card-writting");
        create('span', address_div, identity_card['city'] + ",", "conge-information-card-writting");
        create('span', address_div, identity_card['country'] + ".", "conge-information-card-writting");
        let linkgoogle = create('a', address_div, "", "conge-information-card-writting");
        linkgoogle.href = "https://www.google.com/maps/search/" + identity_card['number'].toString() + "+" + identity_card['street'] + "+" + identity_card['zip_code'].toString() + "+" + identity_card['city'] + "/";
        linkgoogle.target = "_blank";
        var locationIcon = document.createElement("i");
        locationIcon.className = "fa-solid fa-location-dot";
        locationIcon.style.color = "#0000a0";
        linkgoogle.appendChild(locationIcon);

        // Numéro de telephone 
        let phone_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        phone_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', phone_div, "Numéro de téléphone :", "conge-information-card-writting-title");
        create('span', phone_div, identity_card['phone'].toString(), "conge-information-card-writting");

        // Mail 
        let mail_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        mail_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', mail_div, "Mail :", "conge-information-card-writting-title");
        create('span', mail_div, identity_card['mail'], "conge-information-card-writting");
        var mailIcon = document.createElement("i");
        mailIcon.className = "fa-solid fa-envelope";
        mailIcon.style.color = "#0000a0";
        mailIcon.style.cursor = "pointer";
        let mailIconClick = create('span', mail_div, "", "conge-information-card-writting");
        mailIconClick.appendChild(mailIcon);
        mailIconClick.addEventListener('click', () => {
            window.location.href = "mailto:" + identity_card['mail'];
        });

        // Service
        let service_div = create('div', conge_identity_card, "", "conge-information-card-writting-pack");
        service_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', service_div, "Service :", "conge-information-card-writting-title");
        create('span', service_div, identity_card['name'], "conge-information-card-writting");

        //////////////////////////////////////////
        // Partie information congé///////////////
        //////////////////////////////////////////

        // Titre de la partie information congé
        create('div', conge_info_card, "Information", "conge-information-card-title");

        // Datetime de début de congé
        let time_start_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
        time_start_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', time_start_div, "Date début de congé :", "conge-information-card-writting-title");
        create('span', time_start_div, " le " + convertSQLDateToJS(conge['time_start']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
        create('span', time_start_div, " à " + convertSQLDateToJS(conge['time_start']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge['time_start']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

        // Modifcation de début de congé si l'utilisateur se connecte et qui est responsable (affecte seulement la demande en attente)
        if (identity_connect['name'] == "Gouvernance" && conge['status'] == "Pending") {
            let time_start_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
            time_start_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #e67300;"></i>'
            create('span', time_start_modif_div, "Modifier cette date début de congé :", "conge-information-card-writting-title-modif");
            var time_start_input = document.createElement("input");
            time_start_input.className = "conge-information-card-datetime";
            time_start_input.type = "datetime-local";
            time_start_input.id = "time_start_modif";
            time_start_input.name = "time_start_modif";
            time_start_modif_div.appendChild(time_start_input);
        }

        // Datetime de fin de congé
        let time_end_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
        time_end_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', time_end_div, "Date fin de congé :", "conge-information-card-writting-title");
        create('span', time_end_div, " le " + convertSQLDateToJS(conge['time_end']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
        create('span', time_end_div, " à " + convertSQLDateToJS(conge['time_end']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge['time_end']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

        // Modifcation de fin de congé si l'utilisateur se connecte et qui est responsable (affecte seulement la demande en attente)
        if (identity_connect['name'] == "Gouvernance" && conge['status'] == "Pending") {
            let time_end_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
            time_end_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #e67300;"></i>'
            create('span', time_end_modif_div, "Modifier cette date fin de congé :", "conge-information-card-writting-title-modif");
            var time_end_input = document.createElement("input");
            time_end_input.className = "conge-information-card-datetime";
            time_end_input.type = "datetime-local";
            time_end_input.id = "time_end_modif";
            time_end_input.name = "time_end_modif";
            time_end_modif_div.appendChild(time_end_input);
        }

        // Datetime de début de création 
        let creation_date_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
        creation_date_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', creation_date_div, "Date début de création :", "conge-information-card-writting-title");
        create('span', creation_date_div, " le " + convertSQLDateToJS(conge['creation_date']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
        create('span', creation_date_div, " à " + convertSQLDateToJS(conge['creation_date']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge['creation_date']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

        // Datetime dernière modification
        let last_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
        last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', last_modif_div, "Date dernière modification :", "conge-information-card-writting-title");
        create('span', last_modif_div, " le " + convertSQLDateToJS(conge['last_modif']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
        create('span', last_modif_div, " à " + convertSQLDateToJS(conge['last_modif']).getHours().toString().padStart(2, '0')  + "h" + convertSQLDateToJS(conge['last_modif']).getMinutes().toString().padStart(2, '0') , "conge-information-card-writting");

        // La personne de la dernière modification
        let id_last_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
        if (conge['id_last_modif'] !=null)
        {
            let identity_last_modif = await getEmployeeFromId(conge['id_last_modif']);

            id_last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
            create('span', id_last_modif_div, "Mise à jour par :", "conge-information-card-writting-title");
            create('span', id_last_modif_div,identity_last_modif['firstname']+ " " + identity_last_modif['lastname'], "conge-information-card-writting");
        }
        // Justification
        let message_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
        message_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
        create('span', message_div, "Justification :", "conge-information-card-writting-title");
        create('span', message_div, conge['message'], "conge-information-card-writting");

        // Saisie de Justification
        if (identity_connect['name'] == "Gouvernance" && conge['status'] == "Pending") {
            let message_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
            message_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #e67300;"></i>'
            create('span', message_modif_div, "Modifier cette justification :", "conge-information-card-writting-title-modif");
            var message_modif_input = document.createElement("input");
            message_modif_input.className = "conge-information-card-textarea";
            message_modif_input.type = "text";
            message_modif_input.id = "justification_modif";
            message_modif_input.name = "justification_modif";
            message_modif_div.appendChild(message_modif_input);
        }

        // Réponse 
        if (conge['status'] == 'Approved' || conge['status'] == 'Denied') {
            // Réponse du responsable
            let answer_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
            answer_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
            create('span', answer_div, "Réponse du responsable :", "conge-information-card-writting-title");
            create('span', answer_div, conge['answer'], "conge-information-card-writting");
            if (conge['status'] == 'Approved') {
                create('span', conge_info_card, "Validée par " + identity_answer['firstname'] + " " + identity_answer['lastname'], "conge-information-card-writting-approved");
            } else {
                create('span', conge_info_card, "Refusée par " + identity_answer['firstname'] + " " + identity_answer['lastname'], "conge-information-card-writting-denied");
            }
        } else {
            if (identity_connect['name'] == "Gouvernance") {
                // saisie de réponse
                let answer_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                answer_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                create('span', answer_div, "Répondre à cette demande :", "conge-information-card-writting-title");
                var answer_input = document.createElement("input");
                answer_input.className = "conge-information-card-textarea";
                answer_input.type = "text";
                answer_input.id = "answer_modif";
                answer_input.name = "answer_modif";
                answer_div.appendChild(answer_input);

                // Vérificateur de saisie 
                let control_modif_card_div = create('div', conge_info_card, "", "conge-information-card-button-pack");

                // les boutons 
                let button_info_card_div = create('div', conge_info_card, "", "conge-information-card-button-pack");
                let button_approved_conge = create('button', button_info_card_div, "Approuver", "conge-information-card-button-approved");
                let button_modif_conge = create('button', button_info_card_div, "Modifier", "conge-information-card-button-modif");
                let button_denied_conge = create('button', button_info_card_div, "Refuser", "conge-information-card-button-denied");

                // En cas de click sur le bouton approuver 
                button_approved_conge.addEventListener('click', () => {

                    // Récupération des valeurs saisies
                    id_answer = document.getElementById("answer_modif");

                    // Mise à jour de la demande congé
                    axios.get("./src/requests/d_Conge.php", { params: { function: "updateHolidayByAnswer", id_valid: identity_connect['id'], reason: id_answer.value, id_conge: conge['id'], verif: "Approved", id_employee: identity_connect['id'] } }).then(
                        response => {
                            conge_V2 = response.data;

                            // Selections des divs information congé
                            let conge_info_card = document.querySelector(".conge-information-card");

                            // Suppression des informations du congé
                            while (conge_info_card.firstChild) {
                                conge_info_card.removeChild(conge_info_card.firstChild);
                            }

                            // Titre de la partie information congé
                            create('div', conge_info_card, "Information", "conge-information-card-title");

                            // Datetime de début de congé 
                            let time_start_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            time_start_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', time_start_div, "Date début de congé :", "conge-information-card-writting-title");
                            create('span', time_start_div, " le " + convertSQLDateToJS(conge_V2['time_start']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                            create('span', time_start_div, " à " + convertSQLDateToJS(conge_V2['time_start']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['time_start']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                            // Datetime de fin de congé
                            let time_end_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            time_end_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', time_end_div, "Date fin de congé :", "conge-information-card-writting-title");
                            create('span', time_end_div, " le " + convertSQLDateToJS(conge_V2['time_end']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                            create('span', time_end_div, " à " + convertSQLDateToJS(conge_V2['time_end']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['time_end']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                            // Datetime de début de création 
                            let creation_date_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            creation_date_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', creation_date_div, "Date début de création :", "conge-information-card-writting-title");
                            create('span', creation_date_div, " le " + convertSQLDateToJS(conge_V2['creation_date']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                            create('span', creation_date_div, " à " + convertSQLDateToJS(conge_V2['creation_date']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['creation_date']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                            // Datetime dernière modification
                            let last_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', last_modif_div, "Date dernière modification :", "conge-information-card-writting-title");
                            create('span', last_modif_div, " le " + convertSQLDateToJS(conge_V2['last_modif']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                            create('span', last_modif_div, " à " + convertSQLDateToJS(conge_V2['last_modif']).getHours().toString().padStart(2, '0')  + "h" + convertSQLDateToJS(conge_V2['last_modif']).getMinutes().toString().padStart(2, '0') , "conge-information-card-writting");

                            // La personne de la dernière modification
                            let id_last_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            id_last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', id_last_modif_div, "Mise à jour par :", "conge-information-card-writting-title");
                            create('span', id_last_modif_div,identity_connect['firstname']+ " " + identity_connect['lastname'], "conge-information-card-writting");
                        

                            // Justification
                            let message_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            message_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', message_div, "Justification :", "conge-information-card-writting-title");
                            create('span', message_div, conge_V2['message'], "conge-information-card-writting");

                            // Réponse du responsable
                            let answer_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                            answer_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                            create('span', answer_div, "Réponse du responsable :", "conge-information-card-writting-title");
                            create('span', answer_div, conge_V2['answer'], "conge-information-card-writting");
                            
                            create('span', conge_info_card, "Validée par " + identity_connect['firstname'] + " " + identity_connect['lastname'], "conge-information-card-writting-approved");
                            
                            // Réactualisation des listes des congés
                            // Si la liste est tous
                            if (road_conge == "All"){
                                // Récupération des données pour la liste tous mise à jour
                                axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidays"} }).then(
                                    response => {
                                        let data = response.data;

                                        // Liste container
                                        let conge_list_container = document.querySelector(".conge-list-container");

                                        // Suppression des données de la liste
                                        while (conge_list_container.firstChild) {
                                            conge_list_container.removeChild(conge_list_container.firstChild);
                                        }
                                        
                                        // Complétation des données dans la liste
                                        if (data.length > 0) {
                                            data = Array.from(data);
                                            data.forEach(conge => {
                                                let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                                if (conge["status"] == "Approved")
                                                {
                                                    create('div', conge_div, "", "conge-list-elt-round-approved")
                                                    let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                    let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                    create('div',conge_div, str_conge)
                                                } else if (conge["status"] == "Pending")
                                                {
                                                    create('div', conge_div, "", "conge-list-elt-round-pending")
                                                    let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                    let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                    create('div',conge_div, str_conge)
                                                }else{
                                                    create('div', conge_div, "", "conge-list-elt-round-denied")
                                                    let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                    let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                    create('div',conge_div, str_conge)
                                                }
                                                conge_div.addEventListener('click', () => {
                                                    setDisplayedConge(conge,road_conge);
                                                })
                                    
                                            })
                                        }
                                    })
                            } else {
                                // Récupération des données pour la liste tous mise à jour
                                axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromStatus", status : road_conge} }).then(
                                    response => {
                                        let data = response.data;

                                        // Liste container
                                        let conge_list_container = document.querySelector(".conge-list-container");

                                        // Suppression des données de la liste
                                        while (conge_list_container.firstChild) {
                                            conge_list_container.removeChild(conge_list_container.firstChild);
                                        }
                                        
                                        // Complétation des données dans la liste
                                        if (data.length > 0) {
                                            data = Array.from(data);
                                            data.forEach(conge => {
                                                let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                                if (conge["status"] == "Approved")
                                                {
                                                    create('div', conge_div, "", "conge-list-elt-round-approved")
                                                    let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                    let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                    create('div',conge_div, str_conge)
                                                } else if (conge["status"] == "Pending")
                                                {
                                                    create('div', conge_div, "", "conge-list-elt-round-pending")
                                                    let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                    let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                    create('div',conge_div, str_conge)
                                                }else{
                                                    create('div', conge_div, "", "conge-list-elt-round-denied")
                                                    let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                    let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                    create('div',conge_div, str_conge)
                                                }
                                                conge_div.addEventListener('click', () => {
                                                    setDisplayedConge(conge,road_conge);
                                                })
                                    
                                            })
                                        }
                                    })

                            }

                        }
                    );

                })


                // En cas de click sur le bouton Modifier
                button_modif_conge.addEventListener('click', () => {
                    // Récupération des valeurs saisies 
                    id_time_start_modif = document.getElementById("time_start_modif");
                    id_time_end_modif = document.getElementById("time_end_modif");
                    id_justification_modif = document.getElementById("justification_modif");
                    let date_now = new Date();

                    // Effacement de la réponse du saisie
                    while (control_modif_card_div.firstChild) {
                        control_modif_card_div.removeChild(control_modif_card_div.firstChild);
                    }

                    // Correction de la valeur date qui ne correspond pas la forme de new Date()
                    let id_time_start_modif_correct = new Date(id_time_start_modif.value);
                    let id_time_end_modif_correct = new Date(id_time_end_modif.value);

                    // Vérification et activation
                    if (id_time_start_modif.value == "" || id_time_end_modif.value == "") {
                        // Erreur : date choisis sont vides
                        create('span', control_modif_card_div, "Vos dates choisis sont vides", "conge-information-card-writting-denied");
                    } else if (date_now > id_time_start_modif_correct || date_now > id_time_end_modif_correct || id_time_end_modif.value < id_time_start_modif.value) {
                        // Erreur : date choisis sont fausses
                        create('span', control_modif_card_div, "Vos dates choisis sont fausses", "conge-information-card-writting-denied");
                    } else {
                        // Approved : tous sont correctes
                        create('span', control_modif_card_div, "Vos modifications sont effectuées avec succès", "conge-information-card-writting-approved");
                        // Mise à jour et affectation de données congé V2 
                        axios.get("./src/requests/d_Conge.php", { params: { function: "updateHolidayByModif", time_start : id_time_start_modif.value, time_end : id_time_end_modif.value, id_conge: conge['id'], justification: id_justification_modif.value, id_employee: identity_connect['id']} }).then(
                            response => {
                                // Affectation de donnée congé mise à jour
                                let conge_V2 = response.data;
                                // Remplacement du date de début
                                while (time_start_div.firstChild) {
                                    time_start_div.removeChild(time_start_div.firstChild);
                                }
                                time_start_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                                create('span', time_start_div, "Date début de congé :", "conge-information-card-writting-title");
                                create('span', time_start_div, " le " + convertSQLDateToJS(conge_V2['time_start']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                                create('span', time_start_div, " à " + convertSQLDateToJS(conge_V2['time_start']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['time_start']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");
                                
                                // Remplacement du date de fin
                                while (time_end_div.firstChild) {
                                    time_end_div.removeChild(time_end_div.firstChild);
                                }
                                time_end_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                                create('span', time_end_div, "Date début de congé :", "conge-information-card-writting-title");
                                create('span', time_end_div, " le " + convertSQLDateToJS(conge_V2['time_end']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                                create('span', time_end_div, " à " + convertSQLDateToJS(conge_V2['time_end']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['time_end']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                                // Remplacement du date de dernière modification
                                while (last_modif_div.firstChild) {
                                    last_modif_div.removeChild(last_modif_div.firstChild);
                                }
                                last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                                create('span', last_modif_div, "Date dernière modification :", "conge-information-card-writting-title");
                                create('span', last_modif_div, " le " + convertSQLDateToJS(conge_V2['last_modif']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                                create('span', last_modif_div, " à " + convertSQLDateToJS(conge_V2['last_modif']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['last_modif']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                                // Remplacement de la personne du dernière modification
                                while (id_last_modif_div.firstChild) {
                                    id_last_modif_div.removeChild(id_last_modif_div.firstChild);
                                }
                                id_last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                                create('span', id_last_modif_div, "Mise à jour par :", "conge-information-card-writting-title");
                                create('span', id_last_modif_div,identity_connect['firstname']+ " " + identity_connect['lastname'], "conge-information-card-writting");
                                
                                // Remplacement de justification
                                while (message_div.firstChild) {
                                    message_div.removeChild(message_div.firstChild);
                                }
                                message_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                                create('span', message_div, "Justification :", "conge-information-card-writting-title");
                                create('span', message_div,conge_V2['message'], "conge-information-card-writting");
                            }
                        );
                    }

                })

                // En cas de click sur le bouton Refuser
                button_denied_conge.addEventListener('click', () => {

                    // Récupération des valeurs saisies
                    id_answer = document.getElementById("answer_modif");

                    // Mise à jour de la demande congé
                    axios.get("./src/requests/d_Conge.php", { params: { function: "updateHolidayByAnswer", id_valid: identity_connect['id'], reason: id_answer.value, id_conge: conge['id'], verif: "Denied" ,id_employee: identity_connect['id']} }).then(
                    response => {
                        conge_V2 = response.data;
                        
                        // Selections des divs information congé
                        let conge_info_card = document.querySelector(".conge-information-card");

                        // Suppression des informations du congé
                        while (conge_info_card.firstChild) {
                            conge_info_card.removeChild(conge_info_card.firstChild);
                        }

                        // Titre de la partie information congé
                        create('div', conge_info_card, "Information", "conge-information-card-title");

                        // Datetime de début de congé 
                        let time_start_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        time_start_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', time_start_div, "Date début de congé :", "conge-information-card-writting-title");
                        create('span', time_start_div, " le " + convertSQLDateToJS(conge_V2['time_start']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                        create('span', time_start_div, " à " + convertSQLDateToJS(conge_V2['time_start']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['time_start']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                        // Datetime de fin de congé
                        let time_end_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        time_end_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', time_end_div, "Date fin de congé :", "conge-information-card-writting-title");
                        create('span', time_end_div, " le " + convertSQLDateToJS(conge_V2['time_end']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                        create('span', time_end_div, " à " + convertSQLDateToJS(conge_V2['time_end']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['time_end']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                        // Datetime de début de création 
                        let creation_date_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        creation_date_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', creation_date_div, "Date début de création :", "conge-information-card-writting-title");
                        create('span', creation_date_div, " le " + convertSQLDateToJS(conge_V2['creation_date']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                        create('span', creation_date_div, " à " + convertSQLDateToJS(conge_V2['creation_date']).getHours().toString().padStart(2, '0') + "h" + convertSQLDateToJS(conge_V2['creation_date']).getMinutes().toString().padStart(2, '0'), "conge-information-card-writting");

                        // Datetime dernière modification
                        let last_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', last_modif_div, "Date dernière modification :", "conge-information-card-writting-title");
                        create('span', last_modif_div, " le " + convertSQLDateToJS(conge_V2['last_modif']).toLocaleDateString("fr-FR"), "conge-information-card-writting");
                        create('span', last_modif_div, " à " + convertSQLDateToJS(conge_V2['last_modif']).getHours().toString().padStart(2, '0')  + "h" + convertSQLDateToJS(conge_V2['last_modif']).getMinutes().toString().padStart(2, '0') , "conge-information-card-writting");

                        // La personne de la dernière modification
                        let id_last_modif_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        id_last_modif_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', id_last_modif_div, "Mise à jour par :", "conge-information-card-writting-title");
                        create('span', id_last_modif_div,identity_connect['firstname']+ " " + identity_connect['lastname'], "conge-information-card-writting");
                    

                        // Justification
                        let message_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        message_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', message_div, "Justification :", "conge-information-card-writting-title");
                        create('span', message_div, conge_V2['message'], "conge-information-card-writting");

                        // Réponse du responsable
                        let answer_div = create('div', conge_info_card, "", "conge-information-card-writting-pack");
                        answer_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                        create('span', answer_div, "Réponse du responsable :", "conge-information-card-writting-title");
                        create('span', answer_div, conge_V2['answer'], "conge-information-card-writting");
                        
                        create('span', conge_info_card, "Refusée par " + identity_connect['firstname'] + " " + identity_connect['lastname'], "conge-information-card-writting-denied");
                        
                        // Réactualisation des listes des données
                        // Si la liste est tous
                        if (road_conge == "All"){
                            // Récupération des données pour la liste tous mise à jour
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidays"} }).then(
                                response => {
                                    let data = response.data;

                                    // Liste container
                                    let conge_list_container = document.querySelector(".conge-list-container");

                                    // Suppression des données de la liste
                                    while (conge_list_container.firstChild) {
                                        conge_list_container.removeChild(conge_list_container.firstChild);
                                    }
                                    
                                    // Complétation des données dans la liste
                                    if (data.length > 0) {
                                        data = Array.from(data);
                                        data.forEach(conge => {
                                            let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                            if (conge["status"] == "Approved")
                                            {
                                                create('div', conge_div, "", "conge-list-elt-round-approved")
                                                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                create('div',conge_div, str_conge)
                                            } else if (conge["status"] == "Pending")
                                            {
                                                create('div', conge_div, "", "conge-list-elt-round-pending")
                                                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                create('div',conge_div, str_conge)
                                            }else{
                                                create('div', conge_div, "", "conge-list-elt-round-denied")
                                                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                create('div',conge_div, str_conge)
                                            }
                                            conge_div.addEventListener('click', () => {
                                                setDisplayedConge(conge,road_conge);
                                            })
                                
                                        })
                                    }
                                })
                        } else {
                            // Récupération des données pour la liste tous mise à jour
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromStatus", status : road_conge} }).then(
                                response => {
                                    let data = response.data;

                                    // Liste container
                                    let conge_list_container = document.querySelector(".conge-list-container");

                                    // Suppression des données de la liste
                                    while (conge_list_container.firstChild) {
                                        conge_list_container.removeChild(conge_list_container.firstChild);
                                    }
                                    
                                    // Complétation des données dans la liste
                                    if (data.length > 0) {
                                        data = Array.from(data);
                                        data.forEach(conge => {
                                            let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                            if (conge["status"] == "Approved")
                                            {
                                                create('div', conge_div, "", "conge-list-elt-round-approved")
                                                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                create('div',conge_div, str_conge)
                                            } else if (conge["status"] == "Pending")
                                            {
                                                create('div', conge_div, "", "conge-list-elt-round-pending")
                                                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                create('div',conge_div, str_conge)
                                            }else{
                                                create('div', conge_div, "", "conge-list-elt-round-denied")
                                                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                create('div',conge_div, str_conge)
                                            }
                                            conge_div.addEventListener('click', () => {
                                                setDisplayedConge(conge,road_conge);
                                            })
                                
                                        })
                                    }
                                })

                        }
                   });

                })
            } else {
                // Demande en attente pour les non-responsables
                create('span', conge_info_card, "En attente ... ", "conge-information-card-writting-pending");

            }
        }



    }
}

// Liste container dont on complète les trucs dans la liste
function displayData(data,road_conge) {
    let conge_list_container = document.querySelector(".conge-list-container");
    if (data.length > 0) {
        console.log(data);
        data.forEach(conge => {
            let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
            if (conge["status"] == "Approved")
            {
                create('div', conge_div, "", "conge-list-elt-round-approved")
                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                create('div',conge_div, str_conge)
            } else if (conge["status"] == "Pending")
            {
                create('div', conge_div, "", "conge-list-elt-round-pending")
                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                create('div',conge_div, str_conge)
            }else{
                create('div', conge_div, "", "conge-list-elt-round-denied")
                let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                create('div',conge_div, str_conge)
            }
            conge_div.addEventListener('click', () => {
                setDisplayedConge(conge,road_conge);
            })

        })
    }




}




(async () => {
    // Route pour bien savoir ou on est dont 4 voies (tous, approuvé, refusé, en attente)
    var road_conge = "All";

    // Recupération de la carte d'identité de la personne qui connecte
    await axios.get("./src/requests/d_Conge.php", { params: { function: "getEmployeeFromId", id_employee: user_id } }).then(
        response => {
            user_card = response.data;

            // Si la personne est un responsable
            if (user_card["name"] == "Gouvernance")
            {
                axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidays" } }).then(
                    response => {
                        conge_data = response.data;
                        displayData(conge_data,road_conge);

                        
                        // Recupération des boutons
                        let conge_navbar_all = document.querySelector(".conge-navbar-container-all");
                        let conge_navbar_approved = document.querySelector(".conge-navbar-container-approved");
                        let conge_navbar_pending = document.querySelector(".conge-navbar-container-pending");
                        let conge_navbar_denied = document.querySelector(".conge-navbar-container-denied");

                        // Si le bouton tous a été cliqué
                        conge_navbar_all.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");

                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }
                            
                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidays" } }).then(
                                response => {
                                    road_conge = "All";
                                    conge_data = response.data;
                                    displayData(conge_data,road_conge);
                                })
                        })

                        // si le bouton Validé a été cliqué
                        conge_navbar_approved.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");

                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }
                            
                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromStatus", status: "Approved" } }).then(
                                response => {
                                    road_conge = "Approved";
                                    conge_data = response.data;
                                    displayData(conge_data,road_conge);
                                })
                        })

                        // si le bouton En attente a été cliqué
                        conge_navbar_pending.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");

                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }
                            
                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromStatus", status: "Pending" } }).then(
                                response => {
                                    road_conge = "Pending";
                                    conge_data = response.data;
                                    displayData(conge_data,road_conge);
                                })
                        })

                        // si le bouton Refusée a été cliqué
                        conge_navbar_denied.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");

                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }
                            
                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromStatus", status: "Denied" } }).then(
                                response => {
                                    road_conge = "Denied";
                                    conge_data = response.data;
                                    displayData(conge_data,road_conge);
                                })
                        })

                    });


            // Si la personne n'est pas responsable
            }else{
                axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployee", id_employee: user_id } }).then(
                    response => {
                        conge_data = response.data;
                        displayData(conge_data);



                        // Recupération des boutons
                        let conge_navbar_all = document.querySelector(".conge-navbar-container-all");
                        let conge_navbar_approved = document.querySelector(".conge-navbar-container-approved");
                        let conge_navbar_pending = document.querySelector(".conge-navbar-container-pending");
                        let conge_navbar_denied = document.querySelector(".conge-navbar-container-denied");

                        // Si le bouton tous a été cliqué
                        conge_navbar_all.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");


                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }

                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployee", id_employee: user_id} }).then(
                            response => {
                                road_conge = "All";
                                conge_data = response.data;
                                displayData(conge_data,road_conge);
                                })
                        })

                        // si le bouton Validée a été cliqué
                        conge_navbar_approved.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");

                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }

                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployeeStatus", id_employee: user_id, status: "Approved"} }).then(
                            response => {
                                road_conge = "Approved";
                                conge_data = response.data;
                                displayData(conge_data,road_conge);
                                })
                        })

                        // si le bouton En attente a été cliqué
                        conge_navbar_pending.addEventListener("click",()=>{
                            // La liste des congés précédente
                            let conge_list_container = document.querySelector(".conge-list-container");
                           

                            // Suppression des données de la liste
                            while (conge_list_container.firstChild) {
                                conge_list_container.removeChild(conge_list_container.firstChild);
                            }
    
                            // Ajout des données dans la liste
                            axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployeeStatus", id_employee: user_id, status: "Pending"} }).then(
                            response => {
                                road_conge = "Pending";
                                conge_data = response.data;
                                displayData(conge_data,road_conge);
                                })
                            })

                        // si le bouton Refusée a été cliqué
                        conge_navbar_denied.addEventListener("click",()=>{
                        // La liste des congés précédente
                        let conge_list_container = document.querySelector(".conge-list-container");
                        
                        // Suppression des données de la liste
                        while (conge_list_container.firstChild) {
                            conge_list_container.removeChild(conge_list_container.firstChild);
                        }
                        

                        // Ajout des données dans la liste
                        axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployeeStatus", id_employee: user_id, status: "Denied"} }).then(
                        response => {
                            road_conge = "Denied";
                            conge_data = response.data;
                            displayData(conge_data,road_conge);
                            })
                        })


                    });

            }
                // Bouton ajout congé
                let button_add_conge = document.querySelector(".conge-add");

                button_add_conge.addEventListener("click", ()=>
                {

                    // Page de formulaire de congé
                    let conge_main_container_div = document.querySelector(".conge-main-container");
                    let conge_add_div_blur = create('div', conge_main_container_div, "", "conge-add-background");
                    let conge_add_div = create('div', conge_add_div_blur, "", "conge-add-pack");

                    // Titre
                    create('div',conge_add_div,"Formulaire demande de congé","conge-title-container");

                    // Date début congé pour ajout
                    let time_start_add_div = create('div', conge_add_div, "", "conge-information-card-writting-pack");
                    time_start_add_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                    create('span', time_start_add_div, "Date de début :", "conge-information-card-writting-title");
                    var time_start_add_input = document.createElement("input");
                    time_start_add_input.className = "conge-add-datetime";
                    time_start_add_input.type = "datetime-local";
                    time_start_add_input.id = "time_start_add";
                    time_start_add_input.name = "time_start_add";
                    time_start_add_div.appendChild(time_start_add_input);

                    // Date fin congé pour ajout
                    let time_end_add_div = create('div', conge_add_div, "", "conge-information-card-writting-pack");
                    time_end_add_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                    create('span', time_end_add_div, "Date de fin :", "conge-information-card-writting-title");
                    var time_end_add_input = document.createElement("input");
                    time_end_add_input.className = "conge-information-card-datetime";
                    time_end_add_input.type = "datetime-local";
                    time_end_add_input.id = "time_end_add";
                    time_end_add_input.name = "time_end_add";
                    time_end_add_div.appendChild(time_end_add_input);

                    // Justification pour ajout
                    let message_add_div = create('div', conge_add_div, "", "conge-information-card-writting-pack");
                    message_add_div.innerHTML = '<i class="fas fa-caret-right" style="color: #0000a0;"></i>'
                    create('span', message_add_div, "Veuillez saisir votre justification :", "conge-information-card-writting-title");
                    var message_add_input = document.createElement("input");
                    message_add_input.className = "conge-information-card-textarea";
                    message_add_input.type = "text";
                    message_add_input.id = "justification_add";
                    message_add_input.name = "justification_add";
                    conge_add_div.appendChild(message_add_input);

                    // Vérificateur de saisie 
                    let control_add_conge_div = create('div', conge_add_div, "", "conge-information-card-button-pack");

                    // Boutons ajouter ou quitter
                    let button_add_conge_pack =create('div', conge_add_div, "", "conge-information-card-button-pack");
                    let button_dont_conge = create('button', button_add_conge_pack, "Retour", "conge-information-card-button-denied");
                    let button_add_conge = create('button', button_add_conge_pack, "Envoyer", "conge-information-card-button-approved");
                    
                    // Si on click la bouton annuler
                    button_dont_conge.addEventListener('click',()=>{
                        conge_main_container_div.removeChild(conge_add_div_blur);
                    })

                    // Si on click la bouton envoyer
                    button_add_conge.addEventListener('click',()=>{

                        // Récupération des valeurs saisies 
                        id_time_start_add = document.getElementById("time_start_add");
                        id_time_end_add = document.getElementById("time_end_add");
                        id_justification_add = document.getElementById("justification_add");
                        let date_now = new Date();

                        // Effacement de la réponse du saisie
                        while (control_add_conge_div.firstChild) {
                            control_add_conge_div.removeChild(control_add_conge_div.firstChild);
                        }

                        // Correction de la valeur date qui ne correspond pas la forme de new Date()
                        let id_time_start_add_correct = new Date(id_time_start_add.value);
                        let id_time_end_add_correct = new Date(id_time_end_add.value);

                        // Vérification et activation
                        if (id_time_start_add.value == "" || id_time_end_add.value == "") {
                            // Erreur : date choisis sont vides
                            create('span', control_add_conge_div, "Vos dates choisis sont vides", "conge-information-card-writting-denied");
                        } else if (date_now > id_time_start_add_correct || date_now > id_time_end_add_correct ) {
                            // Erreur : date choisis sont fausses
                            create('span', control_add_conge_div, "Vos dates choisis sont fausses", "conge-information-card-writting-denied");
                        }else if (id_time_end_add.value < id_time_start_add.value){
                            // Erreur : date choisis sont fausses
                            create('span', control_add_conge_div, "Vos dates choisis sont fausses", "conge-information-card-writting-denied");
                        } else {
                            // Approved : tous sont correctes
                            create('span', control_add_conge_div, "Votre demande a été envoyée avec succès", "conge-information-card-writting-approved");
                            axios.get("./src/requests/d_Conge.php", { params: { function: "addConge", time_start : id_time_start_add.value, time_end : id_time_end_add.value, justification: id_justification_add.value, id_employee: user_id} }).then(
                                response => {
                                    let ok = response.data;

                                    // Rafraichissement tableau
                                    axios.get("./src/requests/d_Conge.php", { params: { function: "getEmployeeFromId", id_employee: user_id} }).then(
                                        response => {
                                            let identity_connect = response.data;
                                            if (identity_connect["name"] == "Gouvernance"){
                                                // Si la liste est tous
                                                if (road_conge == "All"){
                                                    // Récupération des données pour la liste tous mise à jour
                                                    axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidays"} }).then(
                                                        response => {
                                                            let data = response.data;

                                                            // Liste container
                                                            let conge_list_container = document.querySelector(".conge-list-container");

                                                            // Suppression des données de la liste
                                                            while (conge_list_container.firstChild) {
                                                                conge_list_container.removeChild(conge_list_container.firstChild);
                                                            }
                                                            
                                                            // Complétation des données dans la liste
                                                            if (data.length > 0) {
                                                                data = Array.from(data);
                                                                data.forEach(conge => {
                                                                    let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                                                    if (conge["status"] == "Approved")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-approved")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    } else if (conge["status"] == "Pending")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-pending")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }else{
                                                                        create('div', conge_div, "", "conge-list-elt-round-denied")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }
                                                                    conge_div.addEventListener('click', () => {
                                                                        setDisplayedConge(conge,road_conge);
                                                                    })
                                                        
                                                                })
                                                            }
                                                        })
                                                } else {
                                                    // Récupération des données pour la liste tous mise à jour
                                                    axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromStatus", status : road_conge} }).then(
                                                        response => {
                                                            let data = response.data;

                                                            // Liste container
                                                            let conge_list_container = document.querySelector(".conge-list-container");

                                                            // Suppression des données de la liste
                                                            while (conge_list_container.firstChild) {
                                                                conge_list_container.removeChild(conge_list_container.firstChild);
                                                            }
                                                            
                                                            // Complétation des données dans la liste
                                                            if (data.length > 0) {
                            
                                                                data.forEach(conge => {
                                                                    let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                                                    if (conge["status"] == "Approved")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-approved")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    } else if (conge["status"] == "Pending")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-pending")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }else{
                                                                        create('div', conge_div, "", "conge-list-elt-round-denied")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }
                                                                    conge_div.addEventListener('click', () => {
                                                                        setDisplayedConge(conge,road_conge);
                                                                    })
                                                        
                                                                })
                                                            }
                                                        })

                                                }
                                            }else {
                                                // Si la liste est tous
                                                if (road_conge == "All"){
                                                    // Récupération des données pour la liste tous mise à jour
                                                    axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployee", id_employee : user_id} }).then(
                                                        response => {
                                                            let data = response.data;

                                                            // Liste container
                                                            let conge_list_container = document.querySelector(".conge-list-container");

                                                            // Suppression des données de la liste
                                                            while (conge_list_container.firstChild) {
                                                                conge_list_container.removeChild(conge_list_container.firstChild);
                                                            }
                                                            
                                                            // Complétation des données dans la liste
                                                            if (data.length > 0) {
                                                                data = Array.from(data);
                                                                data.forEach(conge => {
                                                                    let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                                                    if (conge["status"] == "Approved")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-approved")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    } else if (conge["status"] == "Pending")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-pending")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }else{
                                                                        create('div', conge_div, "", "conge-list-elt-round-denied")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }
                                                                    conge_div.addEventListener('click', () => {
                                                                        setDisplayedConge(conge,road_conge);
                                                                    })
                                                        
                                                                })
                                                            }
                                                        })
                                                } else {
                                                    // Récupération des données pour la liste tous mise à jour
                                                    axios.get("./src/requests/d_Conge.php", { params: { function: "getAllHolidaysFromEmployeeStatus", id_employee : user_id, status : road_conge} }).then(
                                                        response => {
                                                            let data = response.data;

                                                            // Liste container
                                                            let conge_list_container = document.querySelector(".conge-list-container");

                                                            // Suppression des données de la liste
                                                            while (conge_list_container.firstChild) {
                                                                conge_list_container.removeChild(conge_list_container.firstChild);
                                                            }
                                                            
                                                            // Complétation des données dans la liste
                                                            if (data.length > 0) {
                                                                data = Array.from(data);
                                                                data.forEach(conge => {
                                                                    let conge_div = create('div', conge_list_container, "", "conge-list-elt-container")
                                                                    if (conge["status"] == "Approved")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-approved")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Validée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    } else if (conge["status"] == "Pending")
                                                                    {
                                                                        create('div', conge_div, "", "conge-list-elt-round-pending")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "En attente | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }else{
                                                                        create('div', conge_div, "", "conge-list-elt-round-denied")
                                                                        let last_date ="le "+ convertSQLDateToJS(conge["last_modif"]).toLocaleDateString("fr-FR") + " à " + convertSQLDateToJS(conge["last_modif"]).getHours().toString().padStart(2, '0') + "h"+ convertSQLDateToJS(conge["last_modif"]).getMinutes().toString().padStart(2, '0');
                                                                        let str_conge = "Refusée | " + conge["firstname"] + " " + conge["lastname"] + " | " + last_date;
                                                                        create('div',conge_div, str_conge)
                                                                    }
                                                                    conge_div.addEventListener('click', () => {
                                                                        setDisplayedConge(conge,road_conge);
                                                                    }) 
                                                        
                                                                })
                                                            }
                                                        })

                                                }
                                            }
                                        })
                            })
                        }

                    })

                })
        }
    );

})()
