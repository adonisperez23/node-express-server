import jwt from "jsonwebtoken";
import app from "../app"

export function generarToken(payload:object):string {

  return jwt.sign(payload,app.get('llave'),{expiresIn:"1h"})

}

export async function verificarToken(token:string):Promise<any> {

  return await jwt.verify(token,app.get('llave'));
}
