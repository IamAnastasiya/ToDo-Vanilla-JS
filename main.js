"use strict";

const inputWrapper = document.querySelector('.input-wrapper');
const input = document.querySelector('.input');


class TodoState {
    constructor() {
        this.todoItems = [];
    }

    addTodo(item) {
        if (item !== "") {
            const todo = {
                id: Math.random(),
                name: item,
                completed: false,
            }
            this.todoItems.push(todo);
            console.log(this.todoItems);
        }
    }

    getTodoId (elem) {
        this.todoItems.forEach(function(item) {
            elem.setAttribute('data-key', item.id);
        })
        return (elem.dataset.key);
    }

    toggleCheckTodo(id) {
        this.todoItems.forEach(function (item) {
            if (item.id == id) {
                item.completed = !item.completed;
            }
        });
        console.log(this.todoItems);
    }

    removeTodo(id) {
        this.todoItems = this.todoItems.filter(function (item) {
            return item.id != id;
        });
        console.log(this.todoItems);
    }
}


class TodoItem {
    constructor(input) {
        this.input = input;
    }

    handleSubmit() {
        let myTodoList = new TodoState();
        input.addEventListener("keydown", function (event) {
            if (event.keyCode === 13 && input.value !== "") {

                let newTask = document.createElement("div");
                newTask.classList.add("list-item");
                inputWrapper.append(newTask);


                myTodoList.addTodo(input.value);
                let currentId = myTodoList.getTodoId(newTask);


                let textLine = document.createElement("p");
                textLine.classList.add("text-item");
                textLine.innerHTML = input.value;
                newTask.append(textLine);


                let inputRadio = document.createElement("input");
                inputRadio.setAttribute('type', 'checkbox');
                inputRadio.classList.add("checkbox");
                newTask.prepend(inputRadio);

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.innerHTML = "x";
                textLine.append(deleteButton);

                input.value = "";

                inputRadio.addEventListener("click", function () {
                    myTodoList.toggleCheckTodo(currentId);
                    if (inputRadio.checked) {
                        textLine.classList.add("checked");
                    } else {
                        textLine.classList.remove("checked");
                    }
                })

                deleteButton.addEventListener("click", function () {
                    if (inputRadio.checked) {
                        newTask.remove();
                        myTodoList.removeTodo(currentId);
                    }
                })
            }
        })
    }
}


let task1 = new TodoItem();
task1.handleSubmit();




