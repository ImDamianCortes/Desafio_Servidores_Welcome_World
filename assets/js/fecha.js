// 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato “dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la izquierda. (Opcional) 

// fecha actual
let fecha = new Date();
let ano = fecha.getFullYear();
let mes = fecha.getMonth() + 1;
let dia = fecha.getDate();

if (mes < 10) {
    mes = `0${mes}`
}

if (dia < 10) {
    dia = `0${dia}`
}

let fechaActual = `${dia}/${mes}/${ano}`;

console.log(fechaActual);