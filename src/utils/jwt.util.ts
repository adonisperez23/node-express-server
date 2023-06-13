import jwt from "jsonwebtoken";
import app from "../app"
//Modulo para generar JWT
export function generarToken(payload:object):string {

  return jwt.sign(payload,app.get('llave'),{expiresIn:"7 days"}) // Genera un Token que expira en 7 dias
                                                             // Los token les dara permiso al usuario
                                                             // de ejecutar ciertas acciones dentro de la cesion en la app.
}

export async function verificarToken(token:string):Promise<any> {

  return await jwt.verify(token,app.get('llave'));  // Comprueba que el token sea valido para su uso
                                                    // al navegar por la app.
}
