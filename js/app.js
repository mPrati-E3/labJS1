'use strict';

// --- Functions Definitions --- //

/**
 * Function to create a single task encolsed in a <li> tag.
 * @param {*} task the task object.
 */
function createTaskNode(task) {

    //creating a <li> for the task
    const li = document.createElement('li');
    li.id = "task" + task.id;
    li.className = 'list-group-item';

    // creating a <div> (innerDiv) for the checkbox and the label
    const innerDiv = document.createElement('div');
    innerDiv.className = 'custom-control custom-checkbox';

    // creating the <checkbox> that will be inserted into the <div> (innerDiv)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "check-t" + task.id;
    checkbox.className = 'custom-control-input';
    innerDiv.appendChild(checkbox);

    // creating the <label> that will be inserted into the <div> (innerDiv)
    const descriptionLabel = document.createElement('label');
    descriptionLabel.className = 'custom-control-label'; // + ' description'
    if(task.important) descriptionLabel.className += ' important ';
    descriptionLabel.innerText = task.description;
    descriptionLabel.htmlFor = "check-t" + task.id;
    innerDiv.appendChild(descriptionLabel);

    // creating a higher <div>, I will insert in this externalDiv my innerDiv
    const externalDiv = document.createElement('div');
    externalDiv.className = 'd-flex w-100 justify-content-between';
    externalDiv.appendChild(innerDiv);

    // creating the <date> that will be inserted into the <div> (externalDiv)
    const dateText = document.createElement('small');
    dateText.innerText = task.formatDeadline();
    externalDiv.appendChild(dateText);

    // adding the sharing picture into the <div> (innerDiv)
    if (!task.private) {
        innerDiv.insertAdjacentHTML("afterend", `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
      </svg>`);
    }

    // adding the externalDiv to the <li> before returning it.
    li.appendChild(externalDiv);
    return li;
}

/**
 * Function to create the <ul></ul> list of tasks
 */
function createListTasks(tasks) {
    const listTasks = document.getElementById("list-tasks");
    for (const task of tasks) {
        const taskNode = createTaskNode(task);
        listTasks.prepend(taskNode);
    }
}

/**
 * Function to destroy the <ul></ul> list of tasks, this will just clean my table
 * and add the insert bar
 */
function clearListTasks() {
    const listTasks = document.getElementById("list-tasks");
    listTasks.innerHTML = `
        <br>
        <div class="d-flex w-100 justify-content-between">

            <label for="fid">ID:</label>
            <input type="text" id="inputId" name="fid">

            <label for="fnome">Nome:</label>
            <input type="text" id="inputName" name="fnome">

            <div class="custom-control custom-checkbox">

                <label>Important:</label>
                <input type="checkbox" id="inputImp">

                <label>Private:</label>
                <input type="checkbox" id="inputPri">

            </div>

            <label for="fdata">Data:</label>
            <input type="date" id="inputDate" name="fdata">

        </div>
    
    `;
}

/**
 * Function to manage task filtering in the web page;
 * for each page in the menu on the left, I'll filter some task in the main menu
 * @param {string}   filterId  The filter node id.
 * @param {string}   titleText The text to put in the task list content h1 header.
 * @param {function} filterFn  The function that does the filtering and returns an array of tasks.
 */
function filterTasks( filterId, titleText, filterFn ) {
    document.querySelectorAll('#left-sidebar div a ').forEach( node => node.classList.remove('active'));
    document.getElementById("filter-title").innerText = titleText;
    document.getElementById(filterId).classList.add('active');
    clearListTasks();
    createListTasks(filterFn());
}

/**
 * Function to manage task adding in the web page
 * @param {string}      id  The new task id.
 * @param {string}      nome The name of the new task.
 * @param {boolean}     imp Is this new task important?
 * @param {boolean}     pri Is this new task private?
 * @param {data}        data The date of the new task.
 * @param {listTasks}   listaPassata My task list that will be modified.
 */
function addNewTaskToVIew(id, nome, imp, pri, data, listaPassata){

    console.log(id);
    console.log(nome);
    console.log(imp);
    console.log(pri);
    console.log(data);

    const taskNuovo = new Task(id,nome,imp,pri,data);

    listaPassata.add(taskNuovo);

    return listaPassata;

}




