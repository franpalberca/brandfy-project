import { Router } from "express";
import { createLogo } from "../controllers/logo.controller";

export const requestRouter = Router()

requestRouter.post('/upload', createLogo)