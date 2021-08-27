"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userhistoryController_1 = __importDefault(require("../controllers/userhistoryController"));
const authController_1 = require("../controllers/authController");
class UserhistoryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', authController_1.authController.isAuth, userhistoryController_1.default.list);
        this.router.get('/:id', authController_1.authController.isAuth, userhistoryController_1.default.getOne);
        this.router.post('/', authController_1.authController.isAuth, userhistoryController_1.default.create);
        this.router.put('/:id', authController_1.authController.isAuth, userhistoryController_1.default.update);
    }
}
const userhistoryRoutes = new UserhistoryRoutes();
exports.default = userhistoryRoutes.router;
