import {Request,Response} from "express";
import {Foto} from "../entidades/Foto";
import {Producto} from "../entidades/Producto";
import {validate} from "class-validator";
const fs = require('fs').promises

const protocoloHttp:string = 'http://' // variable que con tiene el protocolo para agregarlo a la url de las imagenes que se van guardar en el servidor
const protocoloHttpSecure:string = 'https://'

export const obtenerFotos = async (req:Request,res:Response) =>{

    try {
        const fotos = await Foto.find({
                              select:{
                                  id:true,
                                  nombreFoto:true,
                                  direccionUrl:true
                                },
                                relations:{
                                  producto:true
                                }
                              });

        res.status(200).send(fotos);
    }
    catch(error){
        res.status(404).json({error:`Ha ocurrido un error al obtener fotos: ${error}`})
    }
}

export const obtenerFotoId = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const foto = await Foto.findOneBy({id: parseInt(id)})

            if(!foto){
                return res.status(406).json({error:`No existe foto con el ID: ${id}`})
            }

            res.status(200).json({foto:foto,hostname:req.headers.host})
        }catch(error){
            res.status(400).json({error:`Ha ocurrido un error al obtener foto por id: ${error}`})
    }
}

export const subirFoto = async (req:Request,res:Response)=>{

    try{
        let {
            nombreFoto,
            direccionUrl,
            id} = req.body;

        const buscarProducto = await Producto.findOneBy({id:id});

        if(!buscarProducto){
            return res.status(400).json({error:"El producto que selecciono no existe, ingrese otro nuevamente"});
        }
        const foto = new Foto();

        foto.nombreFoto = nombreFoto;
        foto.direccionUrl = direccionUrl;
        foto.producto = id;

        const errores = await validate(foto,{ validationError: { target: false } });

        if(errores.length > 0){
          return res.status(406).json({error:`Error de validadion:${errores}`});
        } else {
          await foto.save();
          res.status(201).json({mensaje:"Foto cargada con exito"})
        }

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al subir foto:${error}`})
    }
}

export const modificarFoto = async (req:Request, res:Response)=>{
    try{
        const foto = await Foto.findOneBy({id: parseInt(req.params.id)});

        if(!foto){
            return res.status(404).json({error:`Foto con el id no existe:${req.params.id}`});
        };
        let {nombreFoto, direccionUrl, producto} = req.body;

        foto.nombreFoto = nombreFoto;
        foto.direccionUrl = direccionUrl;
        foto.producto = producto;

        const errores = await validate(foto, { validationError: { target: false } });

        if(errores.length > 0){
          return res.status(406).send(errores);
        } else {
          // await Foto.update({id:parseInt(req.params.id)}, req.body);
          await foto.save();
          res.status(201).json({mensaje:`foto modificada con el id ${req.params.id}`});
        }

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al modificar foto: ${error}`});
    }
}

export const borrarFoto = async (req:Request, res:Response) =>{

    try{
        const foto = await Foto.findOneBy({id: parseInt(req.params.id)});
        console.log("headers", req.headers)
        if(!foto){
            return res.status(404).json({error:"La foto que desea eliminar con el id no existe"});
        } else {
          try {
            await fs.unlink(`./${foto.direccionUrl.replace(`${protocoloHttp}${req.headers.host}/`,"")}`)
          } catch (error) {
            console.log("error al eliminar foto de carpeta",error)
            return res.status(404).json({error:"Ha ocurrido un error al eliminar la foto"})
          }
        }


        const result = await Foto.delete({id:parseInt(req.params.id)});

        res.status(201).json({mensaje:"Foto eliminada!"})
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al eliminar foto: ${error}`})
    }
}

export const cargarImagen = async (req:Request, res:Response) => {

  try {
      res.status(200).json({
        mensaje:`Imagen cargada con exito!!`,
        path:protocoloHttp+req.headers.host+'/'+req.file!.path,
        nombreArchivo:req.file!.originalname      //lanza error possible undefined. el signo de exclamacion omite el error
      })

  } catch (error) {
    res.status(400).json({error:"Ha ocurrido un error al cargar imagen"})
  }
}
