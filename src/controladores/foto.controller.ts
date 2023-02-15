import {Request,Response} from "express"
import {Foto} from "../entidades/Foto"
import {Producto} from "../entidades/Producto"


export const obtenerFotos = async (req:Request,res:Response) =>{

    try {
        const fotos = await Foto.find();

        res.status(200).send(fotos);
    }
    catch(error){
        res.status(404).json({error:`ha ocurrido un error ${error}`})
    }
}

export const obtenerFotoId = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const foto = await Foto.findOneBy({id: parseInt(id)})

            if(!foto){
                return res.status(406).json({mensaje:`no existe foto con el ID: ${id}`})
            }

            res.status(200).send(foto)
        }catch(error){
            res.status(400).json({mensaje:`ha ocurrido un error: ${error}`})
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

        await foto.save();

        res.status(201).json({foto_creado:`${req.body}`});
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error:${error}`})
    }
}

export const modificarFoto = async (req:Request, res:Response)=>{
    try{
        const foto = await Foto.findOneBy({id: parseInt(req.params.id)});

        if(!foto){
            return res.status(404).json({mensaje:`foto con el id no existe:${req.params.id}`});
        };

        await Foto.update({id:parseInt(req.params.id)}, req.body);

        res.status(201).json({mensaje:`foto modificada con el id ${req.params.id}`});
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`});
    }
}

export const borrarFoto= async (req:Request, res:Response) =>{

    try{
        const foto = await Foto.findOneBy({id: parseInt(req.params.id)});

        if(!foto){
            return res.status(404).json({mensaje:"el foto que desea eliminar con el id no existe"});
        };

        const result = await Foto.delete({id:parseInt(req.params.id)});

        res.status(201).send(`foto eliminada con exito ${result}`)
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`})
    }
}
