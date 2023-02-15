import {Router} from "express"
import {
    obtenerFotos,
    obtenerFotoId,
    subirFoto,
    modificarFoto,
    borrarFoto
} from "../controladores/foto.controller"


const router = Router();


router.get('/api/fotos', obtenerFotos);
router.get('/api/foto/:id', obtenerFotoId);
router.post('/api/subir/foto', subirFoto);
router.put('/api/modificar/foto/:id', modificarFoto);
router.delete('/api/eliminar/foto/:id', borrarFoto);

export default router;
