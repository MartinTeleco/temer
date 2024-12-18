let tipos_de_basuras = ["carton", "plastico", "vidrio", "organico"];
let basuras = [
    { nombre: "platano", tipo: "organico", origen: "colegio" },
    { nombre: "sandwich", tipo: "organico", origen: "colegio" },
    { nombre: "dulces", tipo: "organico", origen: "colegio" },
    { nombre: "carpeta", tipo: "plastico", origen: "colegio" },
    { nombre: "libros", tipo: "carton", origen: "colegio" },

    { nombre: "botellaPLastico", tipo: "plastico", origen: "ciudad" },

    { nombre: "botellaCristal", tipo: "vidrio", origen: "industria" },

    { nombre: "caja", tipo: "carton", origen: "casa" }
];

// Contenedores de origen
let casa = document.getElementById("casa");
let colegio = document.getElementById("colegio");
let industria = document.getElementById("industria");
let ciudad = document.getElementById("ciudad");

// Contenedores de destino
let carton = document.getElementById("carton");
let plastico = document.getElementById("plastico");
let vidrio = document.getElementById("vidrio");
let organico = document.getElementById("organico");

// Puntuación
let puntos = 0;
let puntosSpan = document.getElementById("cont_movimientos");

// Tiempo
let cont_tiempo = document.getElementById("cont_tiempo");
let segundos = 0;
let temporizador = null;

function comenzar_juego() {
    
    limpiarContenedores();

    for (let basura of basuras) {                           //recorro el array basuras
        let img = document.createElement("img");            //genero un elemento img para cada residuo
        img.src = `../img/residuos/${basura.nombre}.png`;   //le asigno una imagen al residuo
        img.id = basura.nombre;                             // le asigno como id el nombre en el array
        img.draggable = true;

        img.classList.add("img-residuo");                   // Clase para estilos

        arrastrar_basuras(img);

        // Agregar basura al contenedor de origen
        /*if (basura.origen === "casa") casa.appendChild(img);
        if (basura.origen === "colegio") colegio.appendChild(img);
        if (basura.origen === "industria") industria.appendChild(img);
        if (basura.origen === "ciudad") ciudad.appendChild(img);*/

        // poner basura encima de su origen
        const origen = document.getElementById(basura.origen); 
        if (origen) {
            const numResiduos = origen.querySelectorAll(".img-residuo").length;
            img.style.position = "absolute"; // posicionamiento relativo al contenedor
            img.style.left = `${numResiduos * 45}px`; // separo 45px entre residuos
            img.style.top = "30"; // ajusto altura
            origen.appendChild(img);
        }
    }

    // Resetear puntuación
    puntos = 0;
    puntosSpan.textContent = puntos;

    // Arrancar el conteo de tiempo
    arrancar_tiempo();
}

function arrancar_tiempo() {
    if (temporizador) clearInterval(temporizador);

    temporizador = setInterval(() => {
        segundos++;
        let min = Math.floor(segundos / 60);
        let sec = segundos % 60;
        cont_tiempo.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
    }, 1000);
}

function limpiarContenedores() {
    const contenedores = [casa, colegio, industria, ciudad];
    contenedores.forEach(contenedor => { //recorre todo el arrays contenedores y va limpiandolo
        const basurasEnContenedor = contenedor.querySelectorAll(".img-residuo");
        basurasEnContenedor.forEach(basura => basura.remove());
    });
}

function arrastrar_basuras(basura) {
    basura.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });
}

// Configurar contenedores de destino para recibir basuras
function configurar_destinos() {
    const destinos = { carton, plastico, vidrio, organico };  //receptores de residuos

    for (let i in destinos) {
        destinos[i].addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        destinos[i].addEventListener("drop", (e) => {
            e.preventDefault();
            const basuraId = e.dataTransfer.getData("text");
            const basura = basuras.find((b) => b.nombre === basuraId);

            if (basura && basura.tipo === i) { //verificar si el residuo debe ir a ese contenedor
                puntos += 10;
                document.getElementById(basuraId).style.visibility = "hidden"; // Ocultar basura
            } else {
                puntos -= 5; // Penalización
            }

            puntosSpan.textContent = puntos; // Actualizar puntuación
        });
    }
}

// Configurar todo al cargar
configurar_destinos();
comenzar_juego();
