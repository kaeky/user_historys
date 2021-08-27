import { NextFunction, Request, Response } from 'express';

import db from '../database';

class UserController{
    public async create(req: Request, res: Response): Promise<void>{
        try{
            await db.query('INSERT INTO user set ?', [req.body])
            res.json({message: 'Usuario Creado Correctamente '})
        }catch (err){
            res.status(422).json(err.sqlMessage)
        }

    }
    public async verify(req:Request, res:Response): Promise<void>{
            try{
                const result = await db.query('SELECT * FROM user WHERE id_user = ?',[req.user.id_user])
                if(!result){
                    return
                }
                if(result[0].companyFK != null){
                    res.status(200).json({message: "OK", id: result[0].id_user})
                }else
                {
                    res.status(200).json({message: "Actualizar datos", id: result[0].id_user})
                }
            }catch (error){
                console.log(error)
            }
        }

    public async update(req: Request, res : Response): Promise<void>{
        try{
            const { id } = req.params;
            const result = await db.query('UPDATE user set ? WHERE id_user = ?', [req.body, id])
            if(!result){
                return
            }else{
                res.status(200).json({ok:"ok", message: 'Se ha actualizado el usuario correctamente'})
            }
            //

        }catch (err){
            console.log(err)

        }
    }
}

export const userController = new UserController();
export default userController;
