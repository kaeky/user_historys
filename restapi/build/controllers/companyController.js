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
exports.companyController = void 0;
const database_1 = __importDefault(require("../database"));
class CompanyController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield database_1.default.query('SELECT * FROM company');
                res.status(200).json({ ok: 'OK', data: company });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const company = yield database_1.default.query('SELECT c.nit, c.name as companyname, u.id_user, u.name FROM company c, user u WHERE c.nit = u.companyFK AND u.id_user = ?', [id]);
            //console.log(company)
            if (company.length > 0) {
                return res.json(company[0]);
            }
            res.status(404).json({ text: "no esta asociado a esta compañia" });
        });
    }
}
exports.companyController = new CompanyController();
exports.default = exports.companyController;
