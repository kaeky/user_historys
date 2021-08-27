import {Router} from 'express'

import userhistoryController from '../controllers/userhistoryController';
import { authController } from '../controllers/authController';
class UserhistoryRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.get('/:id', authController.isAuth, userhistoryController.list);
        this.router.get('/:id',authController.isAuth, userhistoryController.getOne);
        this.router.post('/', authController.isAuth, userhistoryController.create);
        this.router.put('/:id', authController.isAuth, userhistoryController.update);
    }
}
const userhistoryRoutes = new UserhistoryRoutes();
export default userhistoryRoutes.router
