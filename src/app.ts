import express,{Request, Response} from "express";
import {localDataSource} from "../app-data-source";

localDataSource
            .initialize()
            .then(()=>{
                console.log("la fuente de datos ha sido inicializada");
            })
            .catch((err:any)=>{
                console.log(`ha ocurrido el error : ${err}`);
            });


const app = express();
app.use(express.json());


app.get('/',(req:Request,res:Response)=>{
    res.send("hola mundo");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('servidor encendido!');
})
