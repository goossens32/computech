import express from "express";
import * as modelsController from '../controllers/modelsController.js';

const router = express.Router();

router.get('/models', modelsController.showAllModels);
router.get('/models/search/:query', modelsController.searchModelsByName);
router.get('/models/search/:minPrice/:maxPrice', modelsController.searchModelByPrice);
router.get('/models/:idModel', modelsController.showModelById);
router.post('/models', modelsController.newModel);
router.put('/models', modelsController.updateModel);
router.delete('/models/:idModel', modelsController.deleteModel);

export default router;