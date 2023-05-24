import  * as UserService  from '../../admin/js/services/userServices.js';

const loginContainer = document.querySelector('.login-container');
const usernameContainer = document.querySelector('#username');

let userLoged = false;

const renderLoginForm = () => {
    if (userLoged == false) {
        loginContainer.innerHTML = `
        <form id="login-form">
            <div><h4>Iniciar sesión<h4></div>
            <div class="login-input"><input id="login-email-input" type="text" placeholder="Introduce el correo"/></div>
            <div class="login-input"><input id="login-password-input" type="password" placeholder="Contraseña"/></div>
            <div class="btn-login"><button id="login-button">Iniciar sesión</button></div>
            <div class="register-text"><button id="register-button">¿No tienes usuario? Registrate</button>
        </form>
        `
    } else if (userLoged == true) {
        loginContainer.innerHTML = `
            <div>logoff<div>
        `
    }

    // Si se pulsa en registrarse pasa a renderRegisterForm
    const registerButton = document.querySelector('#register-button');
    registerButton.addEventListener('click', renderRegisterForm);
    
    const loginButton = document.querySelector('#login-button');
    const formItem = document.querySelector('#login-form');
    formItem.reset();

    loginButton.addEventListener('click', loginUser);
}

const loginUser = (event) => {
    event.preventDefault();
    const email = document.querySelector('#login-email-input').value;
    const password = document.querySelector('#login-password-input').value;
    const user = {email, password}
    UserService.login(user).then(data => {
        if (!data.error) {
            userLoged = true;
            usernameContainer.innerHTML = data.user.name;
            console.log(data);
        } else {
            console.log(data);
        }
    });
    renderLoginForm();
}

const renderRegisterForm = () => {
    loginContainer.innerHTML = `
        <form id="register-form">
            <div><h4>Regístrate<h4></div>
            <div class="register-input"><input id="name-register" type="text" placeholder="Introduce tu nombre"/></div>
            <div class="register-input"><input id="surname-register" type="text" placeholder="Introduce tu apellido"/></div>
            <div class="register-input"><input id="email-register" type="text" placeholder="Introduce tu email"/></div>
            <div class="register-input"><input id="password-register" type="password" placeholder="Contraseña"/></div>
            <div class= "register-buttons">
                <button id="cancel-register">Cancelar</button>
                <button id="register">Registrarse</button>
            </div>
        </form>
    `;
    // En caso de cancelar registro vuelve a apartado login
    const cancelRegister = document.querySelector('#cancel-register');
    cancelRegister.addEventListener('click', renderLoginForm);

    // Proceso register
    const registerBtn = document.querySelector('#register');
    const formItem = document.querySelector('#register-form');
    formItem.reset();

    registerBtn.addEventListener('click', registerUser);
}

const registerUser = (event) => {
    event.preventDefault();
    const name = document.querySelector('#name-register').value;
    const surname = document.querySelector('#surname-register').value;
    const email = document.querySelector('#email-register').value;
    const password = document.querySelector('#password-register').value;
    const newUser = {name, surname, email, password};
    UserService.register(newUser).then(data => {
        console.log(data);        
    })
    renderLoginForm();
}

const init = () => {
    renderLoginForm();
}
init();
