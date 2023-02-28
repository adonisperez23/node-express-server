import {Router} from "express"
import {
    obtenerFotos,
    obtenerFotoId,
    subirFoto,
    modificarFoto,
    borrarFoto,
    cargarImagen
} from "../controladores/foto.controller"
import {upload} from "../utils/multer.util"

const router = Router();


router.get('/api/fotos', obtenerFotos);
router.get('/api/foto/:id', obtenerFotoId);
router.put('/api/modificar/foto/:id', modificarFoto);
router.delete('/api/eliminar/foto/:id', borrarFoto);
router.post('/api/guardar/foto',subirFoto);
router.post('/api/cargar/imagen',upload.single('foto'), cargarImagen);

export default router;
