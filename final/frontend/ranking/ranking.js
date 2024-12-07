async function cargarRanking() {
    const response = await fetch('/api/jugadores');
    const jugadores = await response.json();

    // Ordenar jugadores por puntos (de mayor a menor)
    jugadores.sort((a, b) => b.puntos - a.puntos);

    // Asignar los tres primeros al podio
    if (jugadores.length > 0) {
        const primero = document.getElementById('podio-primero');


        // Crear una imagen para el jugador
        const imagen = document.createElement('img');
        imagen.src = '../img/primero.jpg';  // Reemplaza con la ruta correcta de la imagen
        imagen.alt = 'Imagen';   // Texto alternativo por si la imagen no se carga
        imagen.style.width = '50px';         // Ajusta el tamaño de la imagen
        imagen.style.height = '50px';        // Ajusta el tamaño de la imagen

           // Insertar la imagen encima del nombre del puesto
        const contenedorJugador = primero.querySelector('.jugador'); // Asegúrate de que haya un contenedor para el nombre
        contenedorJugador.insertAdjacentElement('beforebegin', imagen); // Inserta la imagen antes del nombre


        primero.querySelector('.jugador').textContent = jugadores[0]?.nombre || '';
        primero.querySelector('.puntos').textContent = `${jugadores[0]?.puntos || 0} puntos`;
    }

    if (jugadores.length > 1) {
        const segundo = document.getElementById('podio-segundo');

        // Crear una imagen para el jugador
        const imagen = document.createElement('img');
        imagen.src = '../img/segundo.jpg';  // Reemplaza con la ruta correcta de la imagen
        imagen.alt = 'Imagen';   // Texto alternativo por si la imagen no se carga
        imagen.style.width = '50px';         // Ajusta el tamaño de la imagen
        imagen.style.height = '50px';        // Ajusta el tamaño de la imagen

           // Insertar la imagen encima del nombre del puesto
        const contenedorJugador = segundo.querySelector('.jugador'); // Asegúrate de que haya un contenedor para el nombre
        contenedorJugador.insertAdjacentElement('beforebegin', imagen); // Inserta la imagen antes del nombre


        segundo.querySelector('.jugador').textContent = jugadores[1]?.nombre || '';
        segundo.querySelector('.puntos').textContent = `${jugadores[1]?.puntos || 0} puntos`;
    }

    if (jugadores.length > 2) {
        const tercero = document.getElementById('podio-tercero');

        // Crear una imagen para el jugador
        const imagen = document.createElement('img');
        imagen.src = '../img/tercero.jpg';  // Reemplaza con la ruta correcta de la imagen
        imagen.alt = 'Imagen';   // Texto alternativo por si la imagen no se carga
        imagen.style.width = '50px';         // Ajusta el tamaño de la imagen
        imagen.style.height = '50px';        // Ajusta el tamaño de la imagen

         // Insertar la imagen encima del nombre del puesto
        const contenedorJugador = tercero.querySelector('.jugador'); // Asegúrate de que haya un contenedor para el nombre
        contenedorJugador.insertAdjacentElement('beforebegin', imagen); // Inserta la imagen antes del nombre

        

        tercero.querySelector('.jugador').textContent = jugadores[2]?.nombre || '';
        tercero.querySelector('.puntos').textContent = `${jugadores[2]?.puntos || 0} puntos`;
    }

    // Rellenar la lista con el resto de los jugadores
    const rankingLista = document.querySelector('.ranking-lista');
    rankingLista.innerHTML = ''; // Limpiar contenido previo
    for (let i = 3; i < jugadores.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="puesto">${i + 1}</span> ${jugadores[i].nombre} - <strong>${jugadores[i].puntos} puntos</strong>
        `;
        rankingLista.appendChild(li);
    }
}

// Cargar el ranking cuando la página se carga
window.onload = cargarRanking;


// Cargar el ranking cuando la página se carga
window.onload = cargarRanking;




// Cargar el ranking cuando la página se carga
window.onload = cargarRanking;
