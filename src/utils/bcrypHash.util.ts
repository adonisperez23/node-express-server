import bcryp from "bcryptjs";

export async function generarHash (clave:string):Promise<string>{

  const saltos = 10;

  return await bcryp.hash(clave,saltos);
}

export async function compararHash(clave:string,hash:string):Promise<any>{
  return await bcryp.compare(clave,hash);
}
