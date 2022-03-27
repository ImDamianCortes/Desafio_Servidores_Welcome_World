var port = 8080

// Paso 1: Importar el módulo http en una constante.

const http = require('http');
const url = require('url');
const fs = require('fs');
const { REFUSED } = require('dns');

//1.   Crear un servidor en Node con el módulo http.  
http
    .createServer(function (req, res) {

        const params = url.parse(req.url, true).query    // Almacenar los parámetros de la consulta en una constante con el método parse del módulo url y su propiedad query.

        //Inputs.name
        const archivo = params.archivo          //nombre del archivo(crear, leer, eliminar)
        const contenido = params.contenido      //contenido(crear)
        const nombre = params.nombre            //archivo a renombrar
        const nuevoNombre = params.nuevoNombre  //nuevo nombre de archivo

        // 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato “dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la izquierda. (Opcional) 

        // Fecha Actual
        let fecha = new Date();
        // Definiendo en variables el año mes y dia
        let ano = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();

        // En caso de ser menor a diez concatenar un cero antes
        if (mes < 10) {
            mes = `0${mes}`
        }

        if (dia < 10) {
            dia = `0${dia}`
        }
        // ordenando segun requerimiento
        let fechaActual = `${dia}/${mes}/${ano}`;

        if (req.url == '/') {
            //console.log(req.url)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            fs.readFile('index.html', 'utf8', (err, html) => {

             res.write(html)
             res.end()

            // o solo la respuesta como parametro de res.end()

            //res.end(html)
            })
        }

        // 2.   Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida.
        if (req.url.includes('/crear')) {
            fs.writeFile(archivo, `${fechaActual}\n${contenido}`, (err, data) => {
                res.write(`${fechaActual}archivo creado con exito`)
                res.end()
            })
        }

        // 3.   Disponibilizar  una  ruta  para  devolver  el  contenido  de  un  archivo  cuyo  nombre  es declarado en los parámetros de la consulta recibida.
        if (req.url.includes('/leer')) {
            fs.readFile(archivo, (err, data) => {
                if (err) {
                    res.write(`El archivo no existe !!!`)
                    res.end()
                } else {
                    res.write(`archivo encontrado con existo \n${data}`)
                    res.end()
                }
            })
        }
        // 4.   Disponibilizar  una  ruta  para renombrar un archivo, cuyo nombre y nuevo nombre es declarado en los parámetros de la consulta recibida.  
        if (req.url.includes('/renombrar')) {
            fs.rename(nombre, nuevoNombre, (err, data) => {
                if (err) {
                    res.write(`El archivo que quiere renombrar no existe !!!`)
                    res.end()
                } else {
                    // 8.   En  la  ruta  para  renombrar,  devuelve  un  mensaje  de  éxito  incluyendo  el  nombre anterior del archivo y su nuevo nombre de forma dinámica . (Opcional) 
                    res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
                    res.end()
                }

            })
        }
        // 5.   Disponibilizar  una  ruta  para  eliminar  un  archivo,  cuyo  nombre  es  declarado  en  los parámetros de la consulta recibida.  
        if (req.url.includes('/eliminar')) {
            res.write(`Tu solicitud para eliminar el archivo ${archivo} se está procesando`)
            res.end()

            fs.unlink(archivo, (err, data) => {
                if (err) {
                    res.write(`El archivo que quiere eliminar no existe !!!`)
                    res.end()
                } else {
                    // ************* PENDIENTE *************** 
                    // 9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente  mensaje:  “Tu  solicitud  para  eliminar  el  archivo  <nombre_archivo>  se  está procesando”,  y  luego  de  3  segundos  envía  el  mensaje  de  éxito  mencionando  el nombre del archivo eliminado. (Opcional)
                    res.write(`Archivo ${archivo} eliminado con éxito`)
                    res.end(`Archivo ${archivo} eliminado con éxito`)
                }
            })

        }

    })
    .listen(`${port}`, () => console.log(`Servidor encendido. http://localhost:${port}`))



