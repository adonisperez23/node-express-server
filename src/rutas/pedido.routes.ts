import {Router} from "express"
import {obtenerPedidos,
        obtenerPedidoId,
        nuevoPedido,
        modificarPedido,
        borrarPedido} from "../controladores/pedido.controller"

const router = Router();

router.get('/api/pedidos', obtenerPedidos);
router.get('/api/pedido/:id', obtenerPedidoId);
router.post('/api/nuevo/pedido', nuevoPedido);
router.put('/api/modificar/pedido/:id', modificarPedido);
router.delete('/api/borrar/pedido/:id', borrarPedido);




export default router;
