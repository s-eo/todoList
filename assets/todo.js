function storageIsAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

function cleanStorage(storageIsAvailable) {
    //remove done items
    if (storageIsAvailable) {
        var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        for (var i = todoList.length-1; i >= 0; i--){
            if (todoList[i].done === true) {
                todoList.splice(i, 1);
            }
        }
        localStorage.setItem('todoList', JSON.stringify(todoList));
        return true;
    }
    else {
        alert('Недоступно локальное хранилище. После перезагрузки страницы все данные будут потеряны.');
        return false;
    }
}

function getStorage() {
    return JSON.parse(localStorage.getItem('todoList'));
}

document.addEventListener('DOMContentLoaded', function () {
    var vm = new Vue({
        el: '#app',
        data: {
            todoList: [],
            message: '',
            storageIsAvailable: false
        },
        methods: {
            addItem: function(text) {
                if (text) {
                    this.todoList.push({text: text, done: false});
                    if (this.storageIsAvailable) {
                        var ls = getStorage();
                        ls.push({text: text, done: false});
                        localStorage.setItem('todoList', JSON.stringify(ls));
                    }
                }
            },
            changeStatus: function(index) {
                console.log(index);
                if (this.storageIsAvailable){
                    var ls = getStorage();
                    ls[index].done = !ls[index].done;
                    localStorage.setItem('todoList', JSON.stringify(ls));
                }
            }
        },
        mounted: function () {
            this.storageIsAvailable = storageIsAvailable('localStorage');
            console.log('Storage is available? - ' + this.storageIsAvailable);
            cleanStorage(this.storageIsAvailable);
            this.todoList = getStorage();
            console.log("mounted");

        },
        updated: function () {
            console.log("updated");
        },
        beforeCreate: function () {
            console.log("beforeCreate");
        }
    });
});