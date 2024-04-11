$(document).ready(function () {
    // Asigna eventos después de cargar la navbar dinámicamente
    function assignNavbarEvents() {
        $('#actionLogin').off('click').on('click', function (e) {
            e.preventDefault();
            login();
        });

        $('#actionLogout').off('click').on('click', function (e) {
            e.preventDefault();
            logout();
        });

        $('#actionRegister').off('click').on('click', function (e) {
            e.preventDefault();
            register();
        });
    }

    // Verifica el estado de inicio de sesión y ajusta la UI correspondientemente
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (isLoggedIn) {
            $('#actionLogin').hide();
            $('#actionLogout').show().text(isAdmin ? 'Cerrar sesión (admin)' : 'Cerrar sesión'); // Modificación aquí
            $('#actionRegister').hide();
        } else {
            $('#actionLogin').show();
            $('#actionLogout').hide().text('Cerrar sesión'); // Asegurar que el texto vuelva a la normalidad
            $('#actionRegister').show();
        }

        if (isAdmin) {
            // Opciones específicas del administrador
            console.log("El modo de administrador está activado.");
        }
    }

    // Cargar la navbar y luego aplicar la lógica de visibilidad
    $("#navbar-placeholder").load("navbar.html", function () {
        assignNavbarEvents();
        checkLoginStatus();
    });

    // Lógica de inicio de sesión
    function login() {
        const email = prompt("Ingrese su correo electrónico:");
        const password = prompt("Ingrese su contraseña:");

        // Simula la lógica de autenticación
        if (email === "admin" && password === "123") {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'true');
            alert("Inicio de sesión como Administrador exitoso.");
        } else if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            alert("Inicio de sesión exitoso.");
        } else {
            alert("Inicio de sesión fallido. Por favor, intente de nuevo.");
        }
        checkLoginStatus();
    }

    // Lógica de cierre de sesión
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        alert("Sesión cerrada exitosamente.");
        checkLoginStatus();
    }

    // Lógica de registro (ejemplo simplificado)
    function register() {
        const email = prompt("Ingrese su correo electrónico para registrarse:");
        // Aquí iría la lógica de registro, como guardar datos en localStorage o enviarlos a un servidor
        alert("Registro completado (simulado). Por favor, inicie sesión.");
    }

    function actualizarContadorMantenciones() {
        var cantidadMantenciones = localStorage.getItem('cantidadMantenciones');
        $('#mantencionesContador').text(cantidadMantenciones || 0);
    }

    // Inicializar el contador al cargar la página
    actualizarContadorMantenciones();

    function buscarAutosPorMecanico(searchTerm) {
        $('.auto-item').hide();  // Oculta todos los elementos primero
        $('.auto-item').filter(function () {
            var mecanico = $(this).data('mecanico').toLowerCase();
            return mecanico.includes(searchTerm.toLowerCase());
        }).show();  // Muestra solo los elementos que coinciden con el término de búsqueda
    }

    // Manejador de eventos para el botón de búsqueda
    $('#searchButton').on('click', function () {
        var searchTerm = $('#searchInput').val().trim();
        buscarAutosPorMecanico(searchTerm);
    });
});
