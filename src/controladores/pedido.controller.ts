import {Request, Response} from "express";
import {Pedido} from "../entidades/Pedido";
import {Producto} from "../entidades/Producto";
import {Factura} from "../entidades/Factura";
import {validate} from "class-validator";

export const obtenerPedidos = async (req:Request,res:Response) =>{

    try {
        const pedidos = await Pedido.find({
          select:{
            id:true,
            descripcion:true,
            cantidad:true,
            precio:true,
          },
          relations:{
            producto:true,
            factura:true
          }
        });

        res.status(200).send(pedidos);
    }
    catch(error){
        res.status(404).json({error:`Ha ocurrido un error al obtener pedidos:${error}`})
    }
}

export const obtenerPedidoId = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const pedido = await Pedido.findOneBy({id: parseInt(id)})

            if(!pedido){
                return res.status(406).json({error:`No existe pedido con el ID: ${id}`})
            }

            res.status(200).send(pedido)
        }catch(error){
            res.status(400).json({error:`Ha ocurrido un error al obtener pedido por id: ${error}`})
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

        const errores = await validate(pedido, { validationError: { target: false } });

        if(errores.length > 0){
          return res.status(406).send(errores);
        } else {
          await pedido.save();
          res.status(201).json({mensaje:"Pedido creado"});
        }

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al ingresar un nuevo pedido:${error}`})
    }
}

export const modificarPedido = async (req:Request, res:Response)=>{
    try{
        const pedido = await Pedido.findOneBy({id: parseInt(req.params.id)});

        if(!pedido){
            return res.status(404).json({error:`Pedido con el id no existe:${req.params.id}`});
        };
        let {descripcion, precio, cantidad } = req.body;

        pedido.descripcion = descripcion
        pedido.precio = precio
        pedido.cantidad = cantidad

        const errores = await validate(pedido, { validationError: { target: false } })

        if(errores.length > 0){
          return res.status(406).send(errores)
        } else {
          await pedido.save()
          res.status(201).json({mensaje:"Pedido modificado"});
        }

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al modificar pedido: ${error}`});
    }
}

export const borrarPedido= async (req:Request, res:Response) =>{

    try{
        const pedido = await Pedido.findOneBy({id: parseInt(req.params.id)});

        if(!pedido){
            return res.status(404).json({error:"El pedido que desea eliminar con el id no existe"});
        };

        const result = await Pedido.delete({id:parseInt(req.params.id)});

        res.status(201).json({mensaje:"Pedido eliminado con exito", resultado:result})
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al borrar pedido: ${error}`})
    }
}
