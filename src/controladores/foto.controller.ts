import {Request,Response} from "express";
import {Foto} from "../entidades/Foto";
import {Producto} from "../entidades/Producto";
import {validate} from "class-validator";


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

            res.status(200).send(foto)
        }catch(error){
            res.status(400).json({error:`Ha ocurrido un error al obtener foto por id: ${error}`})
    }
}

export const subirFoto = async (req:Request,res:Response)=>{

    try{
        let {
            nombreFoto,
            direccionUrl,
            producto} = req.body;

        const buscarProducto = await Producto.findOneBy({id:producto});

        if(!buscarProducto){
            return res.status(400).json({error:"El producto que selecciono no existe, ingrese otro nuevamente"});
        }
        const foto = new Foto();

        foto.nombreFoto = nombreFoto;
        foto.direccionUrl = direccionUrl;
        foto.producto = producto;

        const errores = await validate(foto,{ validationError: { target: false } });

        if(errores.length > 0){
          return res.status(406).send(errores);
        } else {
          await foto.save();
          res.status(201).json({mensaje:"Foto registrada con exito"})
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

export const borrarFoto= async (req:Request, res:Response) =>{

    try{
        const foto = await Foto.findOneBy({id: parseInt(req.params.id)});

        if(!foto){
            return res.status(404).json({error:"La foto que desea eliminar con el id no existe"});
        };

        const result = await Foto.delete({id:parseInt(req.params.id)});

        res.status(201).json({mensaje:"Foto eliminada!",resultado:result})
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al eliminar foto: ${error}`})
    }
}
