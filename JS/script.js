// alert("Hello, from script.js");

// waiting for dom to gets load
window.onload = function() {


    // we need to get the counter from local storage
    // if we don't do that, if user refresh the page then enter new task
    // the taskId will start from zero again
    // let taskIdCounter = 0; this will not work here


    // loadTodoList();

        // getting elements from dom
        const newTaskInput = document.getElementById("todo-item");
        const btnAddTask = document.getElementById("add-task");
        const taskContainer = document.getElementById("todo-task-container");

        console.log(taskContainer);

        let todoList = loadTodoList();
        let taskIdCounter = todoList.length;

        getAllList();

        // variables

        // event listeners
        btnAddTask.addEventListener('click', addTask);
        
        // to add the task when user press enter in input field
        newTaskInput.addEventListener('keypress', function(e) {
            console.log("h");
            if( e.key === "Enter"){
                addTask();
            }
        });

        function generateUniqueId() {
            taskIdCounter++;
            return `task_${taskIdCounter}`;
        }


        // event handlers (functions)
        function addTask() {
            var todolist = loadTodoList();
            var input = newTaskInput.value;
            
            //validate empty input
            if(input === ""){
                return;
            }

            // creating object for todoitem
            var todoItem = {
                id: generateUniqueId(),
                todoItem: input,
                isCompleted: false,
            };

            // adding todoItem to an array
            todolist.push(todoItem)
            
            // storing list in local storage
            localStorage.setItem('todoList', JSON.stringify(todolist));
            console.log(todolist);
            
            // creating div to wrap todo item and checkbox
            let listItemContainer = document.createElement('div');
            taskContainer.appendChild(listItemContainer);

            // creating p tag for todo item text
            let listElement = document.createElement('p');
            listElement.innerText = todoItem.todoItem;
            listItemContainer.appendChild(listElement);

            // creating checkbox fo todo item
            let checkBoxElement = document.createElement('input');
            checkBoxElement.setAttribute('type', 'checkbox');
            checkBoxElement.dataset.id = todoItem.id;
            checkBoxElement.classList.add("checkbox");

            // to update the check box
            checkBoxElement.addEventListener('change', (e) => { updateCheckBox(e) })

            // creating img for delete icon
            let deleteButton = document.createElement('img'); 
            deleteButton.src = "./images/icons/delete.svg";
            deleteButton.classList.add("delete-icon")

            // to delete the list
            deleteButton.addEventListener('click', (e) => {deleteList(e)});

        

            listItemContainer.appendChild(checkBoxElement);
            listItemContainer.appendChild(deleteButton);

            newTaskInput.value = "";
        }

        // to delete the list
        function deleteList(e){
        
            // get the id of task to delete
            let taskId = e.target.previousElementSibling.dataset.id;
           
            // get the list from local storage
            let taskList = loadTodoList();
            
            // removing item from list and storing new list
            let newTaskList = taskList.filter( (list) => {
                return list.id != taskId;
           });

           // set new list to local storage
           localStorage.setItem('todoList',JSON.stringify(newTaskList))

           // display updated list
           // before that clean the div which contains old list
           getAllList();
        }

        // to update the checkbox
        function updateCheckBox(e){

                const taskId = e.target.dataset.id;
            
                var todoList = JSON.parse(localStorage.getItem('todoList'));

                const taskToUpdate = todoList.find( item => item.id === taskId);
        
                    if( taskToUpdate ){
                        taskToUpdate.isCompleted = e.target.checked;

                        // to add dash on task if it is complete
                        // for that we need to have item element
                        const listText =  e.target.parentNode.firstElementChild;
                        if(e.target.checked){
                            listText.classList.add("task-completed");
                            listText.classList.remove("task-not-completed");

                        } else {
                            listText.classList.add("task-not-completed");
                            listText.classList.remove("task-completed");
                        }

                        localStorage.setItem('todoList', JSON.stringify(todoList));
                    }
        }

        // update todo list
        function updateTodoList(updatedList) {
            localStorage.setItem('todoList', JSON.stringify(updatedList));
        }


        

        // to get all list
        function getAllList() {
            var storedList = loadTodoList();
            console.log(storedList);

            taskContainer.innerHTML = "";
            storedList.forEach(list => {

                // creating div tag
                const divElement = document.createElement("div");
                divElement.classList.add("task-container");

                // creating p tag
                const pElement = document.createElement("p");
                pElement.innerText = list.todoItem;

                // creating checkbox
                let checkBoxElement = document.createElement('input');
                checkBoxElement.setAttribute('type', 'checkbox');
                checkBoxElement.dataset.id = list.id;
                checkBoxElement.classList.add("checkbox");
                
                console.log(list.isCompleted + "-0")
                if(list.isCompleted === true){
                    checkBoxElement.checked = true;
                    pElement.classList.add("task-completed");
                } else {
                    checkBoxElement.checked = false;
                    pElement.classList.add("task-not-completed");
                }

                // to update the check box
                checkBoxElement.addEventListener('change', (e) => { updateCheckBox(e) })

                // creating img for delete icon
                let deleteButton = document.createElement('img'); 
                deleteButton.src = "./images/icons/delete.svg";
                deleteButton.classList.add("delete-icon")

                // to delete the list
                deleteButton.addEventListener('click', (e) => {deleteList(e)});

                // appending elements to div
                divElement.append(pElement);
                divElement.append(checkBoxElement);
                divElement.append(deleteButton);

                taskContainer.append(divElement);
            });
        }




        // Load your to-do list from localStorage
        function loadTodoList() {
            var storedList = localStorage.getItem('todoList');
            if (storedList) {
                return JSON.parse(storedList);
            } else {
                // initalizing empty array to store all tasks of todo list as a object
                var todolist = [];
                return todolist;
            }
        }
}
    