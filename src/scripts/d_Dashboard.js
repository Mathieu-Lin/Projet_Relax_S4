
function convertDateToPositionTop(container_height, date){
    let position_px = (((date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) / 86400) * container_height)
    return ((position_px / container_height) * 100)
}

function convertIndexToPositionLeft(container_width, id){
    let index = displayed_ids.map(e => e.id).indexOf(id)
    let position_px = (container_width / displayed_ids.length) * index
    return ((position_px / container_width) * 100)
}

//------------------------------------------------------------
//------------------------------------------------------------

displayed_date = new Date();
let displayed_ids = [];

displayHourLabels();

(async() => {
    await axios.get("./src/requests/d_Main.php", { params: { function : "getEmployee", id: user_id }}).then(response => {
        displayed_ids.push(response.data[0])
    })
    await axios.get("./src/requests/is_authorized.php")
    .then(function (response) {
        if(response.data == '1'){
            Create_employee_array();
        }
        else{
            document.querySelector(".employee-card").remove()
        }
        setDisplayedDate(displayed_date);
    })
})()




//------------------------------------------------------------
//------------------------------------------------------------
//Crée un tableau de tout les employés

//Crée un tableau de tout les employés
function Create_employee_array()
{
    let current_id = user_id

    let employee_list_container = document.querySelector('.employee-card')

    let div_employee_array = create("div", employee_list_container, text=null, "div-employee-array");  

    //Entête du tableau
    let employee_array = create("table", div_employee_array, text=null, "employee-array");
    let array_first_line = create("tr", employee_array);
    let global_checkbox_container = create("th", array_first_line, text=null);
    create("th", array_first_line, "Nom");
    create("th", array_first_line, "Prénom");

    //Checkbox "selectionner tous"
    let global_checkbox = create("input", global_checkbox_container, text=null);
    global_checkbox.setAttribute("type", "checkbox");     
    global_checkbox.onclick = function() { Toggle_checkboxes(global_checkbox, ".employee-checkbox");}   

    global_checkbox.addEventListener('change', function() {
        if(global_checkbox.checked){
            displayed_ids = []
            axios.get("./src/requests/d_Main.php", { params: { function : "getAllEmployees" }}).then(
                response => 
                {
                    for(let employee of response.data)
                    {
                        displayed_ids.push(employee)
                        displayed_ids.sort(function(a, b){return a.id - b.id});
                    }
                    updateTimetable()
                })   
        }
        else{
            displayed_ids = []
            updateTimetable()
        }
    })

    //Ajoute une ligne dans le tableau pour chaque employé
    axios.get("./src/requests/d_Main.php", { params: { function : "getAllEmployees" }}).then(
        response => 
        {           
            for(let employee of response.data)
            {
                
                //Ligne du tableau
                let employee_line = create("tr", employee_array);

                //Checkbox pour selectionner un employé
                let checkbox_container = create("td", employee_line);
                let employee_checkbox = create("input", checkbox_container, text=null, "employee-checkbox", employee.id);
                employee_checkbox.setAttribute("type", "checkbox");

                if(employee.id == current_id){
                    employee_checkbox.checked = true
                }

                employee_checkbox.addEventListener('change', function() {
                    if(employee_checkbox.checked){
                        displayed_ids.push(employee)
                        displayed_ids.sort(function(a, b){return a.id - b.id});
                    }
                    else{
                        let index = displayed_ids.map(e => e.id).indexOf(employee.id);
                        if (index > -1) {
                            displayed_ids.splice(index, 1);
                        }
                        displayed_ids.sort(function(a, b){return a.id - b.id});
                    }
                    updateTimetable()
                })

                //infos de l'employé
                create("td", employee_line, employee.lastname);
                create("td", employee_line, employee.firstname);                                       
            }
        }
    );
}


//Place l'ensemble des checkboxes au même état que la checkbox passée en paramètre
function Toggle_checkboxes(source, classname) 
{
    let checkboxes = document.querySelectorAll(classname);

    for(let checkbox of checkboxes) 
    {
        checkbox.checked = source.checked;
    }
}

