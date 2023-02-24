import bcryp from "bcryptjs";

export async function generarHash (clave:string):Promise<string>{

  const saltos = 10;

  return await bcryp.hash(clave,saltos);
}

export async function compararHash(hash:string,clave:string):Promise<boolean>{
  return await bcryp.compare(hash,clave);
}
