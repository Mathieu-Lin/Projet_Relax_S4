let body = document.querySelector("body");

//Crée une div pour chaque service
axios.post("./src/requests/get_employee_profile.php", {
    id: displayed_fiche
}).then(
    response =>{
        display(response.data[0]);
    }
);

let profile = document.querySelector(".profile");
let formulaire = document.querySelector(".formulaire");

function display(infos){
    //PROFILE
    //create("h2", profile, infos['lastname']);
    let bSupprimer = create("button", profile, "Supprimer employé(e)", "btn");
    bSupprimer.style.margin = "0 5px";
    let modifier = create("button", profile, "Modifier profile","btn","modify");


    //Les infos personnelles
    let infosPerso = create("div", profile, null,"infos-perso");
    create("h2", infosPerso, "Informations personnelles");
    let ul1 = create("ul", infosPerso);
    create("li", ul1, "Nom : "+infos['lastname']);
    create("li", ul1, "Prénom : "+infos['firstname']);
    create("li", ul1, "Genre : "+infos['gender']);
    create("li", ul1, "Email : "+infos['mail']);
    create("li", ul1, "Login : "+infos['login']);
    create("li", ul1, "Téléphone : "+infos['phone']);
    create("li", ul1, "Date : "+infos['birth_date']);
    create("li", ul1, "Service : "+infos['name']);

    //L'adress
    let adress = create("div", profile, null,"adress");
    create("h2", adress, "Adresse");
    let ul2 = create("ul", adress);
    create("li", ul2, "Numéro : "+infos.number);
    create("li", ul2, "Rue : "+infos.street);
    create("li", ul2, "Code postal : "+infos.zip_code);
    create("li", ul2, "Ville : "+infos.city);
    create("li", ul2, "Pays : "+infos.country);

    modifier.addEventListener('click', function(){
            profile.style.display = "none";
            formulaire.style.display = "block";
    })

    //FORMULAIRE
    create("h2", formulaire, "Modifier profile");
    let a = create("a", formulaire, "Retour","btn");
    a.href = "fiche?id="+infos.id;

    let form = create("form", formulaire);

    create("label", form, "Nom");
    let nom = create("input", form);
    nom.type="text";
    nom.value = infos.lastname;
    nom.name = "name";

    create("label", form, "Prénom");
    let prenom = create("input", form);
    prenom.type="text";
    prenom.value = infos.firstname;
    prenom.name = "firstname";

    create("label", form, "Genre");
    let genre = create("select", form);
    genre.value = infos.gender;
    genre.name = "gender";
    let masculin = create("option", genre, "Male");
    masculin.value = "Male";
    let feminin = create("option", genre, "Female");
    feminin.value = "Female";

    create("label", form, "Email");
    let email = create("input", form);
    email.type="email";
    email.value = infos.mail;
    email.name = "mail";

    create("label", form, "Login");
    let log = create("input", form);
    log.type="text";
    log.value = infos.login;
    log.name = "login";

    create("label", form, "Téléphone");
    let phone_number = create("input", form);
    phone_number.type="tel";
    phone_number.value = infos.phone;
    phone_number.name = "phone";

    create("label", form, "Date");
    let date_naiss = create("input", form);
    date_naiss.type="date";
    date_naiss.value = infos.birth_date;
    date_naiss.name = "birth_date";

    create("label", form, "Service");
    let services = create("select", form);
    services.value = infos.name;
    services.name = "service";
    let conciergerie = create("option", services, "Conciergerie");
    conciergerie.value = "2";
    let entretient = create("option", services, "Entretient");
    entretient.value = "3";
    let gouvernance = create("option", services, "Gouvernance");
    gouvernance.value = "1";
    
    create("label", form, "Numéro");
    let numero = create("input", form);
    numero.type="number";
    numero.value = infos.number;
    numero.name = "number";

    create("label", form, "Rue");
    let rue = create("input", form);
    rue.type="text";
    rue.value = infos.street;
    rue.name = "street";

    create("label", form, "Code postal");
    let code_postal = create("input", form);
    code_postal.type="number";
    code_postal.value = infos.zip_code;
    code_postal.name = "zip-code";

    create("label", form, "Ville");
    let ville = create("input", form);
    ville.type="text";
    ville.value = infos.city;
    ville.name = "city";

    create("label", form, "Pays");
    let pays = create("input", form);
    pays.type="text";
    pays.value = infos.country;
    pays.name = "country";
    
    let bEnvoyer = create("input", form);
    bEnvoyer.type="submit";
    bEnvoyer.name ="btn";
    bEnvoyer.value="Envoyer";
    bEnvoyer.addEventListener('click', function(){
        modify_profile(infos);
    })
    
    bSupprimer.addEventListener('click', function(){
        delete_employee(infos);
    })
}

async function modify_profile(infos){

    await axios.post('./src/requests/set_profile.php', {
        id : infos[0],
        name : document.querySelector('input[name=name]').value,
        firstname : document.querySelector('input[name=firstname]').value,
        gender : document.querySelector('select[name=gender]').value,
        mail : document.querySelector('input[name=mail]').value,
        login : document.querySelector('input[name=login]').value,
        phone : document.querySelector('input[name=phone]').value,
        birth_date : document.querySelector('input[name=birth_date]').value,
        service : document.querySelector('select[name=service]').value,
        number : document.querySelector('input[name=number]').value,
        street : document.querySelector('input[name=street]').value,
        zip_code : document.querySelector('input[name=zip-code]').value,
        city : document.querySelector('input[name=city]').value,
        country : document.querySelector('input[name=country]').value,
        id_service : infos['id_service'],
        id_address : infos['id_address']
    })
    .then(function (response) {
        console.log(response.data);
        if(response.data['type'] == false){
            if(response.data['commentaire'] != null){
                createToast(0, "Erreur", response.data['commentaire'] );
            }
        }
        else{
            if(response.data['commentaire'] != null){
                createToast(1, "Confirmation", response.data['commentaire'] );
            }
            location.reload();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function delete_employee(infos){
    await axios.post('./src/requests/delete_employee.php', {
        id : infos[0],
        id_address : infos['id_address']
    })
    .then(function (response) {
        console.log(response.data);
        if(response.data['type'] == false){
            if(response.data['commentaire'] != null){
                createToast(0, "Erreur", response.data['commentaire'] );
            }
        }
        else{
            createToast(1, "Confirmation", response.data['commentaire'] );
            document.location.href="./index.php?url=management";
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}