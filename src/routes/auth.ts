import { Router } from "express";
import { regUser, login, userDashboard, forgotPassword , resetpasswordService} from "../controllers/index";


export const user: Router = Router()

user.post('/register', regUser)
user.post('/login', login)
user.get('/me', userDashboard)
user.post('/forgotPassword', forgotPassword)
user.post('/resetpasswordService', resetpasswordService)