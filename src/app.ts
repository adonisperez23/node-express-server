import express,{Request, Response} from "express";
import {localDataSource} from "./app-data-source";

//creando instancia con la configuracion de la bases de datos local
localDataSource
            .initialize()
            .then(()=>{
                console.log("la fuente de datos ha sido inicializada");
            })
            .catch((err:any)=>{
                console.log(`ha ocurrido el error : ${err}`);
            });

//instanciacion del modulo de express en la variable app
const app = express();
app.use(express.json()); // middleware que convierte la informacion mandada del servidor al cliente en formato json


app.get('/',(req:Request,res:Response)=>{
    res.send("hola mundo");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('servidor encendido!');
})