//------------------------------------------------------------
//------------------------------------------------------------

// Modify displayed date and updates the UI.
function setDisplayedDate(date){
    displayed_week = getDisplayedWeek(date)
    displayDate(displayed_week[0])
    if(displayed_ids.length > 0){
        displayPeriods(displayed_week)
        displayInterventions(displayed_week)
        displayInitials()
    }
}


// returns the first and lastday of the week in SQL Format 
function getDisplayedWeek(date){
    temp = new Date(date)

    let firstday = new Date(temp.setDate(temp.getDate() - temp.getDay() + 1))
    let lastday = new Date(temp.setDate(firstday.getDate() + 6))

    firstday.setHours(0,0,0,0)
    lastday.setHours(23,59,59,999)
    return [firstday, lastday];
}

//Display table header, with dates.
function displayDate(date){
    temp_date = new Date(date);

    let days_of_week_container = document.querySelectorAll(".week-day");
    days_of_week_container.forEach(day => {

        day_name = temp_date.toLocaleDateString("fr-FR", { weekday: 'long' });
        day_date_numeric = temp_date.toLocaleDateString("fr-FR");

        let day_childs = day.children;
        day_childs[0].textContent = day_name.charAt(0).toUpperCase() + day_name.slice(1) //span class="day"
        day_childs[1].textContent = day_date_numeric //span class="date"

        temp_date = new Date(temp_date.setDate(temp_date.getDate() + 1));
    })
}

function displayInitials(){
    let days_of_week_container = document.querySelectorAll(".day-container");

    if(displayed_ids.length > 0){
        displayed_ids.forEach(employee => {
            days_of_week_container.forEach(day => {
                initials_node = create('span', day, employee["firstname"].charAt(0) + employee["lastname"].charAt(0), "initials-node")
                initials_node.style.left = convertIndexToPositionLeft(day.offsetWidth, employee.id) + '%'
                initials_node.style.width = (((day.offsetWidth / displayed_ids.length) / day.offsetWidth) * 100) + '%'
            })
        })
    }
}

function translateType(input){
    let res;
    switch (input) {
        case "Working":
          res = "Travaille";
          break;
        case "Meeting":
          res = "Réunion";
          break;
        case "Holiday":
          res = "Congé";
          break;
        default:
          res = "Inconnu";
      }
    return res
}

function displayModalIntervention(intervention_div, intervention_data){
    let body = document.querySelector('body')
    let modal_container = create('div', body, null, "modal-container")
    modal_container.classList.add("Intervention")

    create('h4', modal_container, "Intervention", "modal-title")
    create('h5', modal_container, "-- Lieu --", "modal-date")
    create('p', modal_container, intervention_data["floor"] + intervention_data["number"], "modal-room")
    create('h5', modal_container, "-- Description --", "modal-date")
    create('p', modal_container, intervention_data["description"], "modal-desc")
    create('h5', modal_container, "-- Début --", "modal-date")
    create('p', modal_container, convertSQLDateToJS(intervention_data["time_start"]).toLocaleString('fr-FR'), "modal-date")
    create('h5', modal_container, "-- Fin --", "modal-date")
    create('p', modal_container, convertSQLDateToJS(intervention_data["time_end"]).toLocaleString('fr-FR'), "modal-date")
    create('h5', modal_container, "-- Dernière Modification --", "modal-date")
    create('p', modal_container, intervention_data["lastname_modif"] + " " + intervention_data["firstname_modif"], "modal-modif")
    create('p', modal_container, intervention_data["last_modif"], "modal-modif")

    intervention_div.addEventListener('mouseenter', function() {
        modal_container.style.display = "flex";
    })

    intervention_div.addEventListener('mousemove', e => {
        if(e.clientX + 10 + modal_container.offsetWidth > window.innerWidth){
            modal_container.style.left = (e.clientX + 10 - modal_container.offsetWidth) + 'px'
            modal_container.style.top = e.clientY + 10 + 'px'
        }
        else{
            modal_container.style.left = e.clientX + 10 + 'px'
            modal_container.style.top = e.clientY + 10 + 'px'
        }
    })

    intervention_div.addEventListener('mouseleave', function() {
        modal_container.style.display = "none";
    })
}

