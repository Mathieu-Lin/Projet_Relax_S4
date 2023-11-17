
let body = document.querySelector("body");
let main_container = create("div", body, text=null, "main-container");

//Crée une div pour chaque service
axios.get("./src/requests/d_Management.php", { params: {function : "getServices"} }).then(
    response => 
    {
        for (let service of response.data)
        {
            Create_service(service.id, service.name);
        }
    }
);

//Crée la div pour le service correspondant
function Create_service(service_number, service_name)
{
    let service_card = create("div", main_container, text=null, "service-card"); //div-card pour un service
    create("div", service_card, service_name, "div-service-name"); //div pour le nom d'un service
    let div_service_array = create("div", service_card, text=null, "div-service-array");  
    Create_employee_array(service_number, div_service_array);
}

//Crée un tableau de tout les employés d'un service
function Create_employee_array(service_number, div_service_array)
{
    //Entête du tableau
    let service_array = create("table", div_service_array, text=null, "service-array");
    let array_first_line = create("tr", service_array);
    create("th", array_first_line, text=null);
    create("th", array_first_line, "Nom");
    create("th", array_first_line, "Prénom");
    create("th", array_first_line, "Genre");
    create("th", array_first_line, "Mail");
    create("th", array_first_line, "Statut");

    //Ajoute une ligne dans le tableau pour chaque employé du service
    axios.get("./src/requests/d_Management.php", { params: { function : "getEmployeesFromService", id : service_number} })
    .then( response => {           
            for(let employee of response.data)
            {

                //Ligne du tableau
                let employee_line = create("tr", service_array);

                employee_line.addEventListener('click', function(){
                    document.location.href="./index.php?url=fiche&id="+employee.id;
                })

                //Checkbox pour selectionner un employé
                let checkbox_container = create("td", employee_line);

                //infos de l'employé
                create("td", employee_line, employee.lastname);
                create("td", employee_line, employee.firstname);
                create("td", employee_line, employee.gender);
                create("td", employee_line, employee.mail);

                //Statut
                axios.get("./src/requests/d_Management.php",  { params: { function : "getEmployeeInterventionStatus", id : employee.id} })
                .then(response => {           
                        let status;

                        //En intervention
                        if (response.data != "")
                        {
                            status = create("td", employee_line, text=null, "status-container");
                            create("div", status, text=null, "status-dot-intervention");
                            create("p", status, "En intervention");                           
                        }

                        //Pas en intervention
                        else
                        {
                            axios.get("./src/requests/d_Management.php", { params: {function : "getEmployeeWorkingStatus", id : employee.id} })
                            .then(response => {           
                                    //pas disponible
                                    if (response.data == "")
                                    {
                                        status = create("td", employee_line, text=null, "status-container");
                                        
                                        axios.get("./src/functions/get_employee_holiday_status.php?id="+employee.id).then( //A faire sauter?????
                                            response => 
                                            {    
                                                if(response.data != "")
                                                {
                                                    create("div", status, text=null, "status-dot-holiday");
                                                    create("p", status, "En Congé");
                                                }

                                                else
                                                {
                                                    create("div", status, text=null, "status-dot-unavailable");
                                                    create("p", status, "Indisponible");
                                                }
                                            }
                                        );
                                    }

                                    //Disponible
                                    else
                                    {
                                        status = create("td", employee_line, text=null, "status-container");                            
                                        create("div", status, text=null, "status-dot-working");
                                        create("p", status, "Disponible");
                                    }
                                }
                            );   
                        }
                    }
                );                                          
            }
        }
    );

}