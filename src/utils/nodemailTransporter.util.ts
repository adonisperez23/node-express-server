import nodemailer from 'nodemailer';
const llaves = require('../../llaves');

//Modulo para enviar correos electronicos
  let transportador = nodemailer.createTransport({
    host:'smtp.gmail.com', // HOST del Servicio smtp de google
    port:587,
    auth: {
      type:"login",
      user: llaves.email, // Email del correo electronico que enviara el mensaje
      pass: llaves.clave, // Para obtener esta clave se debe configurar el correo con verificacion de dos pasos
                          // luego generar una clave en aplicaciones de terceros.
    },
  })

export async function enviarCorreo(correo:string, token:string):Promise<any>{

      const verificar =  await transportador.verify() // Verifica que la conexion sea establecida
      if(!verificar){
        return verificar
      }

      return await transportador.sendMail({ // envia el mensaje con los siguientes parametros
        from:llaves.email,
        to:correo,
        subject:"Recuperacion de contraseña",
        html:`
                <div>
                  <label>Enlace de recuperacion de contraseña para su cuenta de la App del Rest Los cinco sabores</label>
                  <br>
                  <a href="http://localhost:5173/#/cambiar-clave/${correo}/${token}" target="_blank">Recuperar contraseña</a>
                </div>
              `
      })
}
