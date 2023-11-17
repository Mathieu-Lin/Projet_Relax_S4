//Extracts and returns a string of the hours of a javascript date.
function extractHourFromDate(date){
        return (date.getHours() > 9 ? date.getHours() : "0" + date.getHours())  + ":" + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes())+ ":" + (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds())
}

//Montre un container
function Display_container(container_id)
{
    document.getElementById(container_id).style.display = 'flex';
}

//Cache un container
function Hide_container(container_id)
{
    document.getElementById(container_id).style.display = 'none';
}

//Inverse la visibilité des deux containers
function Invert_containers(container_id_a, container_id_b)
{
    let display_a = document.getElementById(container_id_a).style.display;
    let display_b = document.getElementById(container_id_b).style.display;

    if(display_a != 'flex')
    {
        document.getElementById(container_id_a).style.display = 'flex';
        document.getElementById(container_id_b).style.display = 'none';
    }

    if(display_b != 'flex')
    {
        document.getElementById(container_id_a).style.display = 'none';
        document.getElementById(container_id_b).style.display = 'flex';
    }
}

//Vérifie que toutes les conditions pour ajouter un créneau soient respectées
function Submit_period_form(date_start, date_end, classname, operation)
{
    //Au moins un employé est sélectionné
    if(!(displayed_ids.length > 0)){
        //A REMPLACER PAR UN POP-UP
        if(operation == "ajouter" || operation == "reunion"){
            createToast(0,"Erreur","Veuillez sélectionner un ou plusieurs employés");
        }
        else{
            createToast(0,"Erreur","Veuillez sélectionner un ou plusieurs créneaux");
        }           
    }

    //Toutes les valeurs sont renseignées
    else if(date_start != "" && date_end != ""){  
        if(date_start > date_end){ //Date de début supérieure à la date de fin   
            createToast(0,"Erreur","Vous ne pouvez pas créer un créneau avec une date de début supérieure à la date de fin"); 
        }
        else{ //On ajoute le créneau à chaque employé sélectionné
            displayed_ids.forEach(employee => {
                if(operation == "ajouter"){
                    Add_period(date_start, date_end, employee.id);
                    updateTimetable();
                }
                else if(operation == "reunion"){  
                    Add_meeting(date_start, date_end, employee.id);
                    updateTimetable();
                }
            })   
                  
        }
    }
    else{
        //A REMPLACER PAR UN POP-UP
        createToast(0,"Erreur","Veuillez saisir l'intégralité des informations");
    }           
}

//Ajoute un créneau dans la base de données
function Add_period(datetime_start, datetime_end, employee_id)
{
    axios.get("./src/requests/d_Periods.php", { params : {function : "getPeriodOverlap", time_start : datetime_start, time_end : datetime_end, id_employee : employee_id} }).then(
        response => 
        {           
            if(response.data != ""){
                createToast(0,"Erreur","L'employé n°" + employee_id + " sera déjà occupé ou en congé"); //A REMPLACER PAR UN POP-UP
            }
            else{
                axios.get("./src/requests/d_Periods.php", { params : {function : "addPeriod", time_start : datetime_start, time_end : datetime_end, id_employee : employee_id} } )
                .then(response => {           
                    if(response.data != ""){
                        createToast(0,"Erreur","Le créneau n'a pas pu être ajouté à l'employé n°"+employee_id); //A REMPLACER PAR UN POP-UP
                    }
                }
            );
            }
        }
    );    
}

//Ajoute un créneau de réunion
function Add_meeting(datetime_start, datetime_end, employee_id)
{
    axios.get("./src/requests/d_Periods.php", { params : {function : "getPeriodOverlap", time_start : datetime_start, time_end : datetime_end, id_employee : employee_id} } ).then(
        response => 
        {           
            axios.get("./src/requests/d_Periods.php", { params : {function : "addPeriodMeeting", time_start : datetime_start, time_end : datetime_end, id_employee : employee_id} } ).then(
                response => 
                {           
                    if(response.data == "")
                    {
                        createToast(1,"Confirmation","La réunion a été ajoutée à l'employé n°"+employee_id); //A REMPLACER PAR UN POP-UP
                    }

                    else
                    {
                        createToast(0,"Erreur","La réunion n'a pas pu être ajouté à l'employé n°"+employee_id); //A REMPLACER PAR UN POP-UP
                    }
                }
            );
        }
    );
}


let find_btn = document.querySelector(".find");
find_btn.addEventListener("click", () => {
    let input_date = document.querySelector("#input-date");
    let input_duration = document.querySelector("#input-duration");

    if(input_duration.value != "" && input_date.value != ""){
        findMeetingSlot(new Date(input_date.value), input_duration.value)
    } 
})

async function findMeetingSlot(day, duration){
    let working_available_periods = await periodsAvailable(day, duration)
    let available_periods = await nonOverlappedPeriods(day, duration, working_available_periods);
    displayAvailablePeriods(available_periods)
}



///// TROUVER LES PERIODES PENDANT HORAIRE DE TRAVAIL 

