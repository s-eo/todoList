function storageIsAvailable(type) {
    console.log('storageIsAvailable?');
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
    if (storageIsAvailable) {
        var todoList = JSON.parse(localStorage.getItem('todoList'));
        for (var i = todoList.length-1; i >= 0; i--){
            if (todoList[i].done === true) {
                //todoList.splice(i, 1);
            }
        }
        localStorage.setItem('todoList', JSON.stringify(todoList));

        /*localStorage.setItem('todoList', JSON.stringify([{ text: 'learn AngularJS', done: true }]));
        var todoList = JSON.parse(localStorage.getItem('todoList'));
         todoList.push({ text: 'learn AngularJS', done: true });
         todoList.push({ text: 'build an AngularJS app', done: false });
         localStorage.setItem('todoList', JSON.stringify(todoList));
         console.log(localStorage);*/
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
    var store = storageIsAvailable();
        cleanStorage();
    console.log(store);
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
                    console.log(ls[index].done);
                    ls[index].done = !this.todoList[index].done;
                    console.log(ls[index].done);
                    localStorage.setItem('todoList', JSON.stringify(ls));
                }
            }
        },
        mounted: function () {
            this.storageIsAvailable = storageIsAvailable();
            this.todoList = getStorage();
            console.log("mounted");
            //document.getElementById('todoInput').focus();

        },
        updated: function () {
            console.log("updated");
        },
        beforeCreate: function () {
            console.log("beforeCreate");
        }
    });
});