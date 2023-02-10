import {Router} from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioId,
    crearUsuario, 
    actualizarUsuario,
    eliminarUsuario,
    holaMundo
    } from "../controladores/usuario.controller"

const router = Router();

router.get('/api/usuarios',obtenerUsuarios);
router.get('/api/usuario/:id',obtenerUsuarioId);
router.post('/api/usuario',crearUsuario);
router.put('/api/usuario/:id',actualizarUsuario);
router.delete('/api/usuario/:id',eliminarUsuario);

router.get('/',holaMundo)

export default router;