//retrieve periods from database for a given week
async function getMeetingPeriods(day){
    let periods = []
    temp_start = new Date(day.setHours(0,0,0,0))
    temp_end = new Date(day.setHours(23,59,59,999))

    await axios.get("./src/requests/d_Periods.php", { params: { function : "getPeriodsForEmployees", time_start: convertJSDateToSQL(temp_start), time_end : convertJSDateToSQL(temp_end), id: displayed_ids.map(e => e.id).toString() } })
    .then(function (response) {
        if(response.data != ""){
            (response.data).forEach(period => {
                periods.push(period)
            });
        } 
    })
    
    return periods;
}

//retrieve periods from database for a given week
async function getMeetingInterventions(day){
    let periods = []
    temp_start = new Date(day.setHours(0,0,0,0))
    temp_end = new Date(day.setHours(23,59,59,999))

    await axios.get("./src/requests/d_Periods.php", { params: { function : "getInterventionsForEmployees", time_start: convertJSDateToSQL(temp_start), time_end : convertJSDateToSQL(temp_end), id: displayed_ids.map(e => e.id).toString() } })
    .then(function (response) {
        if(response.data != ""){
            (response.data).forEach(period => {
                periods.push(period)
            });
        } 
    })

    return periods;
}

//retrieve periods from database for a given week
async function getMeetings(day){
    let periods = []
    temp_start = new Date(day.setHours(0,0,0,0))
    temp_end = new Date(day.setHours(23,59,59,999))

    await axios.get("./src/requests/d_Periods.php", { params: { function : "getMeetings", time_start: convertJSDateToSQL(temp_start), time_end : convertJSDateToSQL(temp_end), id: displayed_ids.map(e => e.id).toString() } })
    .then(function (response) {
        if(response.data != ""){
            (response.data).forEach(period => {
                periods.push(period)
            });
        } 
    })

    return periods;
}

//returns a boolean, if the period 1 is between one of the periods in the array.
function isBetweenPeriods(start_date1, end_date1, periods){
    valide = false;

    periods.forEach(period => {
        let start_date2 = convertSQLDateToJS(period["time_start"])
        let end_date2 = convertSQLDateToJS(period["time_end"])

        if ((start_date1 >= start_date2) && (end_date1 <= end_date2)){
            valide = true;
        }
    })

    return valide;
}

async function periodsAvailable(day, duration){
    let periods = await getMeetingPeriods(day);
    let temp_start = new Date(day.setHours(0,0,0,0))
    let temp_end = new Date(temp_start.getTime() + (duration * 60 * 1000))

    let possibilities = []
    for(let i=0; i< 1440 - duration; i+=5){
        possibilities.push(new Array(temp_start, temp_end))
        temp_start = new Date(temp_start.setMinutes(temp_start.getMinutes() + 5))
        temp_end = new Date(temp_end.setMinutes(temp_end.getMinutes() + 5))
    }

    displayed_ids.forEach(employee => {
        if(possibilities.length > 0){
            let periods_id = periods.filter(period => (period.id_employee == employee.id))
            let available = []
            possibilities.forEach(possibility => {
                if(isBetweenPeriods(possibility[0], possibility[1], periods_id)){
                    available.push(possibility)
                }
            })

            possibilities = available;
        }
    })

    return possibilities
}

//VERIFIER QUE LES CRENEAUX N'OVERLAPPENT PAS UNE TACHE

//returns a boolean, if the period 1 overlaps one of the periods in the array.
function isOverlappingInterventions(start_date1, end_date1, interventions){
    valide = false;

    interventions.forEach(intervention => {
        let start_date2 = convertSQLDateToJS(intervention["time_start"])
        let end_date2 = convertSQLDateToJS(intervention["time_end"])

        if ((start_date1 <= end_date2) && (end_date1 >= start_date2)){
            valide = true;
        }
    })

    return valide;
}


async function nonOverlappedPeriods(day, duration, periods){
    let interventions = await getMeetingInterventions(day)
    let meetings = await getMeetings(day)
    let res = [];

    periods.forEach(period => {
        if(!(isOverlappingInterventions(period[0], period[1], interventions)) && !(isOverlappingInterventions(period[0], period[1], meetings))){
            res.push(period)
        }
    })

    return res;
}

//AFFICHER LES PROPOSITIONS

function displayAvailablePeriods(periods){
    let findings_container = document.querySelector(".findings");

    while(findings_container.firstChild){
        findings_container.removeChild(findings_container.firstChild); 
    }

    if(periods.length > 0){
        periods.forEach(period => {
            let finding_card = create('div', findings_container, null, "finding-card");

            let time_start = extractHourFromDate(period[0]);
            let time_end = extractHourFromDate(period[1]);

            create('span', finding_card, time_start + " à " + time_end, "finding-data");
            let add_meeting_btn = create('button', finding_card, "Ajouter", "finding-add");

            add_meeting_btn.addEventListener('click', () => {
                displayed_ids.forEach(employee => {
                    Add_meeting(convertJSDateToSQL(period[0]), convertJSDateToSQL(period[1]), employee.id)
                })
                updateTimetable()
            })
        })
    }
    else{
        create('span', findings_container, "Pas de créneau(x) à ce jour.", "findings-warning");
    }
}