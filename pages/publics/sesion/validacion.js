import { validateUser } from "../../../api/user.js";



document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    try {
        const result = await validateUser(email, password);
        console.log(result)
        sessionStorage.setItem('userName', result.decode.nombre);
        sessionStorage.setItem('userId', result.decode.idUsuario);
        sessionStorage.setItem('email', result.decode.email);
        sessionStorage.setItem('loginUrl', window.location.href);
        sessionStorage.setItem('token', result.token)
        window.location.href = '../../privates/home/home.html'; // Redireccionar a la página principal
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = error.message || 'Error en el servidor. Intente nuevamente más tarde.';
    }


});

const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', () => {
    window.location.href = '../register/register.html';
});