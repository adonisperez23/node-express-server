import {Request, Response} from "express";
import {Pedido} from "../entidades/Pedido";
import {Producto} from "../entidades/Producto";
import {Factura} from "../entidades/Factura";

export const obtenerPedidos = async (req:Request,res:Response) =>{

    try {
        const pedidos = await Pedido.find();

        res.status(200).send(pedidos);
    }
    catch(error){
        res.status(404).json({error:`ha ocurrido un error al obtener pedidos:${error}`})
    }
}

export const obtenerPedidoId = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const pedido = await Pedido.findOneBy({id: parseInt(id)})

            if(!pedido){
                return res.status(406).json({mensaje:`no existe pedido con el ID: ${id}`})
            }

            res.status(200).send(pedido)
        }catch(error){
            res.status(400).json({error:`ha ocurrido un error al obtener pedido por id: ${error}`})
    }
}

export const nuevoPedido = async (req:Request,res:Response)=>{

    try{
        let {
            factura,
            producto,
            descripcion,
            precio,
            cantidad} = req.body;

        const buscarFactura = await Factura.findOneBy({id:factura});
        const buscarProducto = await Producto.findOneBy({id:producto})

        if(!buscarFactura){
            return res.status(400).json({error:"El nro de factura que selecciono no existe, ingrese otro nuevamente"});
        } else if (!buscarProducto){
            return res.status(400).json({error:"El producto que selecciono no existe, ingrese otro nuevamente"});
        }
        const pedido = new Pedido();

        pedido.factura = factura;
        pedido.producto = producto;
        pedido.descripcion = descripcion;
        pedido.precio = precio;
        pedido.cantidad = cantidad;

        await pedido.save();

        res.status(201).json({mensaje:`Pedido creado:${req.body}`});
    }catch(error){
        res.status(400).json({error:`ha ocurrido un error al ingresar un nuevo pedido:${error}`})
    }
}

export const modificarPedido = async (req:Request, res:Response)=>{
    try{
        const pedido = await Pedido.findOneBy({id: parseInt(req.params.id)});

        if(!pedido){
            return res.status(404).json({error:`pedido con el id no existe:${req.params.id}`});
        };

        await Pedido.update({id:parseInt(req.params.id)}, req.body);

        res.status(201).json({mensaje:`Pedido modificado con el id: ${req.params.id}`});
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error: ${error}`});
    }
}

export const borrarPedido= async (req:Request, res:Response) =>{

    try{
        const pedido = await Pedido.findOneBy({id: parseInt(req.params.id)});

        if(!pedido){
            return res.status(404).json({error:"el pedido que desea eliminar con el id no existe"});
        };

        const result = await Pedido.delete({id:parseInt(req.params.id)});

        res.status(201).json({mensaje:`Pedido eliminado con exito`})
    }catch(error){
        res.status(400).json({error:`ha ocurrido un error al borrar pedido: ${error}`})
    }
}
