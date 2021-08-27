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
exports.ticketController = void 0;
const database_1 = __importDefault(require("../database"));
class TicketController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tickets = yield database_1.default.query('SELECT * FROM ticket WHERE user_historyFK = ?', [id]);
            if (tickets.length > 0) {
                return res.json(tickets[0]);
            }
            res.status(404).json({ text: "No Existen tickets para esta historia de usuario" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticket = yield database_1.default.query('SELECT * FROM ticket WHERE id_ticket = ?', [id]);
            if (ticket.length > 0) {
                return res.json(ticket[0]);
            }
            res.status(404).json({ text: "El ticket no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO ticket set ?', [req.body]);
            res.json({ message: 'Ticket Creado ' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE ticket set ? WHERE id_ticket = ?', [req.body, id]);
            res.json({ message: 'Se ha actualizado el ticket correctamente' });
        });
    }
}
exports.ticketController = new TicketController();
exports.default = exports.ticketController;
