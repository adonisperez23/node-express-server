import {Request, Response} from "express";
import {Usuario} from "../entidades/Usuario";
import jwt from "jsonwebtoken";
import bcryp from "bcryptjs";
import app from "../app";
import { validate , minLength} from "class-validator";

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

        const esClaveValida = await minLength(clave,5)
        if(!esClaveValida){
            return res.status(400).json({error:"La clave debe contener mas de 5 caracteres"})
        } else{
          usuario.clave = await bcryp.hash(clave,10); // encripta la clave ingresada por el usuario
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

        await bcryp.compare(clave,usuario.clave)
            .then(()=>{
                const payload = {autenticado:true};
                const token = jwt.sign(payload,app.get('llave'),{expiresIn:"1h"})
                res.status(200).json({mensaje:`Usuario autenticado con exito`, token:token});
            })
            .catch((error:any)=>{
                res.status(401).json({error:"Clave Invalida"});
            });

    }catch(error){
        res.status(400).json({error:`Ha ocurrido un error:${error}`})
    }
}

export const actualizarUsuario = async (req:Request, res:Response)=>{
    try{
        const usuario = await Usuario.findOneBy({id: parseInt(req.params.id)});

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
        const usuario = await Usuario.findOneBy({id: parseInt(req.params.id)});

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
        const decodificar = await jwt.verify(token,app.get('llave'))
        if(decodificar){next()}
    }catch(error){
        res.json({mensaje:"Token invalido"})
    }

}
