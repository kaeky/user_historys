import {Router} from 'express'

import projectController from '../controllers/projectController';
import { authController } from '../controllers/authController';
class ProjectRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.get('/:id',authController.isAuth, projectController.list);
        this.router.get('/:id',authController.isAuth, projectController.getOne);
        this.router.post('/',authController.isAuth, projectController.create)
        this.router.put('/:id',authController.isAuth, projectController.update)
    }
}
const projectRoutes = new ProjectRoutes();
export default projectRoutes.router
