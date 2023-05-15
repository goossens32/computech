import express from "express";
import * as brandsController from '../controllers/brandsController.js';

const router = express.Router();

router.get('/brands', brandsController.showAllBrands);
router.get('/brands/:idBrand', brandsController.showBrandById);
router.get('/brands/search/:query', brandsController.searchBrandsByName);
router.post('/brands', brandsController.newBrand);
router.put('/brands', brandsController.updateBrand);
router.delete('/brands/:idCategory', brandsController.deleteBrand);

export default router;