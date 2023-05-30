import * as UserService from '../../admin/js/services/userServices.js';

const loginContainer = document.querySelector('.login-container');
const usernameContainer = document.querySelector('#username');

let userLogged = false;

const renderLoginForm = () => {
    // Si no hay nadie iniciado sesión muestra panel de login
    if (userLogged == false) {
        loginContainer.innerHTML = `
            <form id="login-form">
                <div><h4>Iniciar sesión<h4></div>
                <div class="login-input"><input id="login-email-input" type="text" placeholder="Introduce el correo"/></div>
                <div class="login-input"><input id="login-password-input" type="password" placeholder="Contraseña"/></div>
                <div class="btn-login"><button id="login-button">Iniciar sesión</button></div>
                <div class="register-text"><button id="register-button">¿No tienes usuario? Registrate</button></div>
            </form>
      `;
        // Si el usuario iniciado es admin muestra link a la página de administración
    } else if (userLogged == true && usernameContainer.textContent === "admin") {
        loginContainer.innerHTML = `
            <div class="admin-link"><a href="../admin/index.html"><h1>Panel de administración</h1></a></div>
            <div class="logout"><button id="btn-logout">Cerrar sesión</button></div>
        `;
        const logoutBtn = document.querySelector('#btn-logout');
        logoutBtn.addEventListener('click', logoutUser);

    } else if (userLogged == true) {
        loginContainer.innerHTML = `
            <div class="logout"><button id="btn-logout">Cerrar sesión</button></div>
        `;
        const logoutBtn = document.querySelector('#btn-logout');
        logoutBtn.addEventListener('click', logoutUser);
    }

    // Si se pulsa en registrarse pasa a renderRegisterForm
    const registerButton = document.querySelector('#register-button');
    registerButton.addEventListener('click', renderRegisterForm);

    // Si se pulsa botón login pasa a loginUser
    const loginButton = document.querySelector('#login-button');
    const formItem = document.querySelector('#login-form');
    formItem.reset();

    loginButton.addEventListener('click', loginUser);
};

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
};

const loginUser = (event) => {
    // preventDefault para que envíe los datos antes de recargar la página
    event.preventDefault();
    const email = document.querySelector('#login-email-input').value;
    const password = document.querySelector('#login-password-input').value;
    const user = { email, password };
    UserService.login(user).then(data => {
        if (!data.error) {
            userLogged = true;
            usernameContainer.innerHTML = data.user.name;
            saveSessionLS(data.user);
        } else {
            console.log(data);
        }
        renderLoginForm();
    });
};

const registerUser = (event) => {
    // preventDefault para que envíe los datos antes de recargar la página
    event.preventDefault();
    const name = document.querySelector('#name-register').value;
    const surname = document.querySelector('#surname-register').value;
    const email = document.querySelector('#email-register').value;
    const password = document.querySelector('#password-register').value;
    const newUser = { name, surname, email, password };
    UserService.register(newUser).then(data => {
        console.log(data);
    });
    renderLoginForm();
};

const logoutUser = () => {
    // Al pusar en cerrar sesión se quita de LS y como userLogged pasa a false en renderLoginForm
    // va a renderizar otra vez los campos de login
    userLogged = false;
    usernameContainer.innerHTML = "Invitado";
    removeSessionLS();
    renderLoginForm();
};

const saveSessionLS = (user) => {
    localStorage.setItem('userSession', JSON.stringify(user));
};

// Sacado de StackOverflow
const getSessionLS = () => {
    const sessionData = localStorage.getItem('userSession');
    return sessionData ? JSON.parse(sessionData) : null;
};

const removeSessionLS = () => {
    localStorage.removeItem('userSession');
};

const init = () => {
    const sessionUser = getSessionLS();
    if (sessionUser) {
        userLogged = true;
        usernameContainer.innerHTML = sessionUser.name;
    }
    renderLoginForm();
};
init();