import {Router} from "express";
import {
    obtenerProductos,
    obtenerProductoId,
    verificarRelacionesProducto,
    registrarProducto,
    actualizarProducto,
    eliminarProducto } from "../controladores/producto.controller"
import {verificacionToken} from '../controladores/usuario.controller'
import {obtenerValorDolar} from "../utils/scrapingValorDolar.utils"
const router = Router();

router.get('/api/dolar',obtenerValorDolar)
router.get('/api/productos',obtenerProductos);
router.get('/api/producto/:id',obtenerProductoId);
router.get('/api/verificar-producto/:productoId',verificarRelacionesProducto);
router.post('/api/registrar/producto',verificacionToken,registrarProducto);
router.put('/api/actualizar/producto/:id',verificacionToken,actualizarProducto);
router.delete('/api/eliminar/producto/:id',verificacionToken,eliminarProducto);

export default router;
