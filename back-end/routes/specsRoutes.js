import express from "express";
import * as specsController from '../controllers/specsController.js';

const router = express.Router();

router.get('/specs', specsController.showAllSpecs);
router.get('/specs/search/:query', specsController.searchSpecByModel);
router.get('/specs/:idSpec', specsController.showSpecById);
router.post('/specs', specsController.newSpecForModel);
router.put('/specs', specsController.updateSpec);
router.delete('/specs/:idSpec', specsController.deleteSpec);

export default router;