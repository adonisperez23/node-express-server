import {Request, Response} from "express";
import {Usuario} from "../entidades/Usuario";
import {generarToken,verificarToken} from "../utils/jwt.util";
import {generarHash,compararHash} from "../utils/bcrypHash.util"
import {enviarCorreo} from "../utils/nodemailTransporter.util"
import app from "../app";
import { validate , minLength} from "class-validator";
import {Client, LocalAuth} from "whatsapp-web.js";
import {crearSesion} from "../utils/clienteWhatsapp.util"
// import {image as imageQr} from "qr-image";
// const path = require('path');

export const holaMundo = (req:Request,res:Response) =>{
    res.send("hola mundo");
}

export const obtenerUsuarios = async (req:Request, res:Response)=>{
    try{
        const listaUsuario = await Usuario.find();

        res.status(200).send(listaUsuario);

    }catch(error){
            res.status(404).json({error:`Ha ocurrido un error al obtener usuarios: ${error}`});
    }

}

export const obtenerUsuarioId = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;

        const usuario = await Usuario.findOneBy({id: parseInt(id)})

        if(!usuario){
            return res.status(406).json({error:`No existe usuario con el ID: ${id}`})
        }

        res.status(200).send(usuario)
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al obtener usuario por ID: ${error}`})
    }
}


export const registrarUsuario = async (req:Request,res:Response)=>{

    try{
        let {nombre, telefono, email, clave} = req.body;


        const usuario = new Usuario();
        const buscarEmail = await Usuario.findOneBy({email:email})

        if(buscarEmail){
           return res.status(400).json({error:`Ya existe ese email ${buscarEmail.email}`})
        }

        usuario.nombre = nombre;
        usuario.telefono = telefono;
        usuario.email = email;

        let esClaveValida = await minLength(clave,5)
        if(!esClaveValida){
            return res.status(400).json({error:"La clave debe contener mas de 5 caracteres"})
        } else{
          usuario.clave = await generarHash(clave); // encripta la clave ingresada por el usuario
        }

        const errores = await validate(usuario, { validationError: { target: false } }); // no devuelve el objeto a validar en la respuesta enviada al cliente

        if(errores.length > 0){
          return res.status(400).json(errores)
        } else {
            await usuario.save();
            res.status(201).json({mensaje:"Usuario creado con exito"});
        }

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error:${error}`})
    }
}

export const autenticarUsuario = async (req:Request, res:Response) =>{
    try{
        let {email,clave} = req.body;
        const usuario = await Usuario.findOneBy({email:email})

        if(!usuario){
            return res.status(404).json({error:"Cuenta email no existe"}) //404 not found
        }

        const ES_CLAVE_VALIDA =  await compararHash(clave,usuario.clave)

        if(ES_CLAVE_VALIDA){
          const payload = {autenticado:true};
          const token = generarToken(payload);
          res.status(200).json({mensaje:`Usuario autenticado con exito`, token:token});
        } else{
          res.status(401).json({error:"Clave Invalida"});
        }

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error:${error}`})
    }
}

export const actualizarUsuario = async (req:Request, res:Response)=>{
    try{
        let usuario = await Usuario.findOneBy({id: parseInt(req.params.id)});

        if(!usuario){
          return res.status(404).json({error:`Usuario con el id no existe:${req.params.id}`});
        };
        let {nombre, telefono, email} = req.body;

        usuario.nombre = nombre;
        usuario.telefono = telefono;
        usuario.email = email;

        const errores = await validate(usuario, { validationError: { target: false } });

        if(errores.length > 0){
          return res.status(400).json(errores)
        } else {
          // await Usuario.update({id:parseInt(req.params.id)}, req.body);
          usuario.save()
          res.status(204).json({mensaje:`Usuario creado con el id ${req.params.id}`});
        }
    }catch(error){
        res.status(400).json({mensaje:`Ha ocurrido un error: ${error}`});
    }

}

export const eliminarUsuario = async (req:Request, res:Response) =>{
    try{
        let usuario = await Usuario.findOneBy({id: parseInt(req.params.id)});

        if(!usuario){
            return res.status(404).json({error:"Usuario que desea eliminar con el id no existe"});
        };

        const result = await Usuario.delete({id:parseInt(req.params.id)});

        res.status(204).json({mensaje: "Usuario eliminado con exito", resultado:result})
    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error al eliminar usuario: ${error}`})
    }
}

export const verificacionToken = async (req:Request, res:Response, next:any)=>{
    let token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({mensaje:`Es necesario un token de autorizacion`})
    }
    token = token.slice(7, token.length)
    console.log("token arreglado ", token)
    try {
        let decodificar = await verificarToken(token)
        if(decodificar){next()}
    }catch(error){
        res.json({error:"Token invalido"})
    }

}

export const iniciarSessionWhatsapp = async (req:Request, res:Response)=>{

  try {

    let autenticado = await crearSesion();

    if(autenticado){
      res.send("Ya existe una session de Whatsapp web")
    } else {
      res.send("Iniciando autenticacion de Usuario")
    }


  } catch (error) {
      console.log(error)
  }
}

export const enviarEmail = async (req:Request, res:Response) =>{

  try {

    let {email} = req.body;

    let usuario = await Usuario.findOneBy({email:email});

    if(!usuario){
      res.status(404).json({
        error:"Email ingresado no es validado. Por favor, verifique su email"
      })
    }
    let payload = {email:email};
    let token = generarToken(payload);
    let mensajeEnviado = await enviarCorreo(email, token);

    if(!mensajeEnviado){
      res.status(400).json({
        error:"Ha ocurrido un error al enviar correo de recuperacion de contraseña"
      })
    }
    res.status(200).json({
      mensaje:`Correo de recuperacion de clave ha sido enviado: ${mensajeEnviado}`
    })

  } catch (error) {
    res.status(400).json({
      error:`Ha ocurrido un error al enviar un email: ${error}`
    })
  }
}

export const cambiarClave = async (req:Request, res:Response) =>{
  try {
    let {email,passwordUno, passwordDos} = req.body;

    let usuario = await Usuario.findOneBy({
      email:email
    })

    if(!usuario){
      res.status(400).json({
        error:"Email incorrecto, verifique email ingresado"
      })
    }

    if(passwordUno !== passwordDos){
      res.status(404).json({
        error:"Las contraseñas Ingresadas no coinciden, intentelo nuevamente"
      })
    }

    let esClaveValida = await minLength(passwordUno,5);
    if(!esClaveValida){
        return res.status(400).json({error:"La nueva clave debe contener mas de 5 caracteres"});
    } else{
      usuario!.clave = await generarHash(passwordUno); // encripta la clave ingresada por el usuario
      console.log('nueva clave',usuario!.clave)
    }

    await usuario!.save(); // el signo de exclamacion le indica al compilador TS que el usuario no es valor de tipo null


    res.status(200).json({
      mensaje:"La clave ha sido cambiada con exito"
    })

  } catch (error) {
    res.status(400).json({
      error:`Ha ocurrido un error al cambiar clave: ${error}`
    })
  }
}

export const verificarTokenCambioClave = async(req:Request,res:Response, next:any)=>{
  try {

    let {token} = req.params;

    if(token.length === 0){
      return res.status(403).json({
        error:`Es necesario un token de autorizacion para cambiar su nueva contraseña`})
      }

    let decodificar = await verificarToken(token)

    if(decodificar){
      next()
    } else {
      res.status(400).json({
        error:`Token invalido`
      })
    }

  } catch (error) {
    res.status(400).json({
      error:`Ha ocurrido un error al verificar token para cambio de clave: ${error}`
    })
  }



}
