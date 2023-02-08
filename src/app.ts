import express from "express";
import morgan from "morgan";
import cors from "cors";
//instanciacion del modulo de express en la variable app
const app = express();

app.use(express.json()); // middleware que convierte la informacion mandada del servidor al cliente en formato json
app.use(morgan('dev'));
app.use(cors());

export default app;