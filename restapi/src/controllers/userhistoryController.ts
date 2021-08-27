import {Request, Response} from 'express';

import db from '../database';

class UserHistoryController{
    public async list (req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const user_history = await db.query('SELECT us.id_userhistory, us.name, us.contend, us.projectFK, p.id_project, p.name as projectname, p.companyFK, c.nit, u.id_user, u.companyFK FROM project p, company c, user u, user_history us WHERE us.projectFK = p.id_project AND c.nit = p.companyFK AND c.nit = u.companyFK AND u.id_user = ?',[id]);
        if(user_history.length>0){
            return res.json(user_history);
        }
        res.status(404).json({text: "No existen historias de usuario para este proyecto."})

    }
    public async getOne(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const user_history = await db.query('SELECT * FROM user_history WHERE id_userhistory = ?',[id]);
        if(user_history.length>0){
            return res.json(user_history[0]);
        }
        res.status(404).json({text: "La historia de usuario no existe"})
    }
    public async create(req: Request, res: Response): Promise<void>{
        try{
            await db.query('INSERT INTO user_history set ?', [req.body])
            res.json({message: 'Historia de usuario Creada '})
        }catch (err){
            res.status(400).json({ok:'false', error: err})
        }

    }
    public async update(req: Request, res : Response): Promise<void>{
        const { id } = req.params;
        await db.query('UPDATE user_history set ? WHERE id_userhistory = ?', [req.body, id])
        res.json({message: 'Se ha actualizado la historia de usuario correctamente'})
    }
}

export const userhistoryController = new UserHistoryController();
export default userhistoryController;
