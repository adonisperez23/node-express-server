import moment from "moment"
// metodo para armar el mensaje que se enviara al whatsap de la persona encargada de recibir los pedidos
async function armarMensaje (fecha:string,telefono:string, cliente:string, pedido:Array<{producto:number,nombreProducto:string,cantidad:number,precio:number,descripcion:string}>, montoTotal:number):Promise<string>{

  let pedidoOrdenado:string = ""
  let montoTo = montoTotal.toString()
  let formatoFecha:string = moment(fecha).format('DD/MM/YYYY h:mm a')

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
Monto Total: $${montoTo}`

}

export {armarMensaje};
