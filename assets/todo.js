var vm = new Vue({
    el: '#app',
    data: {
        todoList: [],
        message: '',
        storageIsAvailable: false
    },
    methods: {
        addItem: function(text) {
            this.todoList.push({text: text, done: false});
            if (this.storageIsAvailable) {
                var ls = getStorage();
                ls.push({text: text, done: false});
                localStorage.setItem('todoList', JSON.stringify(ls));
            }
            document.getElementById('todoInput').focus();
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
        this.storageIsAvailable = checkStorage();
        if (this.storageIsAvailable) {
            this.todoList = getStorage();
        }
        document.getElementById('todoInput').focus();

    }
});

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function checkStorage() {
    if (storageAvailable('localStorage')) {
        var todoList = JSON.parse(localStorage.getItem('todoList'));
        for (var i = todoList.length-1; i >= 0; i--){
            if (todoList[i].done === true) {
                todoList.splice(i, 1);
            }
        }
        localStorage.setItem('todoList', JSON.stringify(todoList));
        return true;

        /*localStorage.setItem('todoList', JSON.stringify([{ text: 'learn AngularJS', done: true }]));
         var todoList = JSON.parse(localStorage.getItem('todoList'));
         todoList.push({ text: 'learn AngularJS', done: true });
         todoList.push({ text: 'build an AngularJS app', done: false });
         localStorage.setItem('todoList', JSON.stringify(todoList));
         console.log(localStorage);*/
    }
    else {
        alert('Недоступно локальное хранилище. После перезагрузки страницы все данные будут потеряны.');
        return false;
    }
}

function getStorage() {
    return JSON.parse(localStorage.getItem('todoList'));
}
