import {Router} from 'express'

import userController from '../controllers/userController';
import { authController } from '../controllers/authController';
import cors from 'cors';
class ProjectRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.post('/register', authController.register);
        this.router.put('/:id',authController.isAuth, userController.update);
        this.router.post('/login', authController.login);
        this.router.get('/verify', authController.isAuth, userController.verify);
        this.router.get('/logout', authController.isAuth, authController.logout);

    }
}
const userRoutes = new ProjectRoutes();
export default userRoutes.router
