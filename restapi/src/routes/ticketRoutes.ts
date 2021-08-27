import {Router} from 'express'

import ticketController from '../controllers/projectController';
import { authController } from '../controllers/authController';
class TicketRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.get('/',authController.isAuth, ticketController.list);
        this.router.get('/:id',authController.isAuth, ticketController.getOne);
        this.router.post('/',authController.isAuth, ticketController.create)
        this.router.put('/:id',authController.isAuth, ticketController.update)
    }
}
const ticketRoutes = new TicketRoutes();
export default ticketRoutes.router

