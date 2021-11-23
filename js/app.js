// Seleccionar el elemento
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Clases
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item del localstorage
let data = localStorage.getItem("TODO");

// que DATA no este vacío
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //setea el id al último de la list
    loadList(LIST); //cargar lista a interfaz de usuario
}else{
    // si DATA no está vacío
    LIST = [];
    id = 0;
}

//cargar items a la interfaz de usuario
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// borrar el localStorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Fecha
const options = {weekday: "long", month: "short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("es-ES", options);

// Función para agregar tareas
function addToDo(ToDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${ToDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                 `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Agregar elemento al presionar enter
document.addEventListener("keyup", function(e){
    if(e.keyCode == 13) {
        const ToDo = input.value;
    // si input no está vacío
    if(ToDo){
        addToDo(ToDo, id, false, false);

        LIST.push({
            name : ToDo,
            id : id,
            done : false,
            trash : false
        });

        // agregar item al localstorage (en cada lugar donde se actualiza la LIST array)
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = " ";
    }
});

//PRUEBAS: addToDo("Café", 1, false, false);
//addToDo("Tomar Café", 1, false, true);

//Funcion para completar tareas
function completeToDo(e){
    e.classList.toggle(CHECK);
    e.classList.toggle(UNCHECK);
    e.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[e.id].done = LIST[e.id].done ? false : true;
}

// Elimanar To Do
function borrarToDo(e){
    e.parentNode.parentNode.removeChild(e.parentNode);

    LIST[e.id].trash = true;
}

// target los elementos creados dinámicamente
list.addEventListener("click", function(e){
    const element = e.target; // retorna el elemento clickeado dentro de la lista
    const elementJob = element.attributes.job.value; // completar o eliminar

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        borrarToDo(element);
    }
    // agregar item al localstorage (en cada lugar donde se actualiza la LIST array)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});