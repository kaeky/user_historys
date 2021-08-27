"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = __importDefault(require("../controllers/projectController"));
const authController_1 = require("../controllers/authController");
class ProjectRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', authController_1.authController.isAuth, projectController_1.default.list);
        this.router.get('/:id', authController_1.authController.isAuth, projectController_1.default.getOne);
        this.router.post('/', authController_1.authController.isAuth, projectController_1.default.create);
        this.router.put('/:id', authController_1.authController.isAuth, projectController_1.default.update);
    }
}
const projectRoutes = new ProjectRoutes();
exports.default = projectRoutes.router;
