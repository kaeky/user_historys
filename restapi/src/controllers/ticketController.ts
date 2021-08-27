import {Request, Response} from 'express';
import db from '../database';

class TicketController{
    public async list (req:Request, res:Response): Promise<any> {
        const { id } = req.params;
        const tickets = await db.query('SELECT * FROM ticket WHERE user_historyFK = ?',[id]);
        if(tickets.length>0){
            return res.json(tickets[0]);
        }
        res.status(404).json({text: "No Existen tickets para esta historia de usuario"})
    }
    public async getOne(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const ticket = await db.query('SELECT * FROM ticket WHERE id_ticket = ?',[id]);
        if(ticket.length>0){
            return res.json(ticket[0]);
        }
        res.status(404).json({text: "El ticket no existe"})
    }
    public async create(req: Request, res: Response): Promise<void>{
        await db.query('INSERT INTO ticket set ?', [req.body])
        res.json({message: 'Ticket Creado '})
    }
    public async update(req: Request, res : Response): Promise<void>{
        const { id } = req.params;
        await db.query('UPDATE ticket set ? WHERE id_ticket = ?', [req.body, id])
        res.json({message: 'Se ha actualizado el ticket correctamente'})
    }
}

export const ticketController = new TicketController();
export default ticketController;
