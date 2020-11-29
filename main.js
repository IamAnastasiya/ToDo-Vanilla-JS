"use strict";

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
            if (elem.dataset.name == item.name) {
                elem.setAttribute('data-key', item.id);
            }
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

    constructor() {
        this.inputWrapper = document.querySelector('.input-wrapper');
        this.input = document.querySelector('.input');
        this.myTodoList = new TodoState();
    }

    createElement(tag, className) {
        let element = document.createElement(tag)
        if (className) element.classList.add(className)
        return element;
    }

    handleSubmit() {

        this.input.addEventListener("keydown", (event) => {
            if (event.keyCode === 13 && this.input.value !== "") {

                let newTask = this.createElement("div", "list-item")
                this.inputWrapper.append(newTask);
                newTask.setAttribute('data-name', `${this.input.value}`);

                this.myTodoList.addTodo(this.input.value);
                let currentId = this.myTodoList.getTodoId(newTask);

                let textLine = this.createElement("p", "text-item")
                textLine.innerHTML = this.input.value;
                newTask.append(textLine);

                let inputRadio = this.createElement("input", "checkbox");
                inputRadio.setAttribute('type', 'checkbox');
                newTask.prepend(inputRadio);

                let deleteButton = this.createElement("button", "delete-button");
                deleteButton.innerHTML = "x";
                textLine.append(deleteButton);

                this.input.value = "";

            }
        })
    }

    handleToggleTodo () {
        this.inputWrapper.addEventListener("click", event => {
            if (event.target.className === "checkbox") {
                let elem = event.target.closest('div');
                let currentId = this.myTodoList.getTodoId(elem);
                this.myTodoList.toggleCheckTodo(currentId);
                let inputRadio = elem.firstChild;
                let textLine = elem.lastChild;
                if (inputRadio.checked) {
                    textLine.classList.add("checked");
                } else {
                    textLine.classList.remove("checked");
                }
            }
        })
    }

    handleDeleteTodo () {

        this.inputWrapper.addEventListener("click", event => {
            if (event.target.className === "delete-button") {
                let elem = event.target.closest('div');
                let inputRadio = elem.firstChild;
                let currentId = this.myTodoList.getTodoId(elem);
                if (inputRadio.checked) {
                    elem.remove();
                    this.myTodoList.removeTodo(currentId);
                }
            }
        })
    }


}


let currentTasks = new TodoItem();
currentTasks.handleSubmit();
currentTasks.handleToggleTodo();
currentTasks.handleDeleteTodo();


