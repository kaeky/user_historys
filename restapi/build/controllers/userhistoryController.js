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
exports.userhistoryController = void 0;
const database_1 = __importDefault(require("../database"));
class UserHistoryController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user_history = yield database_1.default.query('SELECT us.id_userhistory, us.name, us.contend, us.projectFK, p.id_project, p.name as projectname, p.companyFK, c.nit, u.id_user, u.companyFK FROM project p, company c, user u, user_history us WHERE us.projectFK = p.id_project AND c.nit = p.companyFK AND c.nit = u.companyFK AND u.id_user = ?', [id]);
            if (user_history.length > 0) {
                return res.json(user_history);
            }
            res.status(404).json({ text: "No existen historias de usuario para este proyecto." });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user_history = yield database_1.default.query('SELECT * FROM user_history WHERE id_userhistory = ?', [id]);
            if (user_history.length > 0) {
                return res.json(user_history[0]);
            }
            res.status(404).json({ text: "La historia de usuario no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO user_history set ?', [req.body]);
                res.json({ message: 'Historia de usuario Creada ' });
            }
            catch (err) {
                res.status(400).json({ ok: 'false', error: err });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE user_history set ? WHERE id_userhistory = ?', [req.body, id]);
            res.json({ message: 'Se ha actualizado la historia de usuario correctamente' });
        });
    }
}
exports.userhistoryController = new UserHistoryController();
exports.default = exports.userhistoryController;
