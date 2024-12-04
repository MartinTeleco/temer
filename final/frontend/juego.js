	
    
    
// Sus contenedores, no las fotos (DE DONDE SALEN - DRAG)				
let casa   = document.getElementById("casa"); 
let colegio = document.getElementById("colegio");
let industria = document.getElementById("industria");
let ciudad = document.getElementById("ciudad");

//Los contenedores de los contenedores de basura (RECEPTORES - DROP)
let carton = document.getElementById("carton"); 
let plastico = document.getElementById("plastico");
let vidrio = document.getElementById("vidrio");
let organico = document.getElementById("organico");

let basuraEnColegio = []; //tendre q hacer un cargar tapete inicial para cada una de estas?
let basuraEnCasa = [];
let basuraEnIndustria = [];
let basuraEnCiudad = []; 
let basuraEnCarton = [];
let basuraEnPlastico = [];
let basuraEnVidrio = [];
let basuraEnOrganico = [];

let cont_movimientos = document.getElementById("cont_movimientos");

// Tiempo
let cont_tiempo  = document.getElementById("cont_tiempo"); // span cuenta tiempo
let segundos 	   = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

