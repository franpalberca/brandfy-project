import { Router } from "express";
import { uploadImage } from "../utils/storage";
import { createImage, getCompanysInfo } from "../controllers/logo.controller";

const logoRoutes = Router()

.post('/logo', uploadImage, createImage)
.get('/', getCompanysInfo)

export default logoRoutes