function displayModalPeriod(period_div, period_data){
    let body = document.querySelector('body')
    let modal_container = create('div', body, null, "modal-container")
    modal_container.classList.add(period_data["type"])

    create('h4', modal_container, translateType(period_data["type"]), "modal-title")
    create('h5', modal_container, "-- Début --", "modal-date")
    create('p', modal_container, convertSQLDateToJS(period_data["time_start"]).toLocaleString('fr-FR'), "modal-date")
    create('h5', modal_container, "-- Fin --", "modal-date")
    create('p', modal_container, convertSQLDateToJS(period_data["time_end"]).toLocaleString('fr-FR'), "modal-date")

    period_div.addEventListener('mouseenter', function() {
        modal_container.style.display = "flex";
    })

    period_div.addEventListener('mousemove', e => {
        if(e.clientX + 10 + modal_container.offsetWidth > window.innerWidth){
            modal_container.style.left = (e.clientX + 10 - modal_container.offsetWidth) + 'px'
            modal_container.style.top = e.clientY + 10 + 'px'
        }
        else{
            modal_container.style.left = e.clientX + 10 + 'px'
            modal_container.style.top = e.clientY + 10 + 'px'
        }
    })

    period_div.addEventListener('mouseleave', function() {
        modal_container.style.display = "none";
    })
}


//Display vertical header, hour information.
function displayHourLabels(){
    let hour_column = document.querySelector(".hour-label-container");

    create('span', hour_column, "", "hour-indicator")

    for(let hour=1; hour<=23; hour++){
        create('span', hour_column, hour < 10 ? "0" + hour + ":00" : hour + ":00", "hour-indicator")
    }

    create('span', hour_column, "", "hour-indicator")
}


