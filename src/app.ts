import express from "express";
import morgan from "morgan";
import cors from "cors";
import rutasUsuario from "./rutas/usuario.routes"
import rutasProducto from "./rutas/producto.routes"

const llaves = require("../llaves")
//instanciacion del modulo de express en la variable app
const app = express();

app.set('llave',llaves.llave); // establece la clave con el contenido de la variable llaves usadas con el modulo jsonWebToken
app.use(express.urlencoded({extended:false})); //middleware para que el servidor renozca peticiones como objetos de string o arrays
app.use(express.json()); // middleware que hace que el servidor reconozca la informacion recibida al servidor como formato json.
app.use(morgan('dev')); //muestra las peticiones que llegan al servidor por la consola
app.use(cors());// permite hacer peticiones entre servidores externos


//rutas para entidad usuario

app.use(rutasUsuario)
//rutas para entidad producto
app.use(rutasProducto);;

export default app