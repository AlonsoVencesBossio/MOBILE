document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    const eyeOffIcon = document.querySelector('.eye-off-icon');
    const loginForm = document.querySelector('.login-form');

    // Función para mostrar/ocultar contraseña
    window.togglePasswordVisibility = function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.style.display = 'none';
            eyeOffIcon.style.display = 'inline-block';
        } else {
            passwordInput.type = 'password';
            eyeIcon.style.display = 'inline-block';
            eyeOffIcon.style.display = 'none';
        }
    };

    // Manejo del envío del formulario para redirección a main_page.html
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username.trim() === '' || password.trim() === '') {
            alert('Por favor, ingresa tu usuario/correo electrónico y contraseña.');
            return;
        }

        // --- SIMULACIÓN DE INICIO DE SESIÓN ---
        // En un entorno real, aquí se enviarían los datos a un backend para autenticación.
        // Si el inicio de sesión es exitoso, entonces se redirige.

        // Por ahora, solo redirigimos a la página principal.
        window.location.href = 'main_page.html';
    });
});
