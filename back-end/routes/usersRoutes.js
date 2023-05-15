import * as usersController from '../controllers/usersController.js';
import express from "express";

const router = express.Router();

router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);


export default router;
