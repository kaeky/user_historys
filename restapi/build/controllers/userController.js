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
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO user set ?', [req.body]);
                res.json({ message: 'Usuario Creado Correctamente ' });
            }
            catch (err) {
                res.status(422).json(err.sqlMessage);
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query('SELECT * FROM user WHERE id_user = ?', [req.user.id_user]);
                if (!result) {
                    return;
                }
                if (result[0].companyFK != null) {
                    res.status(200).json({ message: "OK", id: result[0].id_user });
                }
                else {
                    res.status(200).json({ message: "Actualizar datos", id: result[0].id_user });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield database_1.default.query('UPDATE user set ? WHERE id_user = ?', [req.body, id]);
                if (!result) {
                    return;
                }
                else {
                    res.status(200).json({ ok: "ok", message: 'Se ha actualizado el usuario correctamente' });
                }
                //
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.userController = new UserController();
exports.default = exports.userController;
