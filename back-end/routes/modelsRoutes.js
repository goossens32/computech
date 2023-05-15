import express from "express";
import * as modelsController from '../controllers/modelsController.js';

const router = express.Router();

router.get('/models', modelsController.showAllModels);
router.get('/models/search/:query', modelsController.searchModelsByName);
router.get('/models/search/:minPrice/:maxPrice', modelsController.searchModelByPrice);
router.get('/models/:idModel', modelsController.showModelById);
router.post('/games', modelsController.newModel);
router.put('/games', modelsController.updateModel);
router.delete('/games/:idModel', modelsController.deleteModel);

export default router;