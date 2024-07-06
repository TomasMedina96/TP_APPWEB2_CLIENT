import { newUser } from "../../../api/user.js";

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const backButton = document.getElementById('back-button');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        const data = {
            nombre,
            apellido,
            email,
            contraseña: password
        };

        const result = await newUser(data)
        if(result){
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('success-message').classList.remove('hidden');
        }
        else{
            document.getElementById('error-message').classList.remove('hidden');
        }
    });

    backButton.addEventListener('click', () => {
        window.location.href = '../sesion/validacion.html';
    });
});
