import {Client, LocalAuth} from "whatsapp-web.js";
import open from "open"
import {image as imageQr} from "qr-image";
const fs = require('fs')
const path = require('path')

const generarImageQr = (base64:string) =>{
  const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: "png", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
}

export const crearSesion = async () => {

  let autenticado = false;
  if(!fs.existsSync(path.join(__dirname,'../.wwebjs_auth/session/session'))){
    const cliente = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        // headless: false,
        args: ['--no-sandbox'],
      }
    })

    console.log("iniciando....")

    cliente.on('loading_screen', (percent, message) => {
      console.log('CARGANDO PANTALLA', percent, message);
    });


    cliente.on('qr',(qr) =>{
      console.log("lanzando codigo qr",qr)
      generarImageQr(qr)
      open("/home/adonisperez/Escritorio/proyecto-restaurant-appweb/backend-node-appweb/node-express-server/tmp/qr.svg")
    })

    cliente.on('authenticated', () => {
      console.log('ADMINISTRADOR AUTENTICADO');
      autenticado = true;
    });

    cliente.on('auth_failure', msg => {
      console.error('fALLO EN LA AUTENTICACION', msg);
    });

    cliente.initialize();
  } else {
    autenticado = true
  }
  return autenticado;
}

export const mandarMensajeWs = async (msg:string)=>{

  const country_code = "58"
  const numero = "4148942782"
  const chatId = country_code + numero + "@c.us"
  const cliente = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      // headless: false,
      args: ['--no-sandbox'],
    }
  });
  cliente.initialize()
  console.log("inicio...")


  cliente.on("authenticated", ()=>{
    console.log("cliente autenticado")
  })
  console.log("enviando mensaje")
  cliente.on('ready', ()=>{
    console.log("mandando mensaje...")
    cliente.sendMessage(chatId, msg)
  })
}

 async function armarMensaje (fecha:string,telefono:string, cliente:string, pedido:Array<{producto:number,nombreProducto:string,cantidad:number,precio:number,descripcion:string}>, montoTotal:number):Promise<string>{

  let pedidoOrdenado:string = ""
  let montoTo = montoTotal.toString()

  pedido.forEach((articulo)=>{
    // let nombreArticulo:string
    let cantidadArticulo = articulo.cantidad.toString()
    let precioArticulo = articulo.precio.toString()
    let monto = (articulo.precio * articulo.cantidad).toString()

    pedidoOrdenado += `\n${articulo.nombreProducto}  \n ${articulo.descripcion}\n
                         ${cantidadArticulo}         ${precioArticulo}        ${monto} \n`

  })

  return `Pedido recibido desde la app web Restaurant los cinco mejores sabores\n
Fecha: ${fecha}\n
Cliente: ${cliente}\n
Telefono: ${telefono}\n
Pedido: \n
Descripcion   Cantidad   Precio    Monto
${pedidoOrdenado} \n
Monto Total: ${montoTo}`

}

export {armarMensaje};
