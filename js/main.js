"use strict";

// ----- Main ----- //

let modalita = "ALL";

let taskList = new TaskList();

// Spread operator (...) cannot be applied to objects.
TASKS.forEach(t => { taskList.add(new Task(...t)); });
createListTasks(taskList.filterAll());
// ---------------- //


// --- Creating Event Listeners for filters --- //
document.getElementById("filter-all").addEventListener( 'click', event => {
    filterTasks( 'filter-all', 'All', taskList.filterAll );
    modalita="ALL";
});

document.getElementById("filter-important").addEventListener( 'click', event => {
    filterTasks( 'filter-important', 'Important', taskList.filterByImportant );
    modalita="IMPORTANT";
});

document.getElementById("filter-today").addEventListener( 'click', event => {
    filterTasks( 'filter-today', 'Today', taskList.filterByToday );
    modalita="TODAY";
});

document.getElementById("filter-week").addEventListener( 'click', event => {
    filterTasks( 'filter-week', 'Next 7 Days', taskList.filterByNextWeek );
    modalita="WEEK";
});

document.getElementById("filter-private").addEventListener( 'click', event => {
    filterTasks( 'filter-private', 'Private', taskList.filterByPrivate );
    modalita="PRIVATE";
});

// event to add a new task
document.getElementById("addNewTaskButton").addEventListener( 'click', event => {

    const idInput = document.getElementById('inputId').value;

    for (const t in taskList){
        if (t.id == idInput){
            return;
        }
    }
    if (idInput == null){
        return;
    }

    const nome = document.getElementById('inputName').value;
    if (nome == null || nome == ""){
        return;
    }

    let imp = document.getElementById('inputImp');
    if (imp.checked == true){
        imp=true;
    } else {
        imp=false;
    }

    let pri = document.getElementById('inputPri');
    if (pri.checked == true){
        pri=true;
    } else {
        pri=false;
    }

    let dataInput = document.getElementById('inputDate').value;
    if (dataInput == null){
        dataInput="";
    }
    
    taskList = addNewTaskToVIew( idInput,nome,imp,pri,dataInput,taskList);

    clearListTasks();
    switch (modalita){
        case "ALL":
            createListTasks(taskList.filterAll());
            break;
        case "IMPORTANT":
            createListTasks(taskList.filterByImportant());
            break;
        case "TODAY":
            createListTasks(taskList.filterByToday());
            break;
        case "WEEK":
            createListTasks(taskList.filterByNextWeek());
            break;
        case "PRIVATE":
            createListTasks(taskList.filterByPrivate());
            break;
        default:
            break;
    }
    

});

//I do not need to launch any main function because Event Listeners will be launched by the events