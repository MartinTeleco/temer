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
    { nombre: "bola", tipo: "plastico", origen: "casa" },
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
puntosSpan.textContent = puntos;
// Tiempo
let cont_tiempo = document.getElementById("cont_tiempo");
let segundos = 0;
cont_tiempo.textContent = "0:00";
let temporizador = null;



document.getElementById("reset").addEventListener("click", () => {
    window.location.reload(); // Reiniciar el juego
});

function comenzar_juego() {
    limpiarContenedores();

    // Agrupar basuras por contenedor de origen
    const agrupadasPorOrigen = {
        casa: basuras.filter(basura => basura.origen === "casa"),
        colegio: basuras.filter(basura => basura.origen === "colegio"),
        industria: basuras.filter(basura => basura.origen === "industria"),
        ciudad: basuras.filter(basura => basura.origen === "ciudad")
    };

    // Mostrar el primer residuo de cada contenedor al inicio
    for (const origen in agrupadasPorOrigen) {
        const residuos = agrupadasPorOrigen[origen];
        if (residuos.length > 0) {
            const basura = residuos[0]; // Primer residuo de este contenedor
            const img = document.createElement("img");
            img.src = `/img/residuos/${basura.nombre}.png`;
            img.id = basura.nombre;
            img.draggable = true;
            img.classList.add("img-residuo");

            arrastrar_basuras(img);

            // Agregar el residuo al contenedor correspondiente
            const contenedor = document.getElementById(origen);
            if (contenedor) {
                img.style.position = "absolute";
                img.style.left = `0px`; // Primera imagen alineada al principio
                img.style.top = "170px";
                contenedor.appendChild(img);
            }
        }
    }

    // Empezar el intervalo para los residuos restantes
    let index = 1; // Comenzar desde el segundo residuo
    const intervalo = setInterval(() => {
        let residuosAgregados = false;

        for (const origen in agrupadasPorOrigen) {
            const residuos = agrupadasPorOrigen[origen];
            if (index < residuos.length) {
                residuosAgregados = true;

                const basura = residuos[index];
                const img = document.createElement("img");
                img.src = `/img/residuos/${basura.nombre}.png`;
                img.id = basura.nombre;
                img.draggable = true;
                img.classList.add("img-residuo");

                arrastrar_basuras(img);

                // Agregar al contenedor correspondiente
                const contenedor = document.getElementById(origen);
                if (contenedor) {
                    const numResiduos = contenedor.querySelectorAll(".img-residuo").length;
                    img.style.position = "absolute";
                    img.style.left = `${numResiduos * 70}px`; // Separar residuos
                    img.style.top = "170px";
                    contenedor.appendChild(img);
                }
            }
        }

        if (!residuosAgregados) {
            clearInterval(intervalo); // Detener el intervalo cuando no queden residuos
        }

        index++; // Avanzar al siguiente residuo
        fin_juego(); //verificar por tema residuos
    }, 6000); // Intervalo de 6 segundos

    // Resetear puntuación
    puntos = 0;
    puntosSpan.textContent = puntos;

    // Arrancar el conteo de tiempo
    arrancar_tiempo();
}

function fin_juego() {
    // Verificar si los contenedores están vacíos
    const contenedores = [colegio, ciudad, casa, industria];
    let estanVacios = true;

    for (const contenedor of contenedores) {
        if (contenedor.querySelectorAll(".img-residuo").length > 0) {
            estanVacios = false;
            break; 
        }
    }

    if (estanVacios) {

        finalizarJuego(nombre, puntos);
        clearInterval(temporizador); 
        PopupFinal();
    }
}

function PopupFinal() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";

    // Configurar botones
    document.getElementById("replay").addEventListener("click", () => {
        popup.style.display = "none";
        window.location.reload(); // Reinicia el juego
    });

    document.getElementById("exit").addEventListener("click", () => {
        popup.style.display = "none";
        window.location.href = "ranking.html"; // Cambia a otra página
    });
}

function arrancar_tiempo() {
    if (temporizador) clearInterval(temporizador);

    temporizador = setInterval(() => {
        segundos++;
        let min = Math.floor(segundos / 60);
        let sec = segundos % 60;
        cont_tiempo.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
    }, 1000);
    
    fin_juego(); //verificar por tema tiempo
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
                document.getElementById(basuraId).remove(); // Ocultar basura
            } else {
                puntos -= 5; // Penalización
            }

            puntosSpan.textContent = puntos; // Actualizar puntuación
            fin_juego();
        });
    }

}

async function finalizarJuego(nombre, puntos) {
    const response = await fetch(`/api/jugadores/${nombre.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puntos }),
    });

    if (response.ok) {
       // alert('Puntos actualizados correctamente!');
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
}


document.getElementById('btnRegister').addEventListener('click', async () => {
     const nombre = document.getElementById('nombre').value;
     const password = document.getElementById('password').value;
     console.log("Datos a enviar:", { nombre, password });
     if (!nombre || !password) {
         alert('Por favor ingresa un nombre y una contraseña.');
         return;
     }
     const puntos =0;
     // Enviar los datos al servidor para registrar
     const response = await fetch('/api/jugadores/registro', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         
         body: JSON.stringify({ nombre, password, puntos}), // Asegúrate de que los datos estén en formato JSON
     });

     console.log('Respuesta del servidor:', response);  // Este log ayudará a depurar

     if (response.ok) {
         alert('Usuario registrado correctamente!');
         iniciarCuentaRegresiva(); 
         
     } else {
         const error = await response.json();
         alert(`Error: ${error.error}`);
     }
 });


 document.getElementById('btnLogin').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;

    if (!nombre || !password) {
        alert('Por favor ingresa un nombre y una contraseña.');
        return;
    }

    try {
        // Verificar los datos con el servidor
        const response = await fetch('/api/jugadores/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            iniciarCuentaRegresiva();
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error al iniciar sesión.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectarse con el servidor.');
    }
});


// Contador de cuenta regresiva
let cuentaRegresiva = 3; // Tiempo en segundos para la cuenta regresiva
let intervaloCuentaRegresiva;

// Función para mostrar la cuenta regresiva
function iniciarCuentaRegresiva() {
    
    // Ocultar el popup de inicio
    document.getElementById('popup-inicio').style.display = "none";

    // Mostrar la cuenta regresiva (desocultar el div)
    document.getElementById('cuenta-regresiva').style.display = "block";
    
    // Referencia al elemento que mostrará la cuenta regresiva
    const cuentaRegresivaElement = document.querySelector(".contador");

    cuentaRegresivaElement.textContent = `¡Comenzamos en ${cuentaRegresiva}...`;
    console.log(cuentaRegresiva);

    intervaloCuentaRegresiva = setInterval(() => {
        cuentaRegresiva--; // Disminuye el contador
        console.log(cuentaRegresiva);
        cuentaRegresivaElement.textContent = `¡Comenzamos en ${cuentaRegresiva}...`;

        if (cuentaRegresiva <= 0) {
            clearInterval(intervaloCuentaRegresiva); // Detener el temporizador
            document.getElementById('cuenta-regresiva').style.display = "none";
            comenzar_juego(); // Inicia el juego cuando se acabe la cuenta regresiva
        }
    }, 1000); // Cada segundo
}



// Configurar todo al cargar
configurar_destinos();