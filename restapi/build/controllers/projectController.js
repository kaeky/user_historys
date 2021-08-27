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
exports.projectController = void 0;
const database_1 = __importDefault(require("../database"));
class ProjectController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const projects = yield database_1.default.query('SELECT p.id_project, p.name, p.description, p.companyFK, c.name as companyname, c.nit, u.id_user, u.companyFK FROM project p, company c, user u WHERE c.nit = p.companyFK AND c.nit = u.companyFK AND u.id_user = ?', [id]);
            if (projects.length > 0) {
                return res.json(projects);
            }
            res.status(404).json({ text: "La compañia no tiene Proyectos" });
        });
    }
    getOne(req, res) {
        // res.json({text: 'juego: '+req.params.id })
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO project set ?', [req.body]);
                res.json({ message: 'Proyecto Creado ' });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE project set ? WHERE id_project = ?', [req.body, id]);
            res.json({ message: 'Se ha actualizado el proyecto correctamente' });
        });
    }
}
exports.projectController = new ProjectController();
exports.default = exports.projectController;
