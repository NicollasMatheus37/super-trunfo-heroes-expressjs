let authUsers;

fetch('users.json')
    .then(response => response.json())
    .then(jsondata => authUsers = jsondata);

function toHome() {
    location.replace('/home');
}

function login() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');

    if (!authenticate(usernameInput.value, passwordInput.value)) {
        alert('Usuário não encontrado');

        return;
    }

    location.replace('/add-cards');
}

function authenticate(username, password) {
    return !!authUsers.find(user => (user.username == username && user.password == password));
}