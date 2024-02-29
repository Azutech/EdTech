import { Router } from "express";
import { user } from './auth' 


export const routes: Router = Router();

routes.use('/user', user)