//Extracts and returns a string of the hours of a javascript date.
function extractHourFromDate(date){
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

//retrieve periods from database for a given week
async function getPeriods(displayed_week){
    let periods = []

    await axios.get("./src/requests/d_Dashboard.php", { params: { function : "getPeriodsForEmployees", time_start: convertJSDateToSQL(displayed_week[0]), time_end : convertJSDateToSQL(displayed_week[1]), id: displayed_ids.map(e => e.id).toString() } })
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
async function getInterventions(displayed_week){
    let interventions = []

    await axios.get("./src/requests/d_Dashboard.php", { params: { function : "getInterventionsForEmployees", time_start: displayed_week[0], time_end : displayed_week[1], id: displayed_ids.map(e => e.id).toString()  } })
    .then(function (response) {
        if(response.data != ""){
            (response.data).forEach(period => {
                interventions.push(period)
            });
        } 
    })

    return interventions;
}


//Cleans all the displayed periods.
function clearTimetable(){
    let elements = document.querySelectorAll(".working, .holiday, .meeting, .intervention, .initials-node, .modal-container");
    if(elements.length > 0){
        elements.forEach(element => {
            element.remove();
        })
    } 
}

function dateToHourText(date){
    let res = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
    + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
    + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
    return res
}

//Display all the periods associated to one week.
async function displayInterventions(displayed_week){
    let interventions = await getInterventions(displayed_week);

    let days_of_week_container = document.querySelectorAll(".day-container");

    interventions.forEach(element => {
        let time_start = convertSQLDateToJS(element["time_start"]);
        let time_end = convertSQLDateToJS(element["time_end"]);
        let daily_periods = dailyPeriods(time_start, time_end, displayed_week)

        daily_periods.forEach(daily_period => {
            let container = days_of_week_container[daily_period[0].getDay() == 0 ? 6 : daily_period[0].getDay() - 1];
            let period_div = create('div', container,  null, "intervention")

            period_dates = create('div', period_div)

            //Add action listener
            let container_height = container.offsetHeight
            period_div_top = convertDateToPositionTop(container_height, daily_period[0])

            period_div_height = convertDateToPositionTop(container_height, daily_period[1]) - convertDateToPositionTop(container_height, daily_period[0]) 

            period_div.style.top = period_div_top + '%';
            period_div.style.height = period_div_height + '%';

            period_div.style.left = convertIndexToPositionLeft(container.offsetWidth, element[2]) + '%'
            period_div.style.width = (((container.offsetWidth / displayed_ids.length) / container.offsetWidth) * 100) + '%'
            
            displayModalIntervention(period_div, element)
        })
    });
}

//If a period is extended to multiple days, returns an array with all the periods for each day to display.
function dailyPeriods(date_start, date_stop, displayed_week){
    let periods = [];
    let temp = new Date(date_start);
    let new_day = false;

    if(date_start.getDate() != date_stop.getDate()){
        while(!((temp.getDay() == date_stop.getDay()) && (temp.getMonth() == date_stop.getMonth()) && (temp.getFullYear() == date_stop.getFullYear()))){
            if(!new_day){
                if(temp >= displayed_week[0] && temp <= displayed_week[1]){
                    periods.push(new Array(new Date(date_start), new Date(temp.setHours(23,59,59,999))))
                    new_day = true
                }
            }
            else{
                if(temp >= displayed_week[0] && temp <= displayed_week[1]){
                    periods.push(new Array(new Date(temp.setHours(0,0,0,0)), new Date(temp.setHours(23,59,59,999))))
                }
            }
            temp.setDate(temp.getDate() + 1)
        }
        temp.setHours(0,0,0,0) 
    }

    if(temp >= displayed_week[0] && temp <= displayed_week[1]){
        periods.push(new Array(temp, date_stop))
    }
    return periods;
}

//Display all the periods associated to one week.
async function displayPeriods(displayed_week){

    let periods = await getPeriods(displayed_week);

    let days_of_week_container = document.querySelectorAll(".day-container");

    periods.forEach(element => {
        let time_start = convertSQLDateToJS(element["time_start"]);
        let time_end = convertSQLDateToJS(element["time_end"]);
        let daily_periods = dailyPeriods(time_start, time_end, displayed_week)

        daily_periods.forEach(daily_period => {
            let container = days_of_week_container[daily_period[0].getDay() == 0 ? 6 : daily_period[0].getDay() - 1];

            let period_div
            if(element["type"] == "Holiday"){
                period_div = create('div', container,  null, "holiday")
            }
            else if(element["type"] == "Meeting"){
                period_div = create('div', container,  null, "meeting")
            }
            else{
                period_div = create('div', container,  null, "working")
            }
            

            let container_height = container.offsetHeight
            period_div_top = convertDateToPositionTop(container_height, daily_period[0])

            period_div_height = convertDateToPositionTop(container_height, daily_period[1]) - convertDateToPositionTop(container_height, daily_period[0]) 

            period_div.style.top = period_div_top + '%';
            period_div.style.height = period_div_height + '%';

            period_div.style.left = convertIndexToPositionLeft(container.offsetWidth, element["id_employee"]) + '%'
            period_div.style.width = (((container.offsetWidth / displayed_ids.length) / container.offsetWidth) * 100) + '%'

            displayModalPeriod(period_div, element)
        })

    });
}


//------------------------------------------------------------
//------------------------------------------------------------

function handleWeekChangerBtn(event){
    clearTimetable();
    if(event == 0){
        setDisplayedDate(new Date());
    }
    else{
        setDisplayedDate(new Date(displayed_date.setDate(displayed_date.getDate()  + (7 * event))));
    }
}

function updateTimetable(){
    clearTimetable();
    setDisplayedDate(new Date(displayed_date));
}

//------------------------------------------------------------
//------------------------------------------------------------

let l_arrow = document.querySelector(".l_arr");
let r_arrow = document.querySelector(".r_arr");
let t_btn = document.querySelector(".t_btn");

l_arrow.addEventListener('click', () => {
    handleWeekChangerBtn(-1);
});

r_arrow.addEventListener('click', () => {
    handleWeekChangerBtn(1);
});

t_btn.addEventListener('click', () => {
    handleWeekChangerBtn(0);
});
