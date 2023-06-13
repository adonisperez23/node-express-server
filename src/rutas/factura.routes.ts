import {Router} from 'express'
import {
    obtenerFacturas,
    obtenerFacturaId,
    obtenerListaFacturaPorIdUsuario,
    generarFactura,
    modificarFactura,
    borrarFactura
} from '../controladores/factura.controller'

import {verificacionToken} from '../controladores/usuario.controller'

const router = Router();

router.get('/api/facturas',verificacionToken,obtenerFacturas);
router.get('/api/factura/:id',obtenerFacturaId);
router.get('/api/facturasPorIdUsuario/:id',verificacionToken,obtenerListaFacturaPorIdUsuario);
router.post('/api/generar/factura',verificacionToken,generarFactura);
router.put('/api/modificar/factura/:id',modificarFactura);
router.delete('/api/borrar/factura/:id',borrarFactura);


export default router;
