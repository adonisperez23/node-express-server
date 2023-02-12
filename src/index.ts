import "reflect-metadata";
import {Request, Response} from "express";

import app from "./app";
import {localDataSource} from "./db";

const PORT = process.env.PORT || 3000;
async function main(){
    try{
        //creando instancia con la configuracion de la bases de datos local
        await localDataSource
                    .initialize()
                    .then(()=>{
                        console.log("la fuente de datos ha sido inicializada");
                    })
                    .catch((err:any)=>{
                        console.log(`ha ocurrido el error : ${err}`);
                    });
        
        await app.listen(PORT, ()=>{
            console.log(`servidor encendido en el puerto ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
        
    }
    
main();
