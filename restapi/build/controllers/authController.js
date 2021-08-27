"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
const keys_1 = __importDefault(require("../keys"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const lastname = req.body.lastName;
                const email = req.body.email;
                const password = req.body.password;
                let passHash = yield bcryptjs_1.default.hash(password, 8);
                yield database_1.default.query('INSERT INTO user SET ?', { name: name, lastname: lastname, email: email, password: passHash });
                res.json({ message: 'Usuario Creado Correctamente ' });
            }
            catch (err) {
                res.status(422).json(err.sqlMessage);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                if (!email || !password) {
                    return res.status(400).json({ message: "Porfavor ingrese su usuario y contraseña" });
                }
                else {
                    const result = yield database_1.default.query('SELECT * FROM user WHERE email = ?', [email]);
                    if (result.length == 0 || !(yield bcryptjs_1.default.compare(password, result[0].password))) {
                        res.status(404).json({ message: "usuario o contraseña incorrectos" });
                    }
                    else {
                        const id = result[0].id_user;
                        const token = jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRETO || keys_1.default.claves.JWT_SECRET);
                        console.log("Token: " + token + " user: " + email);
                        res.status(200).json({ message: "OK", name: "jwt", jwt: token });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    isAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.get("Authorization");
            if (token != null) {
                const key = keys_1.default.claves.JWT_SECRET;
                try {
                    const jwtPayLoad = jsonwebtoken_1.default.verify(token, key);
                    const { id, iat } = jwtPayLoad;
                    const result = yield database_1.default.query('SELECT * FROM user WHERE id_user = ?', [id]);
                    if (!result) {
                        return next();
                    }
                    req.user = result[0];
                    next();
                }
                catch (err) {
                    res.status(500).json({ ok: false, message: "su sesion ha expirado, porfavor vuelva a iniciar" });
                }
            }
            else {
                res.status(401).json({ message: "Se ha cerrado su sesion, porfavor inicie sesion" });
            }
        });
    }
    logout(req, res) {
        try {
            res.clearCookie('jwt');
            return res.status(200).json({ text: "ok", mensaje: "sesion cerrada" });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.authController = new AuthController();
exports.default = AuthController;
