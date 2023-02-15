import {Request,Response} from "express"
import {Factura} from "../entidades/Factura"
import {Usuario} from "../entidades/Usuario"
import {Pedido} from "../entidades/Pedido"

export const obtenerFacturas = async (req:Request,res:Response) =>{

    try {
        const facturas = await Factura.find();

        res.status(200).send(facturas);
    }
    catch(error){
        res.status(404).json({error:`ha ocurrido un error con lista factura: ${error}`})
    }
}

export const obtenerFacturaId = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const factura = await Factura.findOneBy({id: parseInt(id)})

            if(!factura){
                return res.status(406).json({mensaje:`no existe factura con el ID: ${id}`})
            }

            res.status(200).send(factura)
        }catch(error){
            res.status(400).json({error:`ha ocurrido un error al buscar factura: ${error}`})
    }
}

export const generarFactura = async (req:Request,res:Response)=>{

    try{
        let {
            usuario,
            montoTotal,
            listaPedidos} = req.body;

        const buscarUsuario = await Usuario.findOneBy({id:usuario});

        if(!buscarUsuario){
            return res.status(400).json({error:"El usuario que selecciono no existe, ingrese otro nuevamente"});
        }
        const factura = new Factura();

        factura.usuario = usuario;
        factura.montoTotal = montoTotal;
        console.log("monto total ", factura.montoTotal)
        await factura.save();

        listaPedidos.forEach((pedido:any) => {
          const entidadPedido = new Pedido();

          entidadPedido.factura = factura;
          entidadPedido.producto = pedido.producto;
          entidadPedido.precio = pedido.precio;
          entidadPedido.cantidad = pedido.cantidad;
          entidadPedido.descripcion = pedido.descripcion;

          entidadPedido.save();

        })


        console.log("factura id:",factura.id);

        res.status(201).json({mensaje:`factura ${factura.id} registrada con exito`});
    }catch(error){
        res.status(400).json({error:`ha ocurrido un error al generar factura${error}`})
    }
}

export const modificarFactura = async (req:Request, res:Response)=>{
    try{
        const factura = await Factura.findOneBy({id: parseInt(req.params.id)});

        if(!factura){
            return res.status(404).json({mensaje:`factura con el id no existe:${req.params.id}`});
        };

        await Factura.update({id:parseInt(req.params.id)}, req.body);

        res.status(201).json({mensaje:`factura modificada con el id ${req.params.id}`});
    }catch(error){
        res.status(400).json({error:`ha ocurrido un error al modificar factura : ${error}`});
    }
}

export const borrarFactura= async (req:Request, res:Response) =>{

    try{
        const factura = await Factura.findOneBy({id: parseInt(req.params.id)});

        if(!factura){
            return res.status(404).json({mensaje:"el factura que desea eliminar con el id no existe"});
        };

        const result = await Factura.delete({id:parseInt(req.params.id)});

        res.status(201).json({mensaje:"factura eliminada"})
    }catch(error){
        res.status(400).json({error:`ha ocurrido un error con al borrar factura : ${error}`})
    }
}
