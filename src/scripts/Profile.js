//Récupèration des éléments
get_user();

//infos-persos
let lastname = document.querySelector('input[name=lastname]');
let firstname = document.querySelector('input[name=firstname]');
let birthdate = document.querySelector('input[name=birthdate]');
let phone_number = document.querySelector('input[name=phone-number]');
let mail = document.querySelector('input[name=mail]');

let btn_info = document.querySelector("#btn-info");
btn_info.addEventListener('click', function(){
    modify_infos_perso(lastname.value, firstname.value, birthdate.value, phone_number.value, mail.value);
})

//adresse
let number = document.querySelector('input[name=number]');
let street = document.querySelector('input[name=street]');
let zip_code = document.querySelector('input[name=zip-code]');
let city = document.querySelector('input[name=city]');
let country = document.querySelector('input[name=country]');

//mot de passe
let current_pwd = document.querySelector('input[name=current-pwd]');
let new_pwd = document.querySelector('input[name=new-pwd]');

//Permet de créer des éléments HTML
function create(tagName, container, text=null, classs=null, id=null){
    let element = document.createElement(tagName)
    container.appendChild(element)
    if(text)
        element.appendChild(document.createTextNode(text))
    if(classs)
        element.classList.add(classs)
    if(id)
        element.id = id
    return element
}

function get_user()
{
    axios.get("./src/requests/Profile.php", { params: { function : "get_user" }}).then(
        response =>{
            display(response.data[0]);
        }
    );
}

function display(infos){

    //infos personnelles
    lastname.value = infos.lastname;
    firstname.value = infos.firstname;
    birthdate.value = infos.birth_date;
    phone_number.value = infos.phone;
    mail.value = infos.mail;
    
    //adresse  
    number.value = infos.number;
    street.value = infos.street;
    zip_code.value = infos.zip_code;
    city.value = infos.city;
    country.value = infos.country;  

    let btn_address = document.querySelector("#btn-address");
    btn_address.addEventListener('click', function(){
        modify_address(number.value, street.value, zip_code.value, city.value, country.value, infos.id_address);
    })

    let btn_password = document.querySelector("#btn-password");
    btn_password.addEventListener('click', function(){
        modify_password(infos.password, current_pwd.value, new_pwd.value);
    })
}

function modify_infos_perso(lastname, firstname, birthdate, phone, mail){

    if(lastname != "" && firstname != "" && birthdate != "" && phone != "" && mail != "")
    {
        axios.get("./src/requests/Profile.php", { params : {function : "update_profile", lastname : lastname, firstname : firstname, birthdate : birthdate, phone : phone, mail : mail} }).then(
            response => 
            {
                if(response.data == "")
                {
                    createToast(1,"Confirmation","Les modifications ont été appliquées");
                }

                else
                {
                    createToast(0,"Erreur","Les modifications n'ont pas pu être appliquées");
                    get_user();
                }
            }
        );
    }

    else
    {
        createToast(0,"Erreur","veuillez renseigner toutes les informations");
        get_user();
    }
}

function modify_address(number, street, zip_code, city, country, id){

    if(number != "" && street != "" && zip_code != "" && city != "" && country != "")
    {
        axios.get("./src/requests/Profile.php", { params : {function : "update_address", number : number, street : street, zip_code : zip_code, city : city, country : country, id : id} }).then(
            response => 
            {
                if(response.data == "")
                {
                    createToast(1,"Confirmation","Les modifications ont été appliquées");
                }

                else
                {
                    createToast(0,"Erreur","Les modifications n'ont pas pu être appliquées");
                    get_user();
                }
            }
        );
    }

    else
    {
        createToast(0,"Erreur","veuillez renseigner toutes les informations");
    }
}

function modify_password(pwd, current_pwd, new_pwd){

    if(current_pwd != "" && new_pwd != "")
    {
        if(current_pwd != new_pwd)
        {
            if(pwd == current_pwd)
            {
                axios.get("./src/requests/Profile.php", { params : {function : "update_password", pwd : new_pwd} }).then(
                    response => 
                    {
                        if(response.data == "")
                        {
                            createToast(1,"Confirmation","Les modifications ont été appliquées");
                        }
        
                        else
                        {
                            createToast(0,"Erreur","Les modifications n'ont pas pu être appliquées");
                            get_user();
                        }
                    }
                );
            }

            else
            {
                createToast(0,"Erreur","Mot de passe actuel incorrect");
            }
        }

        else
        {
            createToast(0,"Erreur","Le nouveau mot de passe doit être différent de l'ancien");
        }
    }

    else
    {
        createToast(0,"Erreur","veuillez renseigner toutes les informations");
    }
}