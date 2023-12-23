// alert("Hello, from script.js");

// waiting for dom to gets load
window.onload = function() {

    // getting elements from dom
    const newTaskInput = document.getElementById("todo-item");
    const btnAddTask = document.getElementById("add-task");
    const taskContainer = document.getElementById("todo=task-container");


    // variables


    // event listeners
    btnAddTask.addEventListener('click', addTask);

    
    // event handlers (functions)
    function addTask() {
        var input = newTaskInput.value;
        
        // creating object for todoitem
        var todoItem = {
            todoItem: input,
            isCompleted: false,
        };

        // adding todoItem to an array
        todolist.push(todoItem)
        
        // storing list in local storage
        localStorage.setItem('todoList', JSON.stringify(todolist));
        console.log(localStorage.getItem('todoList'));
    }

    // initalizing empty array to store all tasks of todo list as a object
    var todolist = [];

    
    // to get all list
    function getAllList() {
        var allList = localStorage.getItem('todoList');
        
    }

}