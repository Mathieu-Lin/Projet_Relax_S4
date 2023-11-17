
/*************************************************************************************************************** */
// function create() ==> permet de cree un element 
/*************************************************************************************************************** */
// tagName = chaine de caractère
// container = block dans le quel on veux ajouter element
// text = chaine de caractère (par defaut à null)
// class = chaine de caractère permet d'ajouter une class a l'element (par defaut à null)
// id = chaine de caractère permet d'ajouter un id a l'element (par defaut à null)
/*************************************************************************************************************** */

function create(tagName, container, text=null, classs=null, id=null) {
    let element = document.createElement(tagName)
    container.appendChild(element)
    if (text)
        element.appendChild(document.createTextNode(text))
    if (classs)
        element.classList.add(classs)
    if (id)
        element.id = id
    return element
}

function convertSQLDateToJS(date){
    return new Date(Date.parse(date.replace(/-/g, '/')));
}

function convertJSDateToSQL(date){
    temp = new Date(date - (date.getTimezoneOffset() * 60000))
    return temp.toISOString().slice(0, 19).replace('T', ' ');
}

////////////////////////// TOAST //////////////////////////

let toast_container = document.querySelector(".toast-container")

function createToast(type, header, message){
    let toast = create("div", toast_container, null, "toast-alert")
    let title = create('h5', toast, header)
    title.innerHTML = iconForType(type, title) + " " + title.innerHTML 
    create('p', toast, message)

    setTimeout(function() {
        toast.remove()
    }, 5000)
}

function iconForType(type, title){
    let res;

    switch(type){
        case 0:
            title.classList.add("rejection")
            res = '<i class="fa-solid fa-rectangle-xmark"></i>'
            break;
        case 1:
            title.classList.add("validation")
            res = '<i class="fa-solid fa-square-check"></i>'
            break;
        default:
            res = '<i class="fa-solid fa-circle-info"></i>'
    }

    return res;
}