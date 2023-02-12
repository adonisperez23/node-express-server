import {Router} from "express";
import {
    verificacionToken,
    obtenerUsuarios,
    obtenerUsuarioId,
    registrarUsuario, 
    autenticarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    holaMundo
    } from "../controladores/usuario.controller"

const router = Router();



router.get('/api/usuarios',verificacionToken,obtenerUsuarios);
router.get('/api/usuario/:id',obtenerUsuarioId);
router.post('/api/registrar/usuario',registrarUsuario);
router.post('/api/autenticar/usuario', autenticarUsuario);
router.put('/api/usuario/:id',actualizarUsuario);
router.delete('/api/usuario/:id',eliminarUsuario);

router.get('/',holaMundo)

export default router;
