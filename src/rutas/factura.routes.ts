import {Router} from 'express'
import {
    obtenerFacturas,
    obtenerFacturaId,
    generarFactura,
    modificarFactura,
    borrarFactura
} from '../controladores/factura.controller'

const router = Router();

router.get('/api/facturas',obtenerFacturas);
router.get('/api/factura/:id',obtenerFacturaId);
router.post('/api/generar/factura',generarFactura);
router.put('/api/modificar/factura/:id',modificarFactura);
router.delete('/api/borrar/factura/:id',borrarFactura);


export default router;
