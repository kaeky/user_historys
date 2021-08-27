import {Request, Response} from 'express';

import db from '../database';

class CompanyController{
    public async list (req:Request, res:Response) {
        try{
            const company = await db.query('SELECT * FROM company');
            res.status(200).json({ok: 'OK', data: company})
        }catch (err){
            console.log(err)
        }

    }
    public async getOne(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const company = await db.query('SELECT c.nit, c.name as companyname, u.id_user, u.name FROM company c, user u WHERE c.nit = u.companyFK AND u.id_user = ?',[id]);
        //console.log(company)
        if(company.length>0){
            return res.json(company[0]);
        }
        res.status(404).json({text: "no esta asociado a esta compañia"})
    }
}

export const companyController = new CompanyController();
export default companyController;
