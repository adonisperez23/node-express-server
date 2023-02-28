import multer from "multer"
import {Request} from "express"
const storage = multer.diskStorage({
      destination: (req:Request, archivo:any, cb:any) =>{
        cb(null, './galeria') // van las imagenes crudas
      },
      filename:(req:Request,archivo:any,cb:any) =>{
        cb(null,`${archivo.originalname}`)
      }
    })

export const upload = multer({storage})
