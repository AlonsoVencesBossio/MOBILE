document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para la barra lateral (Sidebar Toggle) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    if (menuToggle && sidebar && content) {
        // Inicialmente, si es una pantalla grande, muestra el sidebar.
        // Si es pequeña, ocúltalo.
        const checkInitialState = () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('hidden');
                content.classList.remove('expanded');
            } else {
                sidebar.classList.add('hidden');
                content.classList.add('expanded');
            }
        };

        checkInitialState(); // Ejecutar al cargar la página

        window.addEventListener('resize', checkInitialState); // Ejecutar al redimensionar

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            content.classList.toggle('expanded');
        });
    }

    // --- Lógica para el botón "Cerrar Sesión" ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace recargue la página si el href es '#'
            const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
            if (confirmLogout) {
                // En un entorno real, aquí limpiarías tokens de sesión o cookies.
                // localStorage.removeItem('authToken');
                // sessionStorage.removeItem('userId');

                // Redirige a la pantalla de inicio
                window.location.href = 'index.html';
            }
        });
    }

    // --- Lógica para Acordeones (Evaluaciones y Recursos Guía) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionBody = header.nextElementSibling; // El cuerpo está justo después del encabezado

            // Cierra todos los demás acordeones
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null; // Reinicia la altura
                }
            });

            // Alterna la clase 'active' para el encabezado y el cuerpo
            header.classList.toggle('active');
            accordionBody.classList.toggle('active');

            // Ajusta la altura máxima para la animación
            if (accordionBody.classList.contains('active')) {
                accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            } else {
                accordionBody.style.maxHeight = null; // Vuelve a cero
            }
        });
    });

    // --- Lógica para el Calendario (Ejemplo simple) ---
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthSpan = document.getElementById('current-month-display');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date(); // Fecha actual

    const renderCalendar = () => {
        if (!calendarGrid) return; // Salir si no estamos en la página del calendario

        calendarGrid.innerHTML = ''; // Limpiar el calendario
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Nombres de los meses y días para mostrar
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

        if (currentMonthSpan) {
            currentMonthSpan.textContent = `${monthNames[month]} ${year}`;
        }

        // Añadir nombres de los días
        dayNames.forEach(day => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day-name');
            dayNameDiv.textContent = day;
            calendarGrid.appendChild(dayNameDiv);
        });

        // Primer día del mes y último día del mes
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Domingo, 1 = Lunes...
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); // Último día del mes actual

        // Días del mes anterior para rellenar
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayOfMonth; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day', 'other-month');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            calendarGrid.appendChild(dayDiv);
        }

        // Días del mes actual
        // Ejemplo de eventos (puedes cargarlos desde una API o almacenamiento local)
        const events = {
            '2025-06-15': 'Charla Experto',
            '2025-06-20': 'Evaluación Final',
            '2025-07-05': 'Entrega Proyecto'
        };

        for (let day = 1; day <= lastDayOfMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day', 'current-month');
            dayDiv.textContent = day;

            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (events[fullDate]) {
                dayDiv.classList.add('has-event');
                const eventDot = document.createElement('div');
                eventDot.classList.add('event-dot');
                dayDiv.appendChild(eventDot);

                dayDiv.title = events[fullDate]; // Tooltip para el evento
            }

            dayDiv.addEventListener('click', () => {
                alert(`Haz clickeado el día ${day} de ${monthNames[month]}. Evento: ${events[fullDate] || 'Ninguno'}`);
                // Aquí podrías abrir un modal para añadir/editar eventos
            });
            calendarGrid.appendChild(dayDiv);
        }

        // Días del mes siguiente para rellenar
        const totalDays = firstDayOfMonth + lastDayOfMonth;
        const remainingCells = 42 - totalDays; // 6 filas * 7 días/fila = 42
        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day', 'other-month');
            dayDiv.textContent = i;
            calendarGrid.appendChild(dayDiv);
        }
    };

    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        renderCalendar(); // Renderizar el calendario al cargar la página
    }

    // Lógica para el botón "Agregar Evento"
    const addEventButton = document.querySelector('.add-event-button');
    if (addEventButton) {
        addEventButton.addEventListener('click', () => {
            alert('Funcionalidad para añadir evento: ¡Aquí podrías abrir un formulario modal para añadir eventos!');
            // Implementar modal/form para añadir evento
        });
    }

    // --- Active Link en la barra lateral ---
    const currentPath = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual
    const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');

    sidebarLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'main_page.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});
