import express from "express";
import morgan from "morgan";
import cors from "cors";
import rutasUsuario from "./rutas/usuario.routes"
import rutasProducto from "./rutas/producto.routes"
import rutasFoto from "./rutas/foto.routes"
import rutasFactura from "./rutas/factura.routes"
import rutasPedido from "./rutas/pedido.routes"

const llaves = require("../llaves")
//instanciacion del modulo de express en la variable app
const app = express();


app.set('llave',llaves.llave); // establece la clave con el contenido de la variable llaves usadas con el modulo jsonWebToken
app.use(express.urlencoded({extended:false})); //middleware para que el servidor renozca peticiones como objetos de string o arrays
app.use(express.json()); // middleware que hace que el servidor reconozca la informacion recibida al servidor como formato json.
app.use(morgan('dev')); //muestra las peticiones que llegan al servidor por la consola
app.use(cors());// permite hacer peticiones entre servidores externos
app.use('/galeria',express.static('galeria')) // Middleware para obtener imagenes estaticas desde frontend en la carpeta alojada en el backend


//rutas para entidad usuario
app.use(rutasUsuario)
//rutas para entidad producto
app.use(rutasProducto);
//rutas para entidad foto
app.use(rutasFoto);
//rutas para entidad facturas
app.use(rutasFactura);
//rutas para entidad pedido
app.use(rutasPedido);

export default app
