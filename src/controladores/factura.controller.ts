import {Request,Response} from "express";
import {Factura} from "../entidades/Factura";
import {Usuario} from "../entidades/Usuario";
import {Pedido} from "../entidades/Pedido";
import {validate} from "class-validator";
import {armarMensaje} from "../utils/ordenarMensaje.util"
// import container from "../utils/ioc.util"


const queryString = require('querystring')

// const whatsapCliente = container.get('whatsap-client') // Obtenemos la instancia de WhatsAppClient para enviar mensajes
// const db = container.get('localDataSource')


export const obtenerFacturas = async (req:Request,res:Response) =>{

    try {
        const facturas = await Factura.find({
          select:{             //Opciones para que extraiga datos completos
            id:true,           //de factura y sus respectivas relaciones
            montoTotal:true,
            fechaHora:true
          },
          relations:['usuario','pedido','pedido.producto']
        });

        res.status(200).send(facturas);
    }
    catch(error){
        res.status(404).json({error:`Ha ocurrido un error con lista factura: ${error}`})
    }
}

export const obtenerFacturaId = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const factura = await Factura.findOneBy({id: parseInt(id)})

            if(!factura){
                return res.status(406).json({error:`No existe factura con el ID: ${id}`})
            }

            res.status(200).send(factura)
        }catch(error){
            res.status(400).json({error:`Ha ocurrido un error al buscar factura: ${error}`})
    }
}
export const obtenerListaFacturaPorIdUsuario = async (req:Request, res:Response) => {

        try {
            const {id} = req.params;

            const facturas = await Factura.find({
              select:{             //Opciones para que extraiga datos completos
                id:true,           //de factura y sus respectivas relaciones
                montoTotal:true,
                fechaHora:true
              },
              relations:['usuario','pedido','pedido.producto'],
              where:{
                usuario:{
                  id:+id
                }
              }
            });

            // if(facturas.length === 0){
            //     return res.status(406).json({error:`El usuario no ha realizado facturas por los momentos`})
            // }

            res.status(200).send(facturas)
        }catch(error){
            res.status(400).json({error:`Ha ocurrido un error al buscar factura: ${error}`})
    }
}

export const generarFactura = async (req:Request,res:Response)=>{

    try{
        let {
            usuario,
            listaPedidos} = req.body;

        const buscarUsuario = await Usuario.findOneBy({id:usuario});
        if(!buscarUsuario){
            return res.status(400).json({error:"El usuario que selecciono no existe, ingrese otro nuevamente"});
        }
        const factura = new Factura();

        factura.usuario = usuario;
        factura.montoTotal = listaPedidos.reduce((acum:number,pedido:Pedido)=>{ return acum + (pedido.precio * pedido.cantidad)},0);


        const errores = await validate(factura,{ validationError: { target: false } })

        if(errores.length > 0){
          return res.status(406).json({error:`Error de validacion ${errores}`});
        } else {
            await factura.save();
        }

        listaPedidos.forEach(async (pedido:Pedido) => {  // Una factura puede contener varios pedidos,
                                                //por lo tanto se debe crear varios pedidos con la misma factura
          const entidadPedido = new Pedido();

          entidadPedido.factura = factura;
          entidadPedido.producto = pedido.producto;
          entidadPedido.precio = pedido.precio;
          entidadPedido.cantidad = pedido.cantidad;
          entidadPedido.descripcion = pedido.descripcion;

          const errores = await validate(entidadPedido, { validationError: { target: false } }) // valida cada dato que se ingresara a la bases de datos

          if(errores.length > 0){
            return res.status(406).send(errores)
          } else {
            await entidadPedido.save();
            // pedidosFactura.push(entidadPedido)
          }

        })

        const mensaje = await armarMensaje(factura.fechaHora,buscarUsuario.telefono, buscarUsuario.nombre, listaPedidos,factura.montoTotal);
        if(mensaje.length > 0){
          // const mensajeEnviado = await whatsapCliente.sendMsg(mensaje,'584148942782');// debido a problemas de consistencia con el modulo de apiwhatsapp, se usara whatsap link para enviar pedidos por whatsap
          // console.log("mensaje",mensaje)
          const mensajeEnviado = queryString.escape(mensaje) //codifica el string en utf-8 para enviar el mensaje por el url de whatsap link
          return res.status(201).json(
            {
              mensaje:`Factura nro: ${factura.id} registrada con exito. Enviando Pedido...`,
              mensajeEncoded:mensajeEnviado
            });

        }


    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al generar factura${error}`})
    }
}

export const modificarFactura = async (req:Request, res:Response)=>{
    try{
        const factura = await Factura.findOneBy({id: parseInt(req.params.id)});

        if(!factura){
            return res.status(404).json({error:`Factura con el id no existe:${req.params.id}`});
        };
        let {usuario,montoTotal} = req.body;

        factura.usuario = usuario;
        factura.montoTotal = montoTotal;

        const errores = await validate(factura, { validationError: { target: false } });

        if(errores.length > 0){
          return res.status(406).send(errores);
        } else {
          await factura.save()
          res.status(201).json({mensaje:`Factura modificada con el id ${req.params.id}`});
        }


    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al modificar factura : ${error}`});
    }
}

export const borrarFactura= async (req:Request, res:Response) =>{

    try{
        const factura = await Factura.findOneBy({id: parseInt(req.params.id)});

        if(!factura){
            return res.status(404).json({error:"La factura que desea eliminar con el id no existe"});
        };

        const result = await Factura.delete({id:parseInt(req.params.id)});

        res.status(201).json({mensaje:"factura eliminada", resultado:result})
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error con al borrar factura : ${error}`})
    }
}
