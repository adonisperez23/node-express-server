import {Request,Response} from "express"
import {Producto} from "../entidades/Producto"

export const obtenerProductos = async (req:Request,res:Response) =>{
    
    try {
        const productos = await Producto.find();
        
        res.status(200).send(productos);
    }
    catch(error){
        res.status(404).json({error:`ha ocurrido un error ${error}`})
    }
}

export const obtenerProductoId = async (req:Request, res:Response) => {
    
        try {
            const {id} = req.params;
            
            const producto = await Producto.findOneBy({id: parseInt(id)})
            
            if(!producto){
                return res.status(406).json({mensaje:`no existe producto con el ID: ${id}`})
            }
            
            res.status(200).send(producto)
        }catch(error){
            res.status(400).json({mensaje:`ha ocurrido un error: ${error}`})
    }
}

export const registrarProducto = async (req:Request,res:Response)=>{
    
    try{
        let {
            nombreProducto,
            categoria,
            descripcion,
            precio,
            disponible} = req.body;
        
        const producto = new Producto();
        
        if(descripcion.length === 0){
            descripcion = "Por ahora no hay una descripcion del producto"
        }
        if(precio === null || precio.length === 0){
            precio = 0
        }
        
        producto.nombreProducto = nombreProducto;
        producto.categoria = categoria;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.disponible = disponible;
        
        await producto.save();
         
        res.status(201).json({producto_creado:`${producto}`});
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error:${error}`})
    }
}

export const actualizarProducto = async (req:Request, res:Response)=>{
    try{
        const producto = await Producto.findOneBy({id: parseInt(req.params.id)});
        
        if(!producto){
            return res.status(404).json({mensaje:`producto con el id no existe:${req.params.id}`});
        };
        
        await Producto.update({id:parseInt(req.params.id)}, req.body);
        
        res.status(204).json({mensaje:`producto creado con el id ${req.params.id}`});
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`});
    }
}   

export const eliminarProducto = async (req:Request, res:Response) =>{
    
    try{
        const producto = await Producto.findOneBy({id: parseInt(req.params.id)});
        
        if(!producto){
            return res.status(404).json({mensaje:"el producto que desea eliminar con el id no existe"});
        };
        
        const result = await Producto.delete({id:parseInt(req.params.id)});
        
        res.status(204).send(`producto eliminado con exito ${result}`)
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`})
    }
}