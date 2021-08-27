"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const authController_1 = require("../controllers/authController");
class ProjectRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/register', authController_1.authController.register);
        this.router.put('/:id', authController_1.authController.isAuth, userController_1.default.update);
        this.router.post('/login', authController_1.authController.login);
        this.router.get('/verify', authController_1.authController.isAuth, userController_1.default.verify);
        this.router.get('/logout', authController_1.authController.isAuth, authController_1.authController.logout);
    }
}
const userRoutes = new ProjectRoutes();
exports.default = userRoutes.router;
