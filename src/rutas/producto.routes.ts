import {Router} from "express";
import {
    obtenerProductos,
    obtenerProductoId,
    registrarProducto,
    actualizarProducto,
    eliminarProducto } from "../controladores/producto.controller"
const router = Router();

router.get('/api/productos',obtenerProductos);
router.get('/api/producto/:id',obtenerProductoId);
router.post('/api/registrar/producto',registrarProducto);
router.put('/api/actualizar/producto/:id',actualizarProducto);
router.delete('/api/eliminar/producto/:id',eliminarProducto);

export default router;