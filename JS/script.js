// alert("Hello, from script.js");

// waiting for dom to gets load
let taskIdCounter = 0;

    // loadTodoList();

    // getting elements from dom
    const newTaskInput = document.getElementById("todo-item");
    const btnAddTask = document.getElementById("add-task");
    const taskContainer = document.getElementById("todo-task-container");

    console.log(taskContainer);

    // variables

    // event listeners
    btnAddTask.addEventListener('click', addTask);

    function generateUniqueId() {
        taskIdCounter++;
        return `task_${taskIdCounter}`;
    }
    
    

    // event handlers (functions)
    function addTask() {
        var todolist = loadTodoList();
        var input = newTaskInput.value;
        
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

        // to update the check box
        checkBoxElement.addEventListener('change', (e) => { updateCheckBox(e) })


        listItemContainer.appendChild(checkBoxElement);

    }

    // to update the checkbox
    function updateCheckBox(e){
            const taskId = e.target.dataset.id;
            console.log(taskId);
            var todoList = JSON.parse(localStorage.getItem('todoList'));
            console.log(todoList);
            const taskToUpdate = todoList.find( item => item.id === taskId);
    
                if( taskToUpdate ){
                    taskToUpdate.isCompleted = e.target.checked;
                    localStorage.setItem('todoList', JSON.stringify(todoList));
                }
    }

    // update todo list
    function updateTodoList(updatedList) {
        localStorage.setItem('todoList', JSON.stringify(updatedList));
    }

    
    // to get all list
    function getAllList() {
        var storedAllList = localStorage.getItem('todoList');
        
        var allList = JSON.parse(storedAllList);

        allList.forEach(list => {
            let listElement = document.createElement('p');
            listElement.innerText = list.todoItem;
            console.log(list.todoItem + "--");

            taskContainer.appendChild(listElement);

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

    