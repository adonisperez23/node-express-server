import moment from "moment"
import {obtenerValorDolar} from "./scrapingValorDolar.utils"


// metodo para armar el mensaje que se enviara al whatsap de la persona encargada de recibir los pedidos
async function armarMensaje (fecha:string,telefono:string, cliente:string, pedido:Array<{producto:number,nombreProducto:string,cantidad:number,precio:number,descripcion:string}>, montoTotal:number):Promise<string>{
  const precioDolar = await obtenerValorDolar()
  let dolar:number = 0
  let montoTotalBolivares:string = ""
  let pedidoOrdenado:string = ""
  let montoTo = montoTotal.toString()
  let formatoFecha:string = moment(fecha).format('DD/MM/YYYY h:mm a')

  if(precioDolar.length > 0){
    dolar = parseFloat(precioDolar.replace(/,/g, '.'))
    montoTotalBolivares = (montoTotal * dolar).toString()
  }else {
    montoTotalBolivares = "Sin poder Calcular"
  }

  pedido.forEach((articulo)=>{
    let cantidadArticulo = articulo.cantidad.toString()
    let precioArticulo = articulo.precio.toString()
    let monto = (articulo.precio * articulo.cantidad).toString()

    pedidoOrdenado += `\n${articulo.nombreProducto}  \n ${articulo.descripcion}\n
                            $${precioArticulo}            ${cantidadArticulo}             $${monto} \n`

  })

  return `Pedido recibido desde la app web Restaurant los cinco mejores sabores\n
Fecha: ${formatoFecha}\n
Cliente: ${cliente}\n
Telefono: ${telefono}\n
Pedido: \n
Descripcion   Precio   Cantidad    Monto
${pedidoOrdenado} \n
Monto Total: $${montoTo}\n
Taza BCV: ${precioDolar}\n
Total Monto en Bolivares: ${montoTotalBolivares} BS\n
Datos de Pago movil: \n
Tlf: 0424-9683161
Ci: 18.026.098
Bancos: Venezuela 0102 / Mercantil 0105

NOTA:\n
Por favor espere que su pedido sea verificado por el Administrador. Luego de que reciba la confirmacion de su pedido podra proseguir en realizar su pago. Muchas gracias`

}

export {armarMensaje};
