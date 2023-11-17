
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
let displayed_room = document.querySelector(".resa-info").dataset.id;

displayHourLabels();
setDisplayedDate(displayed_date);

//------------------------------------------------------------
//------------------------------------------------------------

// Modify displayed date and updates the UI.
function setDisplayedDate(date){
    displayed_week = getDisplayedWeek(date)
    displayDate(displayed_week[0])
    displayPeriods(displayed_week)
    displayInterventions(displayed_week)
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


//Display vertical header, hour information.
function displayHourLabels(){
    let hour_column = document.querySelector(".hour-label-container");

    create('span', hour_column, "", "hour-indicator")

    for(let hour=1; hour<=23; hour++){
        create('span', hour_column, hour < 10 ? "0" + hour + ":00" : hour + ":00", "hour-indicator")
    }

    create('span', hour_column, "", "hour-indicator")
}


//retrieve periods from database for a given week
async function getPeriods(displayed_week){
    let periods = []

    await axios.get("./src/requests/d_Reservation.php", { params: { function : "getPeriodsForRoom", time_start: convertJSDateToSQL(displayed_week[0]), time_end : convertJSDateToSQL(displayed_week[1]), id_room: displayed_room} })
    .then(function (response) {
        if(response.data != ""){
            (response.data).forEach(period => {
                periods.push(period)
            });
        } 
    })
    
    console.log(periods)
    return periods;
}

//retrieve periods from database for a given week
async function getInterventions(displayed_week){
    let interventions = []

    await axios.get("./src/requests/d_Reservation.php", { params: { function : "getInterventionsForRoom", time_start: displayed_week[0], time_end : displayed_week[1], id_room: displayed_room  } })
    .then(function (response) {
        if(response.data != ""){
            (response.data).forEach(period => {
                interventions.push(period)
            });
        } 
    })

    return interventions;
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

            let period_div = create('div', container,  null, "reservation")
            
            let container_height = container.offsetHeight
            period_div_top = convertDateToPositionTop(container_height, daily_period[0])

            period_div_height = convertDateToPositionTop(container_height, daily_period[1]) - convertDateToPositionTop(container_height, daily_period[0]) 

            period_div.style.top = period_div_top + '%';
            period_div.style.height = period_div_height + '%';

            displayModalPeriod(period_div, element, "reservation")
        })

    });
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
            
            displayModalIntervention(period_div, element)
        })
    });
}

function displayModalPeriod(period_div, period_data, type){
    let body = document.querySelector('body')
    let modal_container = create('div', body, null, "modal-container")
    modal_container.classList.add(type)

    create('h4', modal_container, type, "modal-title")
    create('h5', modal_container, "-- Début --", "modal-date")
    create('p', modal_container, convertSQLDateToJS(period_data["time_start"]).toLocaleString('fr-FR'), "modal-date")
    create('h5', modal_container, "-- Fin --", "modal-date")
    create('p', modal_container, convertSQLDateToJS(period_data["time_end"]).toLocaleString('fr-FR'), "modal-date")
    create('h5', modal_container, "-- Nom --", "modal-date")
    create('p', modal_container, period_data["lastname"].toUpperCase() + " " + period_data["firstname"], "modal-name")
    create('h5', modal_container, "-- Capacité --", "modal-date")
    create('p', modal_container, "Max : " + period_data["capacity"], "modal-capacity")
    create('p', modal_container, "Adulte(s) : " + period_data["nbr_adult"], "modal-capacity")
    create('p', modal_container, "Enfant(s) : " + period_data["nbr_child"], "modal-capacity")


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


function displayModalIntervention(intervention_div, intervention_data){
    let body = document.querySelector('body')
    let modal_container = create('div', body, null, "modal-container")
    modal_container.classList.add("intervention")

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




//------------------------------------------------------------
//------------------------------------------------------------


//Cleans all the displayed periods.
function clearTimetable(){
    let elements = document.querySelectorAll(".reservation, .intervention, .modal-container");
    if(elements.length > 0){
        elements.forEach(element => {
            element.remove();
        })
    } 
}

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
