import {Request, Response} from 'express';

import db from '../database';

class ProjectController{
    public async list (req:Request, res:Response) {
        const { id } = req.params;
        const projects = await db.query('SELECT p.id_project, p.name, p.description, p.companyFK, c.name as companyname, c.nit, u.id_user, u.companyFK FROM project p, company c, user u WHERE c.nit = p.companyFK AND c.nit = u.companyFK AND u.id_user = ?', [id]);
        if(projects.length>0){
            return res.json(projects);
        }
        res.status(404).json({text: "La compañia no tiene Proyectos"})
    }
    public getOne(req:Request, res:Response){
       // res.json({text: 'juego: '+req.params.id })
    }
    public async create(req: Request, res: Response): Promise<void>{
        try{
            await db.query('INSERT INTO project set ?', [req.body])
            res.json({message: 'Proyecto Creado '})
        }catch (err){
            console.log(err)
        }

    }
    public async update(req: Request, res : Response): Promise<void>{
        const { id } = req.params;
        await db.query('UPDATE project set ? WHERE id_project = ?', [req.body, id])
        res.json({message: 'Se ha actualizado el proyecto correctamente'})
    }
}

export const projectController = new ProjectController();
export default projectController;
