import express from "express";
import morgan from "morgan";
import cors from "cors";
import rutasUsuario from "./rutas/usuario.routes"
//instanciacion del modulo de express en la variable app
const app = express();

app.use(express.json()); // middleware que convierte la informacion mandada del servidor al cliente en formato json
app.use(morgan('dev')); //muestra las peticiones que llegan al servidor por la consola
app.use(cors());// permite hacer peticiones entre servidores externos

app.use(rutasUsuario);

export default app;