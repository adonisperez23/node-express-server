import bcryp from "bcryptjs";

//Modulo para encriptar las contraseñas ingresadas por los usuarios al momento de registrarse en la app

export async function generarHash (clave:string):Promise<string>{

  const saltos = 10;

  return await bcryp.hash(clave,saltos); //Metodo de encriptacion de contraseña
}

export async function compararHash(clave:string,hash:string):Promise<any>{
  return await bcryp.compare(clave,hash); // compara la clave ingresada por el usuario y
}                                          //retorna verdad si coincida y false lo contrario                             
