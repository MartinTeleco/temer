const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json()); // Para poder manejar JSON en las peticiones POST

// Leer datos del archivo JSON (rankingData.json)
function cargarRanking() {
    const data = fs.readFileSync(path.join(__dirname, 'backend', 'ranking.json'));
    return JSON.parse(data);
}

// Ruta para obtener el ranking de jugadores
app.get('/api/jugadores', (req, res) => {
    const ranking = cargarRanking();
    res.json(ranking);
});

// **Inicio de sesión de un jugador existente**
app.post('/api/jugadores/login', (req, res) => {
    const { nombre, password, puntos } = req.body;

    if (!nombre || !password) {
        return res.status(400).json({ error: 'Nombre y contraseña son requeridos' });
    }

    const ranking = cargarRanking();

    // Verificar si el jugador existe
    const jugadorExistente = ranking.find((jugador) => jugador.nombre === nombre);
    if (!jugadorExistente) {
        return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    // Verificar si la contraseña es correcta
    if (jugadorExistente.password !== password) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', jugador: { nombre, puntos: jugadorExistente.puntos } });
});

// **Registro de un nuevo jugador**
app.post('/api/jugadores/registro', (req, res) => {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
        return res.status(400).json({ error: 'Nombre y contraseña son requeridos' });
    }

    const ranking = cargarRanking();

    // Verificar si el jugador ya existe
    const jugadorExistente = ranking.find((jugador) => jugador.nombre === nombre);
    if (jugadorExistente) {
        return res.status(400).json({ error: 'El nombre de usuario ya está registrado' });
    }

    // Agregar al jugador (puntos inicializados en 0)
    ranking.push({ nombre, password, puntos: 0 });

    // Guardar los nuevos datos en el archivo JSON
    fs.writeFileSync(path.join(__dirname, 'backend', 'ranking.json'), JSON.stringify(ranking, null, 2));

    res.status(201).json({ message: 'Jugador registrado exitosamente' });
});

/* Para actualizar los puntos */ 
app.patch('/api/jugadores/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { puntos } = req.body;

    if (puntos === undefined) {
        return res.status(400).json({ error: 'Puntos son requeridos' });
    }

    // Leer el ranking actual
    const ranking = cargarRanking();

    // Buscar al jugador
    const jugador = ranking.find((jugador) => jugador.nombre === nombre);

    if (!jugador) {
        return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    // Actualizar los puntos
    jugador.puntos = puntos;

    // Guardar los nuevos datos en el archivo JSON
    fs.writeFileSync(path.join(__dirname, 'backend', 'ranking.json'), JSON.stringify(ranking, null, 2));

});


// Ruta para la página de ranking
app.get('/ranking', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','ranking', 'ranking.html'));
});

// Ruta para la página del juego
app.get('/juego', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','juego', 'juego.html'));
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','inicio', 'inicio.html'));
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','mapa', 'mapa.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
