//Express
const express = require("express");
const hbs = require('hbs');
require('dotenv').config();

const app = express();

const port = process.env.PORT;


//Handlebars
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine', 'hbs');


//Para que cualquier persona que sepa el url de nuestra pagina pueda ver (ejecutar) archivos publicos, tenemos que agregar esos archivos dentro de una carpeta que se llame "public"
//Para hacer que esa carpeta y su contenido sea publico, se usa un middleware:
app.use(express.static(__dirname + "/public")); //El metdo static indica que la pagina sera estatica y utilizara lo que esta dentro de public, y por lo tanto ocupara el lugar de "./" y al hacer la solicitud get ahi, se cargara el archivo "index.html" que esta dentro de la carpeta "public", en vez de cargar la respuesta que se envio en el res.send() de abajo
//El path "/" es igual a lo que esta directamente dentro de la carpeta "public", pero solo cargara el archivo que se llame index.html
//Ahora, si queremos cargar un archivo html pero en otro path, por ejemplo, que en vez de que se cargue la respuesta enviada en el app.get("./hola-mundo"), se cargue un archivo .html, tenemos que crear dentro de la carpeta "public", otra carpeta con el nombre de ese path, en este caso "hola-mundo" y poner dentro de ahi el archivo index.html que se va cargar en ese path
//Lo que hara nuestra aplicacion (gracias al middleware) es checar si hay alguna carpeta dentro del public con el nombre de algun path, y utilizar los archivos que estan ahi, los cuales es como si los mandaras a llamar con un metodo get. Si no hay una carpeta con el nombre de un path, entonces si pasara a mandar como respuesta lo que le mandemos en el app.get(`/hola-mundo`)
//Si no entiendes esto, regresa a ver la clase 89




// app.get(`/`, (req, res) => {
//     res.send(`respuesta de esta ruta`);
// }) //Esto ya no se va ejecutar, por que ya se llamo al index.html dentro de esa ruta gracias al middleware

app.get(`/`, (req, res) => {
    res.render('home', {
        curso: "Curso de node",
        nombre: "Victorito"

    });
})
app.get(`/elements`, (req, res) => {
    res.render('elements', {
        curso: "Curso de node",
        nombre: "Victorito"

    });
})
app.get(`/generic`, (req, res) => {
    res.render('generic', {
        curso: "Curso de node",
        nombre: "Victorito"

    });
})

// app.get(`/generic`, (req, res) => {
//     res.sendFile(__dirname + `/public/generic.html`);
// })

// app.get(`/elements`, (req, res) => {
//     res.sendFile(__dirname + `/public/elements.html`);
// })

app.get(`*`, (req, res) => {
    res.sendFile(__dirname + `/public/404.html`); //Este metodo enviara una respuesta que  ejecutara un determinado archivo dentro de ese path, en este caso, dentro de cualquier path no definido
})

//__dirname es el path donde esta ubicada nuestra ubicacion, es como si pusieramos `./public/404.html` (observa que hay un puntito), pero express pide que lo pongamos de la manera anterior: con __dirname
//Recuerda que lo que va en el public, es publico para el usuario

app.listen(port , ()=>{
    console.log("Server is listening");
})