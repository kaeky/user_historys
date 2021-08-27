import jwt, { JwtPayload } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import db from '../database';
import { promisify } from 'util';
import keys from '../keys';
import { Request, Response, NextFunction } from 'express';

class AuthController {
    public async register(req: Request, res: Response) {
        try {
            const name = req.body.name
            const lastname = req.body.lastName
            const email = req.body.email
            const password = req.body.password
            let passHash = await bcryptjs.hash(password, 8);
            await db.query('INSERT INTO user SET ?', {name: name, lastname: lastname, email: email, password: passHash})
            res.json({message: 'Usuario Creado Correctamente '})
        } catch (err) {
            res.status(422).json(err.sqlMessage)
        }

    }

    public async login(req: Request, res: Response):Promise<any> {

        try {
            const email = req.body.email
            const password = req.body.password
            if (!email || !password) {

                return res.status(400).json({message: "Porfavor ingrese su usuario y contraseña"})
            } else {
                const result = await db.query('SELECT * FROM user WHERE email = ?', [email])
                if (result.length == 0 || !await bcryptjs.compare(password, result[0].password)) {
                    res.status(404).json({message: "usuario o contraseña incorrectos"})
                } else {
                    const id = result[0].id_user
                    const token = jwt.sign({id: id}, process.env.JWT_SECRETO || keys.claves.JWT_SECRET)
                    console.log("Token: " + token + " user: " + email)


                    res.status(200).json({message: "OK", name: "jwt", jwt: token})

                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    public async isAuth(req: Request, res: Response, next: () => void) {
        const token = <string>req.get("Authorization")
        if(token != null){
            const key = keys.claves.JWT_SECRET;
            try{
                const jwtPayLoad = <any>jwt.verify(token, key)
                const {id, iat} = jwtPayLoad
                const result = await db.query('SELECT * FROM user WHERE id_user = ?', [id])
                if(!result){
                    return next()
                }
                req.user = result[0]
                next()
            }catch (err){
                res.status(500).json({ok:false, message: "su sesion ha expirado, porfavor vuelva a iniciar"})
            }

        }else{
            res.status(401).json({message: "Se ha cerrado su sesion, porfavor inicie sesion"})
        }

    }
    public logout(req: Request, res: Response) {
        try {
            res.clearCookie('jwt');
            return res.status(200).json({text: "ok", mensaje: "sesion cerrada"})
        } catch (err) {
            console.log(err)
        }

    }
}

export const authController = new AuthController();
export default AuthController;
