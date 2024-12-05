let tipos_de_basuras = ["carton", "plastico", "vidrio", "organico"];
let basuras = [
    { nombre: "sandwich", tipo: "organico", origen: "colegio" },
    { nombre: "dulces", tipo: "organico", origen: "colegio" },
    { nombre: "carpeta", tipo: "plastico", origen: "colegio" },
    { nombre: "libros", tipo: "carton", origen: "colegio" },
    { nombre: "cubo", tipo: "plastico", origen: "colegio" },

    { nombre: "botellaPlastico", tipo: "plastico", origen: "ciudad" },
    { nombre: "alcohol", tipo: "vidrio", origen: "ciudad" },
    { nombre: "bolsa", tipo: "plastico", origen: "ciudad" },
    { nombre: "carne", tipo: "organico", origen: "ciudad" },
    { nombre: "tetrabrick", tipo: "carton", origen: "ciudad" },
    

    { nombre: "botellaCristal", tipo: "vidrio", origen: "industria" },
    { nombre: "platano", tipo: "organico", origen: "industria" },
    { nombre: "caca", tipo: "organico", origen: "industria" },
    { nombre: "pipeta", tipo: "vidrio", origen: "industria" },
    { nombre: "caja", tipo: "carton", origen: "industria" },

    { nombre: "zapatos", tipo: "carton", origen: "casa" },
    { nombre: "burger", tipo: "organico", origen: "casa" },
    { nombre: "juguete", tipo: "plastico", origen: "casa" },
    { nombre: "copa", tipo: "vidrio", origen: "casa" },
    { nombre: "cereales", tipo: "carton", origen: "casa" },


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

    // Agrupar basuras por contenedor de origen
    const agrupadasPorOrigen = {
        casa: basuras.filter(basura => basura.origen === "casa"),
        colegio: basuras.filter(basura => basura.origen === "colegio"),
        industria: basuras.filter(basura => basura.origen === "industria"),
        ciudad: basuras.filter(basura => basura.origen === "ciudad")
    };

    let index = 0; // Índice para iterar las basuras
    const intervalo = setInterval(() => {
        let residuosAgregados = false;

        for (const origen in agrupadasPorOrigen) {
            const residuos = agrupadasPorOrigen[origen];
            if (index < residuos.length) {
                residuosAgregados = true;

                const basura = residuos[index];
                const img = document.createElement("img");
                img.src = `../img/residuos/${basura.nombre}.png`;
                img.id = basura.nombre;
                img.draggable = true;
                img.classList.add("img-residuo");

                arrastrar_basuras(img);

                // Agregar al contenedor correspondiente
                const contenedor = document.getElementById(origen);
                if (contenedor) {
                    const numResiduos = contenedor.querySelectorAll(".img-residuo").length;
                    img.style.position = "absolute";
                    img.style.left = `${numResiduos * 45}px`; // Separar residuos
                    img.style.top = "30px";
                    contenedor.appendChild(img);
                }
            }
        }

        if (!residuosAgregados) {
            clearInterval(intervalo); // Detener el intervalo cuando no queden residuos
        }

        index++; // Avanzar al siguiente residuo
    }, 3000); // Intervalo

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
