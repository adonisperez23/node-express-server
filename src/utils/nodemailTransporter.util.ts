import nodemailer from 'nodemailer';
const llaves = require('../../llaves');

  let transportador = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    auth: {
      type:"login",
      user: llaves.email,
      pass: llaves.clave,
    },
    // tls:{
    //
    // }
  })

export async function enviarCorreo(correo:string, token:string):Promise<any>{

      const verificar =  await transportador.verify()
      if(!verificar){
        return verificar
      }

      return await transportador.sendMail({
        from:llaves.email,
        to:correo,
        subject:"Recuperacion de contraseña",
        html:`
                <div>
                  <label>Enlace de recuperacion de contraseña</label>
                  <br>
                  <a href="https://localhost:3000/recuperacion/${token}" target="_blank">Recuperar contraseña</a>
                </div>
              `
      })
}
