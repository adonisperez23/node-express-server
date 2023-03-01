import multer from "multer"
import {Request} from "express"
// Modulo para enviar imagenes desde el cliente al servidor
const storage = multer.diskStorage({
      destination: (req:Request, archivo:any, cb:any) =>{
        cb(null, './galeria') // Carpeta donde se alojara el archivo recibido en la memoria, cb es callback
                              // retornara null en caso de error y la ubicacion en caso de exito
      },
      filename:(req:Request,archivo:any,cb:any) =>{
        cb(null,`${archivo.originalname}`) // Nombre del archivo que se guardara en la direccion establecida
      }
    })

export const upload = multer({storage})
