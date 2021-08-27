import {Router} from 'express'

import companyController from '../controllers/companyController';
import { authController } from '../controllers/authController';
class CompanyRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.get('/list',authController.isAuth, companyController.list);
        this.router.get('/:id',authController.isAuth, companyController.getOne);
    }
}
const companyRoutes = new CompanyRoutes();
export default companyRoutes.router
