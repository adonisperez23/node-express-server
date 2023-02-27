import {Router} from "express";
import {
    verificacionToken,
    obtenerUsuarios,
    obtenerUsuarioId,
    registrarUsuario,
    autenticarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSessionWhatsapp,
    enviarEmail,
    cambiarClave,
    verificarTokenCambioClave
    } from "../controladores/usuario.controller"

const router = Router();



router.get('/api/usuarios',verificacionToken,obtenerUsuarios);
router.get('/api/usuario/:id',obtenerUsuarioId);
router.get('/api/sesion-whatsapp', iniciarSessionWhatsapp)
router.post('/api/registrar/usuario',registrarUsuario);
router.post('/api/autenticar/usuario', autenticarUsuario);
router.post('/api/enviar',enviarEmail);
router.put('/api/cambio-clave/:token',verificarTokenCambioClave,cambiarClave)
router.put('/api/usuario/:id',actualizarUsuario);
router.delete('/api/usuario/:id',eliminarUsuario);

export default router;
