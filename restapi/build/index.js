"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userhistoryRoutes_1 = __importDefault(require("./routes/userhistoryRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/project', projectRoutes_1.default);
        this.app.use('/api/user', userRoutes_1.default);
        this.app.use('/api/userhistory', userhistoryRoutes_1.default);
        this.app.use('/api/ticket', ticketRoutes_1.default);
        this.app.use('/api/company', companyRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
