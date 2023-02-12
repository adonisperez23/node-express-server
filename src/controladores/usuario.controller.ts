import {Request, Response} from "express"
import {Usuario} from "../entidades/Usuario"
import jwt from "jsonwebtoken"
import bcryp from "bcryptjs"
import app from "../app"

export const holaMundo = (req:Request,res:Response) =>{
    res.send("hola mundo");
}

export const obtenerUsuarios = async (req:Request, res:Response)=>{
    try{
        const listaUsuario = await Usuario.find();
        
        res.status(200).send(listaUsuario);
        
    }catch(error){
            res.status(404).json({mensaje:`ha ocurrido un error: ${error}`});
    }
    
} 

export const obtenerUsuarioId = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        
        const usuario = await Usuario.findOneBy({id: parseInt(id)})
        
        if(!usuario){
            return res.status(406).json({mensaje:`no existe usuario con el ID: ${id}`})
        }
        
        res.status(200).send(usuario)
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`})
    }
}


export const registrarUsuario = async (req:Request,res:Response)=>{
    
    try{
        let {nombre, telefono, email, clave} = req.body;
        
        
        const usuario = new Usuario();
        const buscarEmail = await Usuario.findOneBy({email:email})
        
        if(buscarEmail){
           return res.status(400).json({mensaje:`ya existe ese email ${buscarEmail.email}`}) 
        }
        
        usuario.nombre = nombre;
        usuario.telefono = telefono;
        usuario.email = email;
        usuario.clave = await bcryp.hash(clave,8); // encripta la clave ingresada por el usuario
        
        await usuario.save();
         
        res.status(201).json({usuarioCreado:`${usuario}`});
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error:${error}`})
    }
}

export const autenticarUsuario = async (req:Request, res:Response) =>{
    try{
        let {email,clave} = req.body;
        const usuario = await Usuario.findOneBy({email:email})
        
        if(!usuario){
            return res.status(404).json({error:`Cuenta email no valida`}) //404 not found
        }
        
        await bcryp.compare(clave,usuario.clave)
            .then(()=>{
                const payload = {autenticado:true};
                const token = jwt.sign(payload,app.get('llave'),{expiresIn:"1h"})
                res.status(200).json({mensaje:`Usuario autenticado con exito`, token:token});
            })
            .catch((error:any)=>{
                res.status(401).json({mensaje:"Clave Invalida", error:error});
            });
        
    }catch(error){
        res.status(400).json({Error:`ha ocurrido un error:${error}`})
    }
}

export const actualizarUsuario = async (req:Request, res:Response)=>{
    try{
        const usuario = await Usuario.findOneBy({id: parseInt(req.params.id)});
        
        if(!usuario){
            return res.status(404).json({mensaje:`usuario con el id no existe:${req.params.id}`});
        };
        
        await Usuario.update({id:parseInt(req.params.id)}, req.body);
        
        res.status(204).json({mensaje:`usuario creado con el id ${req.params.id}`});
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`});
    }
    
}

export const eliminarUsuario = async (req:Request, res:Response) =>{
    try{
        const usuario = await Usuario.findOneBy({id: parseInt(req.params.id)});
        
        if(!usuario){
            return res.status(404).json({mensaje:"usuario que desea eliminar con el id no existe"});
        };
        
        const result = await Usuario.delete({id:parseInt(req.params.id)});
        
        res.status(204).send(`usuario eliminado con exito ${result}`)
    }catch(error){
        res.status(400).json({mensaje:`ha ocurrido un error: ${error}`})
    }
}

export const verificacionToken = async (req:Request, res:Response, next:any)=>{
    let token = req.headers['authorization'];
    console.log("token sin arreglar ",token)
    if(!token){
        return res.status(403).json({mensaje:`Es necesario un token de autorizacion`})
    }
    token = token.slice(7, token.length)
    console.log("token arreglado ", token)
    try {
        const decodificar = await jwt.verify(token,app.get('llave'))
        if(decodificar){next()}    
    }catch(error){
        res.json({mensaje:"token invalido"})
    }
    